import Test from '../models/test';

const ok = new Test({ name: 'ok', date: new Date(2018, 0, 1) });

// ok.save((err) => {
// 	if (err) return console.log(err);
// 	console.log('saved!');
// });

export default ok;

Test.find({ 'name': 'ok' }, 'date name', (err, any) => {
	if (err) return console.log('error!', err);
	console.log(any);
});
