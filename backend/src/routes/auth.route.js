import { Router } from 'express'
import { registerUser, loginUser, logout } from '../controllers/auth.controller.js'
import verifyJWT from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)

// Secure routes
router.post('/logout',verifyJWT, logout)

export default router
