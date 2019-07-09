/* eslint-disable no-tabs */
/* eslint-disable linebreak-style */
import jwt from 'jsonwebtoken';
import properties from '../db/properties';
import validate from './inputValidation';
import generateId from './generateId';

let ownerId;

const day = new Date();

const verifyProperty = (req, res, next) => {
	const property = {
		owner: ownerId,
		status: req.body.status,
		price: req.body.price,
		purpose: req.body.purpose,
		state: req.body.state,
		city: req.body.city,
		address: req.body.address,
		type: req.body.type,
		title: req.body.title,
		description: req.body.description,
		created_on: day.toLocaleString(),
		image_url: req.body.image_url,
	};
	jwt.verify(req.token, 'secretkey', (err, authData) => {
		if (err) {
			return res.sendStatus(403);
		}
		property.ownerId = authData.id;
		property.ownerEmail = authData.email;
		property.ownerPhoneNumber = authData.phone_number;
		req.property = property;
		next();
	});
};

export default verifyProperty;
