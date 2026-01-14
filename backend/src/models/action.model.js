import mongoose from 'mongoose'

const actionSchema = new mongoose.Schema(
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
    unit: {
      type: [String],
      required: true,
    },
    co2PerUnit: {
      type: Number,
      required: true,
    },
    baseline: {
      type: Number,
    },
  },
  { timestamps: true }
)

actionSchema.index({ category: 1, actionKey: 1 }, { unique: true })

export const Action = mongoose.model('Action', actionSchema)
