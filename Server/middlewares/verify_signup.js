/* eslint-disable no-tabs */
/* eslint-disable linebreak-style */
import Joi from 'joi';
import bcrypt from 'bcrypt';
import userSchema from '../Schemas/users_schema';
import extractErrors from '../helpers/extract_errors';

const verifySignup = (req, res, next) => {

	Joi.validate(req.body, userSchema, (error, result) => {
		if (!error) {
			bcrypt.hash(req.body.password, 10, (err, hash) => {
				if (err) {
					return res.status(406).json({
						success: false,
						err,
					});
				}
				req.body.password = hash;
				next();
			});
		} else {
			const errors = extractErrors(error);
			return res.status(406).json({
				status: 'error',
				errors,
			});
		}
	});
};

export default verifySignup;
