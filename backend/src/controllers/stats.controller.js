import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/apiError.js'
import apiResponse from '../utils/apiResponse.js'
import { Log } from '../models/log.model.js'
import mongoose from 'mongoose'

const getEnergyStats = asyncHandler(async (req, res) => {
  const { userId } = req.query

  try {
    if (!userId) throw new ApiError(400, 'userId is missing')

    const todayStr = new Date().toISOString().split('T')[0]

    const categories = ['energy', 'water', 'transport']

    const todayCounts = await Log.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          category: { $in: categories },
          $expr: {
            $eq: [
              { $dateToString: { format: '%Y-%m-%d', date: '$activityDate' } },
              todayStr
            ]
          }
        }
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalQuantity: { $sum: '$quantity' }
        }
      }
    ])

    return res.status(200).json(new apiResponse(200, todayCounts, 'Success'))

  } catch (error) {
    console.error('something went wrong: ', error)
    return res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
})

export {
  getEnergyStats,
}