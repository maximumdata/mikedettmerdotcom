import { Router } from 'express';
import taskController from '../controllers/TaskController';

const router = Router();

router.route('/tasks')
	.get(taskController.listAllTasks)
	.post(taskController.createNewTask);

router.route('/tasks/:taskId')
	.get(taskController.readTask)
	.put(taskController.updateTask)
	.delete(taskController.deleteTask);

export default router;
