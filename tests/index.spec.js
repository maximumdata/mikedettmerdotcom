

// import { handler, Salesforce } from '../';

// describe('Gbase retailer to Salesforce object', () => {
// 	const dummyRetailer = {
// 		"_id": "5a5631b06d95c71000c3c323",
// 		"name": "Center Independent Energy",
// 		"address": {
// 			"addressLine1": "1035 Boyce Rd.",
// 			"addressLine2": "Suite 220",
// 			"city": "Pittsburgh",
// 			"state": {
// 				"abbreviation": "PA"
// 			},
// 			"zip": "15241"
// 		},
// 		"accountManager": {
// 			"name": "Pope Kuchar",
// 			"email": "popek@gstv.com"
// 		},
// 		"strippedKey": ""
// 	};

// 	describe('Handler...', () => {
// 		it('should be a function', () => {
// 			expect(handler).to.be.a('function');
// 		});
// 	});

// 	describe('Salesforce...', () => {
// 		let SalesforceTest,
// 			sendStub;

// 		beforeEach(() => {
// 			SalesforceTest = new Salesforce(dummyRetailer);
// 		});

// 		it('should be a function', () => {
// 			expect(Salesforce).to.be.a('function');
// 		});

// 		it('should safely get nested properties', () => {
// 			const testVal = SalesforceTest.safeGet(['address','state','abbreviation']);
// 			expect(testVal).to.eql(dummyRetailer.address.state.abbreviation);
// 		});

// 		it('should only return address line 1 if line 2 is not present', () => {
// 			let oneLineAddressRetailer = JSON.parse(JSON.stringify(dummyRetailer));
// 			oneLineAddressRetailer.address.addressLine2 = '';
// 			SalesforceTest = new Salesforce(oneLineAddressRetailer);
// 			const testVal = SalesforceTest.getAddress();
// 			expect(testVal).to.be.eql(oneLineAddressRetailer.address.addressLine1);
// 		});

// 		it('should return a combined address line 1 & 2 if present', () => {
// 			const testVal = SalesforceTest.getAddress();
// 			expect(testVal).to.eql(`${dummyRetailer.address.addressLine1} ${dummyRetailer.address.addressLine2}`);
// 		});

// 		it('should trim the whitespace from address line 2 if present', () => {
// 			const trimAddressRetailer = JSON.parse(JSON.stringify(dummyRetailer));
// 			trimAddressRetailer.address.addressLine2 = '      Test     ';
// 			SalesforceTest = new Salesforce(trimAddressRetailer);
// 			const testVal = SalesforceTest.getAddress();
// 			expect(testVal).to.be.eql(`${dummyRetailer.address.addressLine1} Test`);
// 		});

// 		it('should strip empty or null keys from the model', () => {
// 			const testVal = JSON.parse(SalesforceTest.model);
// 			expect(testVal).to.not.have.key('strippedKey');
// 		});

// 		it('should return a stringified model', () => {
// 			expect(SalesforceTest.model).to.be.a('string');
// 		});

// 		it('should send when send() is called', () => {
// 			sendStub = sinon.stub();
// 			SalesforceTest.send = sendStub;

// 			SalesforceTest.send();
// 			expect(sendStub).to.be.called;
// 		});

// 	});

// });
