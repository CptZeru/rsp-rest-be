const Joi = require('joi');

exports.loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required()
    })
    return schema.validate(data)
}

exports.registerValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required(),
        photo: Joi.string()
    })
    return schema.validate(data)
}

