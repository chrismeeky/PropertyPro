/* eslint-disable no-tabs */
/* eslint-disable linebreak-style */

let ownerId;

const day = new Date();
/**
 * 
 * @param {Object} req [payload]
 * @param {Object} res [response]
 * @param {function} next [middleware]
 */
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
		purpose: req.body.purpose || 'not provided',
		state: req.body.state,
		city: req.body.city,
		address: req.body.address,
		type: req.body.type,
		title: req.body.title || 'not provided',
		description: req.body.description || 'not provided',
		created_on: day.toLocaleDateString(),
		image_url: req.body.image_url,
	};

	property.owner_id = req.authData.id;
	property.owner_email = req.authData.email;
	property.owner_phone_number = req.authData.phone_number;
	req.property = property;

	next();

};

export default verifyProperty;
