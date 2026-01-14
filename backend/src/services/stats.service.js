import mongoose from 'mongoose'
import { Log } from '../models/log.model.js'

export async function getTimelineByUser(userId) {
  return await Log.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId)
      }
    },
    {
      $group: {
        _id: '$activityDate',
        items: {
          $push: {
            id: '$_id',
            category: '$category',
            actionKey: '$actionKey',
            quantity: '$quantity',
            unit: '$unit',
            co2: '$co2',
            time: '$createdAt'
          }
        }
      }
    },

    { $sort: { _id: -1 } },
  ])
}