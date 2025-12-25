import asyncHandler from '../utils/asyncHandler.js'
import apiError from '../utils/apiError.js'
import apiResponse from '../utils/apiResponse.js'
import { User } from '../models/user.model.js'


const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body

  if (!fullName || !email || !password || !confirmPassword) {
    throw new apiError(400, 'All fields are required')
  }


  if(password !== confirmPassword) {
    throw new apiError(400, 'Password does not match.')
  }

  const existingUser = await User.findOne({ email })
  if(existingUser) {
    throw new apiError(409, 'User already exists.')
  }

  const user = await User.create({
    fullName,
    email,
    passwordHash: password,
    provider: 'local'
  })

  const createdUser = await User.findById(user._id)
    .select('-passwordHash -refreshToken')

  return res.status(201).json(
    new apiResponse(201, createdUser, 'User registered successfully')
  )

})

export {
  registerUser
}