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
			const maxId = result.rows[0].max;
			if (maxId === null) {
				id = 1;
			}
			else {
				id = maxId + 1;
			}
			req.id = id;
			next();
		});
		done()
	});
};

export default generateId;
