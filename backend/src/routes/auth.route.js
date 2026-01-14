import { Router } from 'express'
import {
  registerUser,
  loginUser,
  logout,
  refreshAccessToken,
  dashboard,
} from '../controllers/auth.controller.js'
import verifyJWT from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/refresh-token', refreshAccessToken)

// Secure routes
router.post('/logout', verifyJWT, logout)
router.get('/dashboard', verifyJWT, dashboard)

export default router
