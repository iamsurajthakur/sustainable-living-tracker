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
  totalco2Saved: {
    type: Number,
    default: 0,
  },
  dailyLogs: [
    {
      date: { type: Date, required: true },
      co2Saved: { type: Number, required: true, default: 0 },
      completed: { type: Boolean, default: true },
    },
  ],
}, { timestamps: true })

export const userChallenges = mongoose.model('userChallenge', userChallengesSchema)