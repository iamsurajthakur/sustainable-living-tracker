import mongoose from 'mongoose'
import asyncHandler from '../utils/asyncHandler.js'
import ApiError from '../utils/apiError.js'
import apiResponse from '../utils/apiResponse.js'
import { Log } from '../models/log.model.js'
import { getTimelineByUser } from '../services/stats.service.js'

const getEnergyStats = asyncHandler(async (req, res) => {
  const { userId } = req.query

  if (!userId) throw new ApiError(400, 'userId is missing')

  try {
    const categories = ['energy', 'water', 'transport']

    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)

    const todayEnd = new Date()
    todayEnd.setHours(23, 59, 59, 999)

    const sevenDaysAgo = new Date(todayStart)
    sevenDaysAgo.setDate(todayStart.getDate() - 6)

    const todayCounts = await Log.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          category: { $in: categories },
          activityDate: { $gte: todayStart, $lte: todayEnd }, // today
        },
      },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalQuantity: { $sum: '$quantity' },
        },
      },
    ])

    const trendData = await Log.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          category: { $in: categories },
          activityDate: { $gte: sevenDaysAgo, $lte: todayEnd },
        },
      },
      {
        $group: {
          _id: {
            category: '$category',
            date: {
              $dateToString: { format: '%Y-%m-%d', date: '$activityDate' },
            },
          },
          totalQuantity: { $sum: '$quantity' },
        },
      },
      { $sort: { '_id.date': 1 } },
    ])

    const trends = {}
    categories.forEach((cat) => {
      trends[cat] = []
      for (let i = 0; i < 7; i++) {
        const date = new Date(sevenDaysAgo)
        date.setDate(sevenDaysAgo.getDate() + i)
        const dateStr = date.toISOString().split('T')[0]
        trends[cat].push({ date: dateStr, value: 0 })
      }
    })

    trendData.forEach((item) => {
      const { category, date } = item._id
      const idx = trends[category].findIndex((d) => d.date === date)
      if (idx !== -1) trends[category][idx].value = item.totalQuantity
    })

    const result = categories.map((cat) => {
      const todayItem = todayCounts.find((t) => t._id === cat)
      return {
        category: cat,
        count: todayItem?.count || 0,
        totalQuantity: todayItem?.totalQuantity || 0,
        trend: trends[cat],
      }
    })

    return res.status(200).json(new apiResponse(200, result, 'Success'))
  } catch (error) {
    console.error('something went wrong: ', error)
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' })
  }
})

const getUserTimeline = asyncHandler(async (req, res) => {
  const { userId } = req.params

  if (!userId) {
    throw new ApiError(400, 'userId is required')
  }
  const timeline = await getTimelineByUser(userId)

  res
    .status(200)
    .json(new apiResponse(200, timeline, 'Successfully fetched user timeline'))
})

const getTotalActivities = asyncHandler(async (req, res) => {
  const { userId } = req.params

  if (!userId) {
    throw new ApiError(400, 'userId is missing')
  }

  const totalActivities = await Log.countDocuments({
    userId: new mongoose.Types.ObjectId(userId),
  })

  res
    .status(200)
    .json(
      new apiResponse(
        200,
        totalActivities,
        'Successfully fetched total activities'
      )
    )
})

export { getEnergyStats, getUserTimeline, getTotalActivities }
