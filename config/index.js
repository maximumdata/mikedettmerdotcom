import dotenv from 'dotenv';

const config = dotenv.config();

if (config.error) {
	throw new Error(config.error);
}

export default config.parsed;
