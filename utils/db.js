import mongoose from 'mongoose';
import config from '../config';

mongoose.connect(`mongodb+srv://${config.DB_USER}:${config.DB_PASS}@${config.DB_URL}/${config.DB_NAME}`, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('connected to mongodb');
});

export default db;
