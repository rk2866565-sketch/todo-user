import express from 'express'
import { addPicture } from '../controllers/addPicture.js';
import { upload } from '../controllers/multerController.js';

const multerRoute = express.Router();

multerRoute.post('/upload',upload.single('picture'), addPicture)

export default multerRoute