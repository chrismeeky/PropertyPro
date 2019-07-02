/* eslint-disable no-tabs */
/* eslint-disable linebreak-style */
const bcrypt = require('bcrypt');
const users = require('../db/users');
const validate = require('../helpers/inputvalidation');

const userModel = (req, res, next) => {
	const user = {
		id: users.length + 1,
		email: req.body.email,
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		password: req.body.password,
		phone_number: req.body.phone_number,
		address: req.body.address,
		is_admin: req.body.is_admin,
	};
	let error = '';
	if (typeof user.id !== 'number') {
		error += 'id is invalid, ';
	}
	if (!validate.validateEmail(user.email)) {
		error += 'invalid email or email already exists ,';
	}
	if (!validate.validateFirstName(user.first_name)) {
		error += 'invalid first name, ';
	}
	if (!validate.validateLastName(user.last_name)) {
		error += 'invalid last name, ';
	}
	if (!validate.validatePassword(user.password)) {
		error += 'password is invalid, ';
	}

	if (!validate.validatePhone(user.phone_number)) {
		error += 'phone number is invalid ,';
	}
	if (!validate.validateAddress(user.address)) {
		error += 'invalid address, ';
	}
	if (!validate.validateAdmin(user.is_admin)) {
		error += 'user type not provided, ';
	}

	if (error === '') {
		bcrypt.hash(user.password, 10, (err, hash) => {
			if (err) {
				console.log('error');
				res.json({
					success: false,
					err,
				});
			} else {
				user.password = hash;
				req.user = user;
				users.push(user);
				next();
			}
		});
	} else {
		console.log(error);
		res.status(403).json({
			status: 'error',
			error,
		});
	}
};

module.exports = userModel;
