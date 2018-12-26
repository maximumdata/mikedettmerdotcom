import mongoose from 'mongoose';
import config from '../config';
import APIError from '../utils';

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
		mongoose.connection.on('error', (error) => {
			const err = new APIError({
				error,
				message: 'Failed to connect to mongodb',
				type: 'MongoError'
			});
			throw err;
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
			await mongoose.connect(this.connectString, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true });
			this.connection = mongoose.connection;
		} catch (error) {
			const err = new APIError({
				error,
				message: 'Error establishing connection',
				type: 'MongoError'
			});
			throw err;
		}
	}

	async close() {
		if (this.connection) {
			try {
				await mongoose.connection.close();
			} catch (error) {
				const err = new APIError({
					error,
					message: 'Error closing connection:',
					type: 'MongoError'
				});
				throw err;
			}
		}
	}
}

export default DB;
