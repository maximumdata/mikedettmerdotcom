import { Schema, model } from 'mongoose';

const TestSchema = new Schema({
	name: String,
	date: Date,
	updated: { type: Date, default: Date.now() }
});

export default model('Test', TestSchema);
