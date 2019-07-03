/* eslint-disable no-else-return */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-tabs */
const properties = require('../db/properties');

const isPropertyFound = (req, res, next) => {
	let found = false;
	if (properties.length > 0) {
		if (req.url === '/property' || req.url === '/property/') {
			return next();
		} else {
			const { id } = req.params;
			properties.map((result) => {
				if (result.id === parseInt(id, 10) || result.type === req.query.type) {
					found = true;
					return next();
				}
				return next();
			});
			if (!found) {
				return res.status(404).json({
					status: 'error',
					error: 'property not found',
				});
			}
		}
	}
	else {
		return res.status(404).json({
			status: 'error',
			error: 'property not found',
		});
	}
};

module.exports = isPropertyFound;
