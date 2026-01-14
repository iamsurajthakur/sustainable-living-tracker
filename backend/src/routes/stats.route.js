import { Router } from 'express'
import verifyJWT from '../middlewares/auth.middleware.js'
import { getEnergyStats, getUserTimeline } from '../controllers/stats.controller.js'

const router = Router()

// Protected routes
router.get('/getEnergyStats', verifyJWT, getEnergyStats)
router.get('/getUserTimeline/:userId', verifyJWT, getUserTimeline)

export default router