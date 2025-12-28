import asyncHandler from '../utils/asyncHandler.js'
import apiError from '../utils/apiError.js'
import apiResponse from '../utils/apiResponse.js'
import { User } from '../models/user.model.js'
import jwt from 'jsonwebtoken'

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

  if(!accessToken){
    throw new apiError(500, 'Access Token generation failed')
  }

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
    .cookie('accessToken', accessToken, options)
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

const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1
      }
    },
    {
      new: true
    }
  )
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'development',
    sameSite: 'strict'
  }

  return res
    .status(200)
    .clearCookie('refreshToken', options)
    .json(new apiResponse(200, {}, 'User has been logged out.'))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken
  if(!incomingRefreshToken){
    throw new apiError(401, 'Unauthorized request')
  }

  try {
    const decodedRefreshToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

    const user = await User.findById(decodedRefreshToken?._id)
    if(!user){
      throw new apiError(401, 'Invalid refresh token')
    }

    if(incomingRefreshToken !== user?.refreshToken){
      throw new apiError(401, 'Refresh token is expired or used')
    }

    const option = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user?._id)

    user.refreshToken = refreshToken
    await user.save()

    if(!accessToken || !refreshToken){
      throw new apiError(500, 'unauthorized request')
    }
    res
      .status(200)
      .cookie('refreshToken', refreshToken, option)
      .cookie('accessToken', accessToken, option)
      .json(
        new apiResponse(200,
          { accessToken, refreshToken },
          'Access token refreshed'
        )
      )
  } catch (error) {
    throw new apiError(401, error?.message || 'Invalid refresh token')
  }
})

const dashboard = asyncHandler(async (req, res) => {
  return res.status(200).json(new apiResponse(200, 'Dashboard Page'))
})

export { registerUser, loginUser, logout, refreshAccessToken,dashboard }
