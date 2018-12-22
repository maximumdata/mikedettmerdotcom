import Task from '../models/Task';

export function listAllTasks(req, res) {
	Task.find({}, (err, tasks) => {
		if (err) res.status(500).send(err);
		res.status(200).json(tasks);
	});
}

export function createNewTask(req, res) {
	const newTask = new Task(req.body);
	newTask.save((err, task) => {
		if (err) res.status(500).send(err);
		res.status(201).json(task);
	});
}

export function readTask(req, res) {
	Task.findById(req.params.taskId, (err, task) => {
		if (err) res.status(500).send(err);
		res.status(200).json(task);
	});
}

export function updateTask(req, res) {
	Task.findOneAndUpdate(
		{
			_id: req.params.taskId
		},
		req.body,
		{ upsert: true },
		(err, task) => {
			if (err) res.status(500).send(err);
			res.status(200).json(task);
		}
	);
}

export function deleteTask(req, res) {
	Task.deleteOne({ _id: req.params.taskId }, (err, task) => {
		if (err) res.status(404).send(err);
		res.status(200).json({ message: `Task with id ${req.params.taskId} successfully deleted` });
	});
}

export default {
	listAllTasks,
	createNewTask,
	readTask,
	updateTask,
	deleteTask
};
