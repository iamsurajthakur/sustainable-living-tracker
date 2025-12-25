import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      default: null, // For Google users
    },
    provider: {
      type: String,
      enum: ['local', 'google'],
      default: 'local',
    },
    refreshToken: {
      type: String,
    }
  },
  { timestamps: true }
)

// explicit index for future
// userSchema.index({ email: 1 }, { unique: true })

userSchema.pre('save', async function () {
  if(!this.isModified('passwordHash') || !this.passwordHash) return

  this.passwordHash = await bcrypt.hash(this.passwordHash, 10)
})

userSchema.methods.isPasswordCorrect = async function(password) {
  return await bcrypt.compare(password, this.passwordHash)
}

export const User = mongoose.model('User', userSchema)
