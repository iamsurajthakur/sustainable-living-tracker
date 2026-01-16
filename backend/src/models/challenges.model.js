import mongoose from 'mongoose'

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true,
  },
  category: {
    type: String,
    enum: ['Waste', 'Water', 'Transport', 'Energy'],
    required: true,
  },
  co2Saved: {
    type: Number,
    required: true,
    min: 0,
  },
  dailyTask: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true })

export const Challenge = mongoose.model('Challenge', challengeSchema)