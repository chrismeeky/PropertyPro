/* eslint-disable no-tabs */
const properties = require('../db/properties');

const generateId = () => {
	let id;
	if (properties.length === 0) {
		id = 1;
	} else {
		id = properties[properties.length - 1].id + 1;
	}
	return id;
};
module.exports = generateId;
