import Joi from 'joi';
const schema = Joi.object().keys({
	status: Joi.string().trim().min(4),
	price: Joi.number().required(),
    state: Joi.string().trim().required(),
    purpose: Joi.string().trim().max(13),
    city: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
    type: Joi.string().trim().required(),
    title: Joi.string().trim(),
    description: Joi.string().trim(),
    created_on: Joi.date().required(),
    image_url: Joi.string().required(),
    ownerEmail: Joi.string(),
    ownerPhoneNumber: Joi.string(),
});
export default schema;
