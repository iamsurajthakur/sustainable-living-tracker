import asyncHandler from '../utils/asyncHandler.js'
import apiResponse from '../utils/apiResponse.js'
import ApiError from '../utils/apiError.js'
import { Action } from '../models/action.model.js'
import { userAction } from '../models/userAction.model.js'
import { Log } from '../models/log.model.js'
import mongoose from 'mongoose'

const getActions = asyncHandler(async (req, res) => {
  let category = req.query.category

  if(!category){
    throw new ApiError(400, 'Category required')
  }

  category = category.toLowerCase()

  let actions = []
  // try catch block for production error
  try {
    actions = await Action.find(
      { category },
      { _id: 0, actionKey: 1, label: 1, unit: 1 }
    )
  } catch (err) {
    console.error('Error fetching actions:', err)
    throw new ApiError(500, 'Error fetching actions')
  }

  if(!actions.length){
    return res.json(new apiResponse(200, [], 'No actions found for this category'))
  }

  res.json(new apiResponse(200, actions))
})

const addActions = asyncHandler(async (req, res) => {
  const {
    category,
    actionKey,
    label,
    baseUnit,
    supportedUnits = [],
    co2PerBaseUnit,
    baseline
  } = req.body

  if(
    !category ||
    !actionKey ||
    !label ||
    !baseUnit ||
    co2PerBaseUnit === undefined
  ){
    throw new ApiError(400, 'Missing required feilds')
  }
  if(co2PerBaseUnit <= 0){
    throw new ApiError(400, 'co2PerBaseUnit must be positive')
  }
  const normalizedCategory = category.toLowerCase()
  const normalizedActionKey = actionKey.toLowerCase()
  const normalizedBaseUnit = baseUnit.toLowerCase()

  // Validate supported units
  const unitSet = new Set()

  for (const u of supportedUnits) {
    if (!u.unit || u.toBaseFactor === undefined) {
      throw new ApiError(400, 'Invalid supported unit format')
    }

    if (u.unit === normalizedBaseUnit) {
      throw new ApiError(400, 'Base unit should not be in supportedUnits')
    }

    if (u.toBaseFactor <= 0) {
      throw new ApiError(400, 'toBaseFactor must be positive')
    }

    if (unitSet.has(u.unit)) {
      throw new ApiError(400, `Duplicate unit detected: ${u.unit}`)
    }

    unitSet.add(u.unit)
  }

  const existingAction = await userAction.findOne({
    category: normalizedCategory,
    actionKey: normalizedActionKey
  })

  if (existingAction) {
    throw new ApiError(409, 'Action already exists')
  }

  // Create action
  const newUserAction = await userAction.create({
    category: normalizedCategory,
    actionKey: normalizedActionKey,
    label,
    baseUnit: normalizedBaseUnit,
    supportedUnits,
    co2PerBaseUnit,
    baseline
  })

  res
    .status(201)
    .json(new apiResponse(201, newUserAction, 'Action created successfully'))


})

const addUserLog = asyncHandler(async (req, res) => {
  const { userId , actionKey, quantity, unit, activityDate, note } = req.body

  if(!userId || !actionKey || !quantity || !unit || !activityDate){
    throw new ApiError(400, 'Missing required feilds.')
  }

  const actionDef = await userAction.findOne({ actionKey: actionKey.toLowerCase() })

  if(!actionDef) throw new ApiError(400, 'Action not found')

  let co2 = 0
  if (unit === actionDef.baseUnit) {
    co2 = quantity * actionDef.co2PerBaseUnit
  } else {
    const conversion = actionDef.supportedUnits.find(u => u.unit === unit)
    if (!conversion) throw new ApiError(400, 'Unsupported unit')
    co2 = quantity * conversion.toBaseFactor * actionDef.co2PerBaseUnit
  }

  const log = await Log.create({
    userId,
    category: actionDef.category,
    actionKey,
    quantity,
    unit,
    activityDate,
    note,
    co2
  })

  res.status(201).json(new apiResponse(201, log, 'Activity logged successfully'))

})

const getUserLogs = asyncHandler(async (req, res) => {
  const { userId, startDate, endDate, category } = req.query

  if(!userId){
    throw new ApiError(400, 'userId is required')
  }

  const filter = { userId }

  if(category){
    filter.category = category.toLowerCase()
  }

  if(startDate || endDate){
    filter.activityDate = {}
    if (startDate) filter.activityDate.$gte = new Date(startDate)
    if (endDate) filter.activityDate.$lte = new Date(endDate)
  }

  const logs = await Log.find(filter).sort({ activityDate: -1, createdAt: -1 })

  res.status(200).json(new apiResponse(200, logs, 'User log fetched successfully'))
})

const getTotalCo2 = asyncHandler(async (req, res) => {
  const { userId } = req.query

  if(!userId) {
    throw new ApiError(400, 'userId is missing')
  }

  const result = await Log.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $group: {
        _id: null,
        totalCO2: { $sum: '$co2' }
      },
    },
  ])

  res.status(200).json(
    new apiResponse(
      200,
      { totalCO2: result[0]?.totalCO2 || 0 },
      'Total CO2 calculated'
    )
  )
})

const updateUserLog = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { quantity, unit, note, actionKey, activityDate, category } = req.body

  if(!id) throw new ApiError(400,'Id is missing')

  const updatedLog = await Log.findByIdAndUpdate(
    id,
    {
      quantity,
      unit,
      note,
      actionKey,
      activityDate,
      category,
    },
    { new: true }
  )

  if(!updatedLog){
    throw new ApiError(404,'Log not found')
  }


  const actionData = await userAction.findOne({ actionKey: actionKey.toLowerCase(), category: category.toLowerCase() })
  let quantityInBaseUnit = quantity

  if (unit !== actionData.baseUnit) {
    const unitConfig = actionData.supportedUnits.find(
      (u) => u.unit === unit
    )

    if (!unitConfig) {
      throw new ApiError(400, 'Unsupported unit for this action')
    }

    quantityInBaseUnit = quantity * unitConfig.toBaseFactor
  }

  updatedLog.co2 = quantityInBaseUnit * actionData.co2PerBaseUnit + (actionData.baseline || 0)

  await updatedLog.save()

  res.status(200).json(new apiResponse(200, updatedLog, 'Activity updated successfully'))
})

const deleteUserLog = asyncHandler(async (req, res) => {

  const { id } = req.params

  if(!id) throw new ApiError(400,'Id is missing')

  const deletedLog = await Log.findByIdAndDelete(id)

  if(!deletedLog) throw new ApiError(404, 'Log not found')

  res.status(200).json(new apiResponse(200, deletedLog, 'Log deleted successfully'))

})

export {
  getActions,
  addActions,
  addUserLog,
  getUserLogs,
  getTotalCo2,
  updateUserLog,
  deleteUserLog,
}