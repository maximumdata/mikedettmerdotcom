import dotenv from 'dotenv';
import APIError from '../utils';

let config = {
	parsed: {}
};

if (process.env.NODE_ENV !== 'production') {
	config = dotenv.config();

	if (config.error) {
		throw new APIError({
			error: config.error,
			message: 'An error occured when generating the dotenv config'
		});
	}
} else {
	config.parsed = {
		PORT: process.env.PORT,
		DB_USER: process.env.DB_USER,
		DB_PASS: process.env.DB_PASS,
		DB_URL: process.env.DB_URL,
		DB_NAME: process.env.DB_NAME,
		DB_PROTOCOL: process.env.DB_PROTOCOL,
		API_VERSION: process.env.API_VERSION
	};
}

export default config.parsed;
