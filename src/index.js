import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import config from './config';
import DB from './db';
import router from './router';
import APIError from './utils';

const port = config.PORT;
const app = express();

const database = new DB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined'));

app.use('/v1/', router);

app.listen(port, async () => {
	console.log(`listening on: ${port}`);
	await database.open();
});


async function chainDisconnect(cb) {
	await database.close();
	// future services which require shutdown here
	cb();
}

function gracefulShutdown() {
	if (process.env.NODE_ENV !== 'development') {
		console.info('Graceful shutdown initiated');
		chainDisconnect(() => {
			console.info(`Connections closed: EXITING ${new Date().toISOString()}`);
			process.exit();
		});
	} else {
		process.exit();
	}
}

const SIGNALS = ['SIGINT', 'SIGTERM'];

SIGNALS.forEach((signal) => {
	process.on(signal, () => {
		console.info(`Received ${signal} ${new Date().toISOString()}`);
		gracefulShutdown();
	});
});

process.on('uncaughtException', (error) => {
	const err = new APIError({
		error: error.stack || error,
		message: 'An uncaught exception occured'
	});
	console.log(err);
});

export default app;

import { verifyToken } from './services/userService';

(async () => {
	const toke = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJvayIsImlhdCI6MTU0NjEyODM2NiwiZXhwIjoxNTQ2MjE0NzY2fQ.Q-JLBnB-BQlI5CmnF6UqZzaEuHNqiHvAlwnd16pO9IE'
	console.log(await verifyToken(toke));
})()
