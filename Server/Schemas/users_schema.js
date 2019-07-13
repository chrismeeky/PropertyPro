import Joi from 'joi';
const schema = Joi.object().keys({
	email: Joi.string().trim().email().required(),
	first_name: Joi.string().trim().max(20).required(),
	last_name: Joi.string().trim().max(20).required(),
	password: Joi.string().trim().required(),
	phoneNumber: Joi.string().trim().required(),
	state: Joi.string().trim().required(),
	city: Joi.string().trim().required(),
	address: Joi.string().trim().required(),
});
export default schema;
