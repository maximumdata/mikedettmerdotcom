const chai  = require('chai');
const sinon = require('sinon');

chai.use(require('sinon-chai'));
chai.config.includeStack = true;

global.assert = chai.assert;
global.expect = chai.expect;
global.sinon  = sinon;

const SimplePromise = (action, value) => {
  return new Promise((resolve, reject) => {
    if (action === 'resolve') {
      reject(value);
    } else {
      resolve(value);
    }
  });
};

global.SimplePromise = SimplePromise;
