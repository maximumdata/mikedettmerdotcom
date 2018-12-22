import config from './config';
import express from 'express';
import bodyParser from 'body-parser';
import db from './utils/db';
import router from './router';

const port = config.PORT || 2369;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(router);

app.listen(port, () => {
	console.log(`listening on: ${port}`);
});

// import sandbox from './sandbox';
export default app;
