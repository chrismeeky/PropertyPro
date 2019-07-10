import Joi from 'joi';

const schema = Joi.object().keys({
	property_id: Joi.string().trim().required(),
	created_on: Joi.string().required(),
	reason: Joi.string().trim().min(8).max(100).required(),
	description: Joi.string().trim().max(1000).min(8).required(),
	
});
export default schema;
