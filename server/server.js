if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const express = require('express');

const db = require('./database');

const app = express();

app.use(express.json());

app.get('/forecast', (req, res) => {
	db.query('SELECT * FROM forecast', (err, results) => {
		if (err) console.log(err);
		res.json(results);
	});
});

app.post('/forecast', (req, res) => {
	console.log(req.body);

	db.query(
		'INSERT INTO forecast SET id= ?, no_of_months = ?, project_name = ?, remarks = ?, months = ?',
		[
			uuid(),
			req.body.no_of_months,
			req.body.forecast_name,
			req.body.remarks,
			req.body.months
		],
		(err, results) => {
			if (err) console.log(err);
			res.json(results);
		}
	);
});

app.delete('/forecast/:id', (req, res) => {
	db.query(
		'DELETE FROM forecast WHERE id = ?',
		[req.params.id],
		(err, results) => {
			if (err) console.log(err);
			res.json(results);
		}
	);
});

app.listen(8090, () => console.log('Server is running on port 8090'));
