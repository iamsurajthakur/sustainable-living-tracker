import { Router } from 'express'
import verifyJWT from '../middlewares/auth.middleware.js'
import { getChallenges, getUserChallenges, startChallenges } from '../controllers/challenge.controller.js'

const router = Router()

// Protected Routes
router.get('/getChallenges', verifyJWT, getChallenges)
router.post('/startChallenge/:userId', verifyJWT, startChallenges)
router.get('/getUserChallenges/:userId', verifyJWT, getUserChallenges)

export default router