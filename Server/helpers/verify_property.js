/* eslint-disable no-tabs */
/* eslint-disable linebreak-style */
import jwt from 'jsonwebtoken';


let ownerId;

const day = new Date();

const verifyProperty = (req, res, next) => {
	if (!req.file) {
		return res.status(415).json({
		  status: 'error',
		  error: 'You must attach a valid image',
		});
	  }
	const property = {
		owner: ownerId,
		status: req.body.status || 'available',
		price: parseFloat(req.body.price),
		purpose: req.body.purpose,
		state: req.body.state,
		city: req.body.city,
		address: req.body.address,
		type: req.body.type,
		title: req.body.title,
		description: req.body.description,
		created_on: day.toLocaleDateString(),
		image_url: req.body.image_url,
	};
	jwt.verify(req.token, 'secretkey', (err, authData) => {
		if (err) {
			return res.sendStatus(403);
		}
		property.ownerId = authData.id;
		property.ownerEmail = authData.email;
		property.ownerPhoneNumber = authData.phonenumber;
		req.property = property;
		next();
	});
};

export default verifyProperty;
