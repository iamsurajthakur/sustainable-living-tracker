import { Router } from 'express'
import {
  registerUser
} from '../controllers/auth.controller.js'


const router = Router()

router.post('/register', registerUser)

export default router