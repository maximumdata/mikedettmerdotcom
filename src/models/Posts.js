import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

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

Posts.plugin(mongoosePaginate);

export default model('Posts', Posts);
