import Joi from 'joi';
const schema = Joi.object().keys({
	status: Joi.string().trim().max(9).min(4),
	price: Joi.string().trim().max(20).required(),
    state: Joi.string().trim().max(20).required(),
    city: Joi.string().trim().max(20).required(),
    address: Joi.string().trim().min(10).max(50).required(),
    type: Joi.string().trim().max(15).min(8).required(),
    title: Joi.string().trim().min(10).max(50).required(),
    description: Joi.string().trim().min(10).max(50).required(),
    created_on: Joi.string().required(),
    image_url: Joi.string().required(),
});
export default schema;
