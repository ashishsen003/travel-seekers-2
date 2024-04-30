import express from 'express'
import { login, resgister } from '../controllers/authController.js'

const router = express.Router()

router.post('/register', resgister)
router.post('/login', login)

export default router
