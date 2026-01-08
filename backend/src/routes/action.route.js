import { Router } from 'express'
import verifyJWT from '../middlewares/auth.middleware.js'
import { getActions, addActions, addUserLog, getUserLogs } from '../controllers/action.controller.js'

const router = Router()

// Protected routes
router.get('/getAction', verifyJWT, getActions)
router.post('/addAction', verifyJWT, addActions)
router.post('/addUserLog', verifyJWT, addUserLog)
router.get('/getUserLogs', verifyJWT, getUserLogs)

export default router