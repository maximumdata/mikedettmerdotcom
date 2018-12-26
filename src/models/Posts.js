import { Schema, model } from 'mongoose';

const Posts = new Schema({
	title: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		required: true
	},
	categories: [String],
	body: {
		type: String,
		required: true
	},
	hidden: {
		type: Boolean,
		default: false
	}
}, { timestamps: true });

export default model('Posts', Posts);
