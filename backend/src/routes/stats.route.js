import { Router } from 'express'
import verifyJWT from '../middlewares/auth.middleware.js'
import {
  getEnergyStats,
  getRecentActivities,
  getTotalActivities,
  getUserTimeline,
} from '../controllers/stats.controller.js'

const router = Router()

// Protected routes
router.get('/getEnergyStats', verifyJWT, getEnergyStats)
router.get('/getUserTimeline/:userId', verifyJWT, getUserTimeline)
router.get('/getTotalActivities/:userId', verifyJWT, getTotalActivities)
router.get('/getRecentActivities/:userId', verifyJWT, getRecentActivities)

export default router
