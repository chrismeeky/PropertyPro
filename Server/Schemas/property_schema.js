import Joi from 'joi';

const schema = Joi.object().keys({
    status: Joi.string().trim().min(4),
    price: Joi.number().required(),
    state: Joi.string().trim().min(3).required(),
    purpose: Joi.string().trim(),
    city: Joi.string().trim().min(3).required(),
    address: Joi.string().trim().min(1).required(),
    type: Joi.string().trim().required(),
    title: Joi.string().trim(),
    description: Joi.string().trim(),
    created_on: Joi.date().required(),
    image_url: Joi.string().required(),
    owner_email: Joi.string(),
    owner_phone_number: Joi.string(),
});
export default schema;
