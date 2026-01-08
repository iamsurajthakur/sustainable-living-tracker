import { Router } from 'express'
import verifyJWT from '../middlewares/auth.middleware.js'
import { getActions, addActions } from '../controllers/action.controller.js'

const router = Router()

router.get('/getAction', verifyJWT, getActions)
router.post('/addAction', verifyJWT, addActions)

export default router