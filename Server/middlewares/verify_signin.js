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

let storedPassword;
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
			// console.log(user);
			bcrypt.compare(req.body.password, user.password, (Err, rslt) => {
				if (Err) {
					return res.status(401).json({
						status: 'error',
						error: Err,
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
