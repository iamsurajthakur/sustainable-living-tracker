import asyncHandler from '../utils/asyncHandler.js'
import apiResponse from '../utils/apiResponse.js'
import ApiError from '../utils/apiError.js'
import { Action } from '../models/action.model.js'
import { userAction } from '../models/userAction.model.js'

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

export {
  getActions,
  addActions
}