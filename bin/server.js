require('babel/register')({
  ignore: /node_modules\/(?!gstv)/
});

const app = require('../index');

// const mongoose = require('mongoose');
// const config = require('../config');
// const app = require('../index');
// const log4js = config.get('log4js');

// mongoose.Promise = global.Promise;

// const server = app.listen(process.env.PORT || config.get('server_port'), () => {
//   console.log(`${process.env.NODE_ENV}: Running Application on ${config.get('server_port')}`);
// });

// server.timeout = 0;

// Chain disconnects to ensure completion
function chainDisconnect(cb) {
  // mongoose.disconnect((msg1) => {
  //   if (msg1) console.info('Mongoose Disconnect Step', msg1);
  //   log4js.shutdown((msg4) => {
  //     if (msg4) console.info('Log4JS Disconnect Step', msg4);
  //     cb();
  //   });
  // });
}

// Wrap disconnects and pass exit strategy
function gracefulShutdown() {
	console.info('Graceful Shutdown Initiated');
	chainDisconnect(() => {
		console.info('Connections Closed: EXITING ', new Date().toISOString());
		process.exit();
	});
}

// Allow Kubernetes time to hault traffic and connections
const READINESS_PROBE_DELAY = 5000;
const signals = ['SIGINT', 'SIGTERM'];

// Listen for signals
signals.forEach((sig) => {
	process.on(sig, () => {
		console.info(` Received ${sig} `, new Date().toISOString());
		setTimeout(gracefulShutdown, READINESS_PROBE_DELAY);
	});
});

// Acknowledge uncaught exceptions
process.on('uncaughtException', function (err) {
	console.info('Uncaught Exception: ', err.stack || err);
});
