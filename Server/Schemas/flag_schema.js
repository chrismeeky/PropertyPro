import Joi from 'joi';

const schema = Joi.object().keys({
	property_id: Joi.number().required(),
	created_on: Joi.string().required(),
	reason: Joi.string().trim().required(),
	description: Joi.string().trim().required(),
	
});
export default schema;
