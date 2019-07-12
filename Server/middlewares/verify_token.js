/* eslint-disable no-tabs */
const verifyToken = (req, res, next) => {
	const bearerHeader = req.headers.authorization;
	if (typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(' ');
		// get token from array after split
		const token = bearer[1];
		req.token = token;
		next();
	} else {
		return res.status(401).json({
			status: 'error',
			error: 'A valid token is needed for authorization',
		});
	}
};

export default verifyToken;
