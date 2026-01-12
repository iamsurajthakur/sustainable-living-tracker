import { Router } from 'express'
import verifyJWT from '../middlewares/auth.middleware.js'
import { getEnergyStats } from '../controllers/stats.controller.js'

const router = Router()

router.get('/getEnergyStats', verifyJWT, getEnergyStats)

export default router