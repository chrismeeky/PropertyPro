/* eslint-disable no-tabs */
/* eslint-disable linebreak-style */
import { Pool } from 'pg';
import bcrypt from 'bcrypt';

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'propertyprolite',
	password: 'mekusmekusdot666',
	port: 5432,
});

let user;

const verifySignin = (req, res, next) => {
	pool.connect((err, client, done) => {
		if (err) {
			return res.status(403).json({
				status: 'error',
				error: err,
			});
		}
		client.query('SELECT * FROM users WHERE email = $1', [req.body.email], (error, result) => {
			if (result.rows.length === 0) {
				return res.status(404).json({
					status: 'error',
					error: 'User does not exist. Double check your email address and password',
				});
			}
			user = result.rows[0];
			bcrypt.compare(req.body.password, user.password, (Err, rslt) => {
				if (!rslt) {
					return res.status(401).json({
						status: 'error',
						error: 'Email and password do not match',
					});
				}

				req.user = user;
				next();

			});
		});

		done();
	})

};

export default verifySignin;
