import express from 'express';
import { login, logout, register } from '../controllers/userController.js';
import { verification } from '../middleware/verifyToken.js';
import { hasToken } from '../middleware/hasToken.js';
import { userValidateSchema, validateUser } from '../validators/userValidate.js';

const userRoute = express.Router()

userRoute.post('/register', validateUser(userValidateSchema), register)
userRoute.get('/verify', verification)
userRoute.post('/login', login)
userRoute.delete('/logout',hasToken , logout)

export default userRoute