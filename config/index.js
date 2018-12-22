import dotenv from 'dotenv';
let config;

if (process.env.NODE_ENV !== 'production') {

	config = dotenv.config();

	if (config.error) {
		throw new Error(config.error);
	}
} else {
	config.parsed = {};
}

export default config.parsed;
