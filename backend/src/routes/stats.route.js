import { Router } from 'express'
import verifyJWT from '../middlewares/auth.middleware.js'
import {
  getChartData,
  getEnergyStats,
  getRecentActivities,
  getTotalActivities,
  getUserInfo,
  getUserTimeline,
} from '../controllers/stats.controller.js'

const router = Router()

// Protected routes
router.get('/getEnergyStats', verifyJWT, getEnergyStats)
router.get('/getUserTimeline/:userId', verifyJWT, getUserTimeline)
router.get('/getTotalActivities/:userId', verifyJWT, getTotalActivities)
router.get('/getRecentActivities/:userId', verifyJWT, getRecentActivities)
router.get('/getUserInfo/:userId', verifyJWT, getUserInfo)
router.get('/getChartData/:userId', verifyJWT, getChartData)

export default router
