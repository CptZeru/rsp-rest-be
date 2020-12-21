const Joi = require('Joi')

exports.bookRoomValidation = data => {
    const schema = Joi.object({
        room_id: Joi.number().required(),
        noted: Joi.string(),
        total_person: Joi.number().required(),
    })
    return schema.validate(data)
}
