import mongoose from 'mongoose';
import config from '../config';

class DB {
	constructor() {
		this.setConnectString(process.env.NODE_ENV);
		mongoose.Promise = global.Promise;
		mongoose.connection.once('open', () => {
			console.log('Connected to mongodb');
		});
		mongoose.connection.on('disconnected', () => {
			console.log('Disconnected from mongodb');
		});
		mongoose.connection.on('error', (err) => {
			console.log('failed to connect to mongodb: ', err);
			throw new Error(err);
		});
	}

	setConnectString(env) {
		if (env === 'development') {
			this.connectString = `${config.DB_PROTOCOL}://${config.DB_USER}:${config.DB_PASS}@${config.DB_URL}/${config.DB_NAME}`;
		} else {
			this.connectString = `${config.DB_PROTOCOL}://${config.DB_URL}/${config.DB_NAME}`;
		}
	}

	async open() {
		try {
			await mongoose.connect(this.connectString, { useNewUrlParser: true });
			this.connection = mongoose.connection;
		} catch (error) {
			console.log('error establishing connection: ', error);
		}
	}

	async close() {
		if (this.connection) {
			try {
				await mongoose.connection.close();
			} catch (error) {
				console.log('error closing connection: ', error);
			}
		}
	}
}

export default DB;
