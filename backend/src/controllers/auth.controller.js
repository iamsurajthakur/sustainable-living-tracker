import asyncHandler from '../utils/asyncHandler.js'
import apiError from '../utils/apiError.js'
import apiResponse from '../utils/apiResponse.js'
import { User } from '../models/user.model.js'
// import jwt from 'jsonwebtoken'

const generateAccessAndRefreshTokens = async(userId) => {
  try{
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }
  } catch(error) {
    throw new apiError(500, 'Something went wrong.', error)
  }
}

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body

  if (!fullName || !email || !password || !confirmPassword) {
    throw new apiError(400, 'All fields are required')
  }

  if (password !== confirmPassword) {
    throw new apiError(400, 'Password does not match.')
  }

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new apiError(409, 'User already exists.')
  }

  const user = await User.create({
    fullName,
    email,
    passwordHash: password,
    provider: 'local',
  })

  const createdUser = await User.findById(user._id).select(
    '-passwordHash -refreshToken -__v'
  )

  return res
    .status(201)
    .json(new apiResponse(201, createdUser, 'User registered successfully'))
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new apiError(400, 'Email and password are required.')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new apiError(401, 'Invalid email or password.')
  }

  const isPasswordValid = await user.isPasswordCorrect(password)

  if (!isPasswordValid) {
    throw new apiError(401, 'Invalid email or password.')
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

  const loggedInUser = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email
  }

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Have to set "production" in the hosting platform.
    sameSite: 'strict'
  }

  return res
    .status(200)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new apiResponse(
        200,
        {
          user: loggedInUser, accessToken
        },
        'User logged in successfully.'
      )
    )
})

export { registerUser, loginUser }
