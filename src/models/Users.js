import { Schema, model } from 'mongoose';

const Users = new Schema({
	username: String,
	password: String
});

export default model('Users', Users);
