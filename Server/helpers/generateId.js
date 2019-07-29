/* eslint-disable no-tabs */
import pool from '../config/pool';
/**
 * 
 * @param {Object} req [payload]
 * @param {Object} res [response]
 * @param {function} next [middleware]
 */

const generateId = (req, res, next) => {
	let id;

	pool.query('SELECT MAX(id) FROM property', (err, result) => {
		if (result === undefined) {
			id = 1;
		} else {
			id = result.rows[0].max + 1;
		}
		req.id = id;
		next();
	});
};

export default generateId;
