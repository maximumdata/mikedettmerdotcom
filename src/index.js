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

export default app;
