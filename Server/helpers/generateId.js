/* eslint-disable no-tabs */
import pool from '../config/pool';


const generateId = (req, res, next) => {
	let id;
	pool.connect((error, client, done) => {
		if (error) {
			return res.json({
				status: 'error',
				error,
			});
		}
		client.query('SELECT MAX(id) FROM property', (err, result) => {
			if (result === undefined) {
				id = 1;
			}
			else {
				id = result.rows[0].max  + 1;
			}
			req.id = id;
			next();
		});
		done()
	});
};

export default generateId;
