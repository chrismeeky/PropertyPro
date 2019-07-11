import Joi from 'joi';
const schema = Joi.object().keys({
	status: Joi.string().trim().max(9).min(4),
	price: Joi.number().required(),
    state: Joi.string().trim().max(20).required(),
    purpose: Joi.string().trim().max(8),
    city: Joi.string().trim().max(20).required(),
    address: Joi.string().trim().min(10).max(50).required(),
    type: Joi.string().trim().max(25).min(8).required(),
    title: Joi.string().trim().min(10).max(50),
    description: Joi.string().trim().min(10).max(1000),
    created_on: Joi.date().required(),
    image_url: Joi.string().required(),
    ownerEmail: Joi.string(),
    ownerPhoneNumber: Joi.string(),
});
export default schema;
