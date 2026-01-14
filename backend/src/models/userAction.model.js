import mongoose from 'mongoose'

const userActionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      index: true,
    },

    actionKey: {
      type: String,
      required: true,
      index: true,
    },

    label: {
      type: String,
      required: true,
    },

    baseUnit: {
      type: String,
      required: true,
    },

    supportedUnits: [
      {
        unit: String,
        toBaseFactor: Number,
      },
    ],

    co2PerBaseUnit: {
      type: Number,
      required: true,
    },

    baseline: Number,
  },
  { timestamps: true }
)

userActionSchema.index({ category: 1, actionKey: 1 }, { unique: true })

export const userAction = mongoose.model('userAction', userActionSchema)
