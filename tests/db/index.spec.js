import proxyquire from 'proxyquire';
import DB from '../../src/db';

describe('Database', () => {
	let testDB, mongooseStub;

	beforeEach(() => {
		mongooseStub = {
			Promise: {},
			connect: sinon.stub(),
			connection: {
				once: sinon.stub(),
				on: sinon.stub(),
				close: sinon.stub()
			},
		};

		let proxiedDB = proxyquire('../../src/db', {
			'mongoose': mongooseStub
		});

		testDB = new proxiedDB.default();
	});

	it('should be a function', () => {
		expect(DB).to.be.a('function');
	});

	it('should register events on instantiation', () => {
		const { once, on } = mongooseStub.connection;
		expect(once).to.be.calledOnce;
		expect(on).to.be.calledTwice;
	});

	it('should return a connection string from getConnectString', () => {
		let testVal = testDB.getConnectString();
		expect(testVal).to.be.a('string');
	});

	it('should attempt to open a connection when open() is called', async () => {
		await testDB.open();
		expect(mongooseStub.connect).to.be.called;
	});

	it('should attempt to close a connection when close() is called', async () => {
		await testDB.close();
		expect(mongooseStub.connection.close).to.be.called;
	});
});
