import { Router } from 'express';
import { 
	listAllTasks, 
	createNewTask, 
	readTask, 
	updateTask, 
	deleteTask } from '../controllers/TaskController';

const router = Router();

router.route('/tasks')
	.get(listAllTasks)
	.post(createNewTask);

router.route('/tasks/:taskId')
	.get(readTask)
	.put(updateTask)
	.delete(deleteTask);

export default router;
