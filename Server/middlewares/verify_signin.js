/* eslint-disable no-tabs */
/* eslint-disable linebreak-style */
const bcrypt = require('bcrypt');
const users = require('../db/users');

let storedPassword;
let user;
const validateEmail = (email) => {
	for (let index = 0; index < users.length; index += 1) {
		if (users[index].email === email) {
			storedPassword = users[index].password;
			user = users[index];
			return true;
		}
	}
	return false;
};

const verifySignin = (req, res, next) => {
	let error = '';

	if (!validateEmail(req.body.email)) {
		error += 'email is wrong ,';
	}


	bcrypt.compare(req.body.password, storedPassword, (err, rslt) => {
		if (rslt) {
			req.user = user;
		} else {
			error += 'password is wrong ,';
		}
		if (error === '') {
			next();
		} else {
			return res.status(400).json({
				status: 'error',
				error,
			});
		}
		return true;
	});
};

module.exports = verifySignin;
