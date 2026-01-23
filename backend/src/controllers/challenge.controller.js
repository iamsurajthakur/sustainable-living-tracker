import asyncHandler from '../utils/asyncHandler.js'
import apiResponse from '../utils/apiResponse.js'
import ApiError from '../utils/apiError.js'
import { Challenge } from '../models/challenges.model.js'
import { userChallenges } from '../models/userChallenges.model.js'

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
    .populate('challengeId') // get the original challenge details

  if (!userChallenge) {
    throw new ApiError(404, 'User challenge not found')
  }

  if (userChallenge.status !== 'active') {
    throw new ApiError(400, 'Challenge already completed')
  }

  // Increment day
  userChallenge.currentDay = (userChallenge.currentDay || 0) + 1

  let completed = false
  let points = 0

  if (userChallenge.currentDay >= userChallenge.challengeId.duration) {
    userChallenge.status = 'completed'
    completed = true
    points = userChallenge.challengeId.impact || 0

    await userChallenges.findByIdAndDelete(userChallenge._id)
  }else{
    await userChallenge.save()
  }


  res.status(200).json({
    success: true,
    completed,
    points,
    userChallenge,
    message: completed ? 'Challenge fully completed!' : 'Day marked as done!',
  })
})


export {
  getChallenges,
  startChallenges,
  getUserChallenges,
  completeChallenge,
}