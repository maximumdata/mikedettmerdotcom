import dotenv from 'dotenv';

let config = {
	parsed: {}
};

if (process.env.NODE_ENV !== 'production') {
	config = dotenv.config();

	if (config.error) {
		throw new Error(config.error);
	}
} else {
	config.parsed = {
		PORT: process.env.PORT,
		DB_USER: process.env.DB_USER,
		DB_PASS: process.env.DB_PASS,
		DB_URL: process.env.DB_URL,
		DB_NAME: process.env.DB_NAME,
		API_VERSION: process.env.API_VERSION,
		DB_PROTOCOL: process.env.PROTOCOL
	};
}

export default config.parsed;
