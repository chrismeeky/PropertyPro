/* eslint-disable no-tabs */
/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');
const properties = require('../db/properties');
const validate = require('./inputvalidation');
const generateId = require('./generateId');

let ownerId;

const day = new Date();

const verifyProperty = (req, res, next) => {
	const property = {
		id: generateId(properties),
		owner: ownerId,
		status: req.body.status,
		price: req.body.price,
		state: req.body.state,
		city: req.body.city,
		address: req.body.address,
		type: req.body.type,
		created_on: day.toLocaleString(),
		image_url: req.body.image_url,
	};
	jwt.verify(req.token, 'secretkey', (err, authData) => {
		if (err) {
			res.sendStatus(403);
		} else {
			property.ownerId = authData.id;
			property.ownerEmail = authData.email;
			property.ownerPhoneNumber = authData.phone_number;
		}
	});


	let error = '';

	if (validate.validateSatus(req.body.status) !== 'available' && validate.validateSatus(req.body.status) !== 'sold') {
		error += 'status should read sold or available ,';
	} else {
		property.status = validate.validateSatus(req.body.status);
	}
	if (!validate.validatePrice(req.body.price)) {
		error += 'invalid price, ';
	}
	if (!validate.validateState(req.body.state)) {
		error += 'invalid state, ';
	}
	if (!validate.validateCity(req.body.city)) {
		error += 'invalid city, ';
	}
	if (!validate.validateType(req.body.type)) {
		error += 'invalid type, ';
	}

	if (!validate.validateImageUrl(req)) {
		error += 'invalid image, ';
	}
	if (!validate.validateUniqueness(property.image_url)) {
		error += 'property exists, ';
	}
	if (error === '') {
		req.property = property;
		next();
	} else {
		console.log(error);
		res.status(403).json({
			status: 'error',
			error,
		});
	}
};

module.exports = verifyProperty;
