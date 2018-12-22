import { Schema, model } from 'mongoose';

const TaskSchema = new Schema({
	taskName: {
		type: String,
		required: true
	},
	createdOn: {
		type: Date,
		default: Date.now
	}
});

export default model('Tasks', TaskSchema);
