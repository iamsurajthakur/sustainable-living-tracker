import mongoose from 'mongoose'

const userChallengesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  challengeId: {
    type: mongoose.Types.ObjectId,
    ref: 'Challenge',
    required: true,
  },
  currentDay: {
    type: Number,
    default: 0,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'completed'],
    default: 'active',
  },
  dailyLogs: [
    {
      date: { type: Date, required: true },
      completed: { type: Boolean, default: true },
    },
  ],
}, { timestamps: true })

export const userChallenges = mongoose.model('userChallenge', userChallengesSchema)