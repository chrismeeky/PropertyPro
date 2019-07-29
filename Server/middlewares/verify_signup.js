/* eslint-disable no-console */
/* eslint-disable no-tabs */
/* eslint-disable linebreak-style */
import bcrypt from 'bcrypt';
import inputValidation from '../helpers/inputvalidation'
/**
 * 
 * @param {Object} req [payload]
 * @param {Object} res [response]
 * @param {function} next [middleware]
 */
const verifySignup = (req, res, next) => {
	let error = '';
	if (!inputValidation.validateEmail(req.body.email)) {
		error += 'email is invalid';
	}
	if (!inputValidation.validateFirstName(req.body.first_name)) {
		error += ', first name is invalid';
	}
	if (!inputValidation.validateLastName(req.body.last_name)) {
		error += ', last name is invalid'
	}
	if (!inputValidation.validatePassword(req.body.password)) {

		error += ', password is invalid, ';
	}
	if (!inputValidation.validateAddress(req.body.address)) {
		error += ', invalid address';
	}
	if (!inputValidation.validatePhone(req.body.phone_number)) {
		error += ', invalid phone number';
	}

	if (error === '') {
		bcrypt.hash(req.body.password, 10, (err, hash) => {
			if (err) {
				return res.status(401).json({
					status: 'error',
					error: err,
				});
			}
			req.body.password = hash;
			next();
		});
	} else {
		return res.status(406).json({
			status: 'error',
			error,
		});
	}

};

export default verifySignup;
