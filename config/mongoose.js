import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('connected to mongodb');
});

export default db;
