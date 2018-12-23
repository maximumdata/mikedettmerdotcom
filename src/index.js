import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import DB from './db';
import router from './router';

const port = config.PORT;
const app = express();

const database = new DB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
	console.info('Graceful shutdown initiated');
	chainDisconnect(() => {
		console.info(`Connections closed: EXITING ${new Date().toISOString()}`);
		process.exit();
	});
}

const SIGNALS = ['SIGINT', 'SIGTERM'];

SIGNALS.forEach((signal) => {
	process.on(signal, () => {
		console.info(`Received ${signal} ${new Date().toISOString()}`);
		gracefulShutdown();
	});
});

process.on('uncaughtException', function (err) {
	console.info('Uncaught Exception: ', err.stack || err);
});

export default app;
