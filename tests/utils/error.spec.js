import APIError from '../../src/utils';

describe('APIError', () => {
	it('should be a function', () => {
		expect(APIError).to.be.a('function');
	});

	it('should use default props if none are provided', () => {
		const testVal = new APIError();
		const { error, message, type, code} = testVal;
		expect(error).to.eql({});
		expect(message).to.eql('An error occured on the API server');
		expect(type).to.eql('ServerError');
		expect(code).to.eql(500);
	});

	it('should set the provided props on the object', () => {
		const dummyProps = {
			error: {bad_thing: true},
			message: 'A bad thing happened',
			type: 'BadThingError',
			code: 420
		};
		const testVal = new APIError(dummyProps);
		const { error, message, type, code } = testVal;
		expect(error).to.eql(dummyProps.error);
		expect(message).to.eql(dummyProps.message);
		expect(type).to.eql(dummyProps.type);
		expect(code).to.eql(dummyProps.code);
	});
});
