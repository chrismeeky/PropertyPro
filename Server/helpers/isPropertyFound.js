/* eslint-disable no-else-return */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-tabs */
const properties = require('../db/properties');

const isPropertyFound = (req, res, next) => {
	if (req.url === '/property' || req.url === '/property/') {
		if (properties.length > 0) {
			return next();
		} else {
			return res.status(404).json({
				status: 'error',
				error: 'property not found',
			});
		}
	} else {
		const { id } = req.params;
		let found;
		if (properties.length > 0) {
			properties.map((result) => {
				if (result.id === parseInt(id, 10) || result.type === req.query.type) {
					found = true;
				}
			});
			if (found) {
				return next();
			} else {
				return res.status(404).json({
					status: 'error',
					error: 'property not found',
				});
			}
		} else {
			return res.status(404).json({
				status: 'error',
				error: 'property not found',
			});
		}
	}
};


module.exports = isPropertyFound;
