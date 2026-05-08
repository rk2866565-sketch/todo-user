import express from 'express';
import { createTodo, getAllTodo, deleteTodo } from '../controllers/todoController.js';
import { hasToken } from '../middleware/hasToken.js';

const todoRoute = express.Router()

todoRoute.post('/create', hasToken, createTodo)
todoRoute.get('/getAll', hasToken, getAllTodo)
todoRoute.delete('/deleteTodo/:id', hasToken, deleteTodo)

export default todoRoute