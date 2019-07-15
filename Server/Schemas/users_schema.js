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
});
export default schema;
