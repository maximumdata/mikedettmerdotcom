import config from '../src/config';

describe('(Utils) ...config', () => {
	it('should be an object', () => {
		expect(config).to.be.a('object');
	});
	it('should return requested config item', () => {
		expect(Number(config.PORT)).to.eql(2369);
	});
});
