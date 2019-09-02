/* eslint-disable consistent-return */
/* eslint-disable no-tabs */
import jwt from 'jsonwebtoken';
/**
 * 
 * @param {Object} req [payload]
 * @param {Object} res [response]
 * @param {function} next [middleware]
 */
const verifyToken = (req, res, next) => {
	const bearerHeader = req.headers.authorization;
	if (typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(' ');
		// get token from array after split
		const token = bearer[1];
		jwt.verify(token, 'secretkey', (err, authData) => {
			if (err) {
				res.status(417).json({
					status: 'error',
					error: 'invalid authorization token',
				});
			} else {
				req.authData = authData;
				next();
			}
		});
	} else {
		return res.status(401).json({
			status: 'error',
			error: 'A valid token is needed for authorization',
		});
	}
};

export default verifyToken;
