import Joi from 'joi';
const schema = Joi.object().keys({
	email: Joi.string().trim().email().required(),
	first_name: Joi.string().trim().max(20).required(),
	last_name: Joi.string().trim().max(20).required(),
	password: Joi.string().trim().min(8).max(16).required(),
	phoneNumber: Joi.string().trim().max(15).min(8).required(),
	state: Joi.string().trim().max(20).min(3).required(),
	city: Joi.string().trim().max(20).min(3).required(),
	address: Joi.string().trim().min(10).max(50).required(),
});
export default schema;
