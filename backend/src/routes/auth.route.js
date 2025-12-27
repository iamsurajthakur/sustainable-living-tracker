import { Router } from 'express'
import { registerUser, loginUser, logout, refreshAccessToken } from '../controllers/auth.controller.js'
import verifyJWT from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)

// Secure routes
router.post('/logout',verifyJWT, logout)
router.post('/refresh-token',verifyJWT, refreshAccessToken)

export default router
