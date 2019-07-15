import Joi from 'joi';
const schema = Joi.object().keys({
	email: Joi.string().trim().email().required(),
	first_name: Joi.string().trim().max(20).required(),
	last_name: Joi.string().trim().max(20).required(),
	password: Joi.string().trim().required(),
	phone_number: Joi.string().trim().required(),
	state: Joi.string().trim(),
	city: Joi.string().trim(),
	address: Joi.string().trim().required(),
	is_admin: Joi.boolean(),
	street: Joi.string().trim(),
	country: Joi.string().trim(),
	phone: Joi.string().trim(),
	zip: Joi.string().trim()
});
export default schema;
