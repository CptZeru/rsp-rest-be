const Joi = require('joi');

exports.createRoomValidation = data => {
    const schema = Joi.object({
        room_name: Joi.string(),
        room_capacity: Joi.string(),
        photo: Joi.string(),
    })
    return schema.validate(data)
}
