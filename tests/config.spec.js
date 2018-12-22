import config from '../src/config';

describe('(Utils) ...config', () => {
	it('should be an object', () => {
		expect(config).to.be.a('object');
	});
});
