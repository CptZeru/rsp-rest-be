const model = require('../../../models');
const { sendError, sendSuccess, sendForbidden } = require('../../helpers/response');
const { createRoomValidation } = require('../../validators/room')

exports.createRoom = async (req, res) => {
    try {
        if (!req.user.admin) return sendForbidden(res)
        const { error } = createRoomValidation(req.body);
        if (error) return sendError(req, res, {
            code: 400,
            state: 'createRoomFailed',
            message: error.details[0].message,
        });
        const { room_name, room_capacity, photo } = req.body
        if (room_capacity === '0') return sendError(req, res, {
            code: 400,
            state: 'createRoomFailed',
            message: 'Room capacity cannot be 0.'
        });
        const foundRoom = await model.Rooms.findOne({
            attributes: { exclude: ['BookingId', 'booking_id'] },
            where: {
                room_name
            },
        });
        if (foundRoom) return sendError(req, res, {
            code: 400,
            state: 'createRoomFailed',
            message: 'Room name already exists.'
        });
        const createdData = await model.Rooms.create({
            room_name,
            room_capacity,
            photo,
        })
        return sendSuccess(req, res, { state: 'createRoomSucceeded', message: 'Create room success.'}, createdData)
    } catch (error) {
        console.log(error)
        return sendError(req, res, { code: 500, error })
    }
}

exports.getListRooms = async (req, res) => {
    try {
        const foundRooms = await model.Rooms.findAll({
            attributes: { exclude: ['BookingId'] },
        })
        return sendSuccess(req, res, { state: 'getListRoomsSucceeded', message: 'Get list room success.'}, foundRooms)
    } catch (error) {
        console.log(error)
        return sendError(req, res, { code: 500, error })
    }
}
