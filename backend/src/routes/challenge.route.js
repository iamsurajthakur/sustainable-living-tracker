import { Router } from 'express'
import verifyJWT from '../middlewares/auth.middleware.js'
import { getChallenges, startChallenges } from '../controllers/challenge.controller.js'

const router = Router()

// Protected Routes
router.get('/getChallenges', verifyJWT, getChallenges)
router.post('/startChallenge/:userId', verifyJWT, startChallenges)

export default router