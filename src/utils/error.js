class APIError {
	constructor({
		error = {}, message = 'An error occured on the API server', type = 'ServerError', code = 500
	} = {}) {
		this.error = error;
		this.message = message;
		this.type = type;
		this.code = code;
		this.logSelf();
	}

	logSelf() {
		console.log(`${this.message}: `, this);
	}
}

export default APIError;
