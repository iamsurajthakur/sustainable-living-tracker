import { Router } from 'express'
import verifyJWT from '../middlewares/auth.middleware.js'
import { getActions, addActions, addUserLog, getUserLogs, getTotalCo2 } from '../controllers/action.controller.js'

const router = Router()

// Protected routes
router.get('/getAction', verifyJWT, getActions)
router.post('/addAction', verifyJWT, addActions)
router.post('/addUserLog', verifyJWT, addUserLog)
router.get('/getUserLogs', verifyJWT, getUserLogs)
router.get('/getTotalCo2', verifyJWT,getTotalCo2 )

export default router