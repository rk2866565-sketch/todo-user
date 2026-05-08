import express from 'express';
import { register, login } from '../controllers/userController.js';
import { verification } from '../middleware/verifyToken.js';

const userRoute = express.Router()

userRoute.post('/register', register)
userRoute.get('/verify', verification)
userRoute.post('/login', login)

export default userRoute