import { Router } from 'express'
import verifyJWT from '../middlewares/auth.middleware.js'
import { getActions } from '../controllers/action.controller.js'

const router = Router()

router.get('/getAction', verifyJWT, getActions)

export default router