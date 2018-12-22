import express from 'express';
import { mongoose } from './config';

const app = express();

app.use('/', (req, res) => {
	res.json({hey: 'there'});
});

app.listen(2368, () => {
	console.log('listening');
});

import sandbox from './sandbox';
