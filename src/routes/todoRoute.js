import express from 'express';
import { createTodo, deleteTodo, getAllTodo, paginateTodo, updateTodo } from '../controllers/todoController.js';
import { hasToken } from '../middleware/hasToken.js';
import { todoValidateSchema, validateTodo } from '../validators/todoValidate.js';

const todoRoute = express.Router()

todoRoute.post('/create', hasToken, validateTodo(todoValidateSchema), createTodo)
todoRoute.get('/getAll', hasToken, getAllTodo)
todoRoute.delete('/deleteTodo/:id', hasToken, deleteTodo)
todoRoute.patch('/update/:id', hasToken, updateTodo)
todoRoute.get('/paginate', hasToken, paginateTodo)


export default todoRoute