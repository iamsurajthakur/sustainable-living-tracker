import asyncHandler from '../utils/asyncHandler.js'
import apiResponse from '../utils/apiResponse.js'
import ApiError from '../utils/apiError.js'
import { Action } from '../models/action.model.js'

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
      { _id: 0, actionKey: 1, label: 1, unit: 1, co2PerUnit: 1 }
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


export {
  getActions,
}