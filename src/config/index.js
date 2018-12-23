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
	config.parsed = { PORT, DB_USER, DB_PASS, DB_URL, DB_NAME, DB_PROTOCOL, API_VERSION } = process.env;
}

export default config.parsed;
