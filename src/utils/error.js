class APIError {
	constructor({
 error = {}, msg = 'An error occured on the API server', type = 'ServerError', code = 500
} = {}) {
		this.error = error;
		this.message = msg;
		this.type = type;
		this.code = code;
	}
}

export default APIError;
