import asyncHandler from '../utils/asyncHandler.js'
import apiResponse from '../utils/apiResponse.js'
import ApiError from '../utils/apiError.js'
import { Challenge } from '../models/challenges.model.js'
import { userChallenges } from '../models/userChallenges.model.js'
import { User } from '../models/user.model.js'

const getChallenges = asyncHandler(async (_, res) => {
  const challenges = await Challenge.find({ isActive: true })

  if(!challenges){
    throw new ApiError(400, 'Missing challenges')
  }

  res.json(new apiResponse(200, challenges, 'Challenges fetched successfully.'))
})

const startChallenges = asyncHandler(async (req, res) => {
  const { userId } = req.params
  const { challengeId } = req.body

  const challenge = await Challenge.findById(challengeId)
  if(!challenge){
    throw new ApiError(404,'Challenge not found.')
  }

  const alreadyActive = await userChallenges.findOne({
    userId,
    challengeId,
    status: 'active',
  })

  if(alreadyActive){
    throw new ApiError(400, 'Challenge is already active')
  }

  const startDate = new Date()
  const endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + challenge.duration)



  const userChallenge = await userChallenges.create({
    userId,
    challengeId,
    startDate,
    endDate,
    status: 'active',
    dailyLogs: [], // frontend handles daily completion via localStorage
    totalco2Saved: 0,
  })

  const now = new Date()
  const timeDiff = now - startDate // difference in ms
  let currentDay = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1
  if (currentDay > Number(challenge.duration)) currentDay = Number(challenge.duration)
  if (currentDay < 1) currentDay = 1

  const data = {
    id: challenge._id,
    title: challenge.title,
    category: challenge.category,
    co2Saved: challenge.co2Saved,
    duration: Number(challenge.duration),
    dailyTask: challenge.dailyTask,
    startDate: userChallenge.startDate,
    endDate: userChallenge.endDate,
    totalco2Saved: userChallenge.totalco2Saved,
    currentDay,
  }

  res.status(201).json(new apiResponse(200, data, 'Challenge created successfully.'))
})

const getUserChallenges = asyncHandler(async (req, res) => {
  const { userId } = req.params
  const { status } = req.query

  const query = { userId }
  if(status) query.status = status

  const challenges = await userChallenges.find(query).populate('challengeId')

  res.status(200).json(new apiResponse(200, challenges, 'User challenges fetch successfully.'))
})

const completeChallenge = asyncHandler(async (req, res) => {
  const { challengeId } = req.params

  const userChallenge = await userChallenges
    .findById(challengeId)
    .populate('challengeId')

  if (!userChallenge) {
    throw new ApiError(404, 'User challenge not found')
  }

  const today = new Date()
  const todayStr = today.toISOString().slice(0, 10) // YYYY-MM-DD

  const lastLog =
    userChallenge.dailyLogs[userChallenge.dailyLogs.length - 1]

  if (lastLog) {
    const lastLogDay = new Date(lastLog.completedAt)
      .toISOString()
      .slice(0, 10)

    if (lastLogDay === todayStr) {
      throw new ApiError(400, 'Challenge already completed today')
    }
  }

  userChallenge.currentDay = (userChallenge.currentDay || 0) + 1

  const user = await User.findById(userChallenge.userId)
  if (!user) {
    throw new ApiError(404, 'User not found')
  }

  const lastStreakDateStr = user.lastStreakDate
    ? new Date(user.lastStreakDate).toISOString().slice(0, 10)
    : null

  if (lastStreakDateStr) {
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().slice(0, 10)

    if (lastStreakDateStr === yesterdayStr) {
      // consecutive day
      user.streak = (user.streak || 0) + 1
    } else if (lastStreakDateStr === todayStr) {
      // already counted today
      user.streak = user.streak || 0
    } else {
      // missed day → reset
      user.streak = 1
    }
  } else {
    // first ever completion
    user.streak = 1
  }

  user.lastStreakDate = today

  userChallenge.dailyLogs.push({
    date: today,
    completed: true,
    co2Saved: userChallenge.challengeId.co2SavedPerDay || 0,
    completedAt: today,
  })

  const isCompleted =
    userChallenge.currentDay >= userChallenge.challengeId.duration

  if (isCompleted) {
    const ecoPointsSavedByThisChallenge =
      userChallenge.challengeId.co2Saved || 0

    // Update user stats
    await User.findByIdAndUpdate(userChallenge.userId, {
      $inc: {
        challengeCompleted: 1,
        ecoPoints: ecoPointsSavedByThisChallenge,
      },
      streak: user.streak,
      lastStreakDate: user.lastStreakDate,
    })

    const deletedId = userChallenge._id

    await userChallenge.save()
    await userChallenges.findByIdAndDelete(deletedId)

    return res.status(200).json({
      success: true,
      completed: true,
      streak: user.streak,
      deletedChallengeId: deletedId,
      message: 'Challenge fully completed!',
    })
  }

  await userChallenge.save()
  await user.save()

  return res.status(200).json({
    success: true,
    completed: false,
    currentDay: userChallenge.currentDay,
    streak: user.streak,
    message: 'Day marked as done!',
  })
})


export {
  getChallenges,
  startChallenges,
  getUserChallenges,
  completeChallenge,
}