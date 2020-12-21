const { sendMail } = require('../../helpers/mail')
const moment = require('moment')
const model = require('../../../models')
const { bookRoomValidation } = require('../../validators/book')
const { sendSuccess, sendError } = require('../../helpers/response')

exports.bookRoom = async (req, res) => {
    try {
        const { error } = bookRoomValidation(req.body)
        if (error) return sendError(req, res, {
            code: 400,
            state: 'bookRoomFailed',
            message: error.details[0].message,
        });
        const { total_person, noted, room_id } = req.body
        const user_id = req.user.id
        const dateNow = new Date()
        const foundUser = await model.Users.findOne({
            attributes: { exclude: ['BookingId'] },
            where: {
                id: user_id,
            },
        });
        if (!foundUser) return sendError(req, res, {
            code: 400,
            state: 'bookRoomFailed',
            message: 'User not found.'
        });
        const foundRoom = await model.Rooms.findOne({
            attributes: { exclude: ['BookingId'] },
            where: {
                id: room_id,
            },
        });
        if (!foundRoom) return sendError(req, res, {
            code: 400,
            state: 'bookRoomFailed',
            message: 'Room not found.'
        });
        const room_capacity = parseInt(foundRoom.getDataValue('room_capacity'))
        if (total_person > room_capacity) return sendError(req, res, {
            code: 400,
            state: 'bookRoomFailed',
            message: 'Total person exceeding room capacity.'
        });
        const created_data = await model.Bookings.create({
            user_id,
            room_id,
            total_person,
            noted,
            booking_time: dateNow,
        })

        const userEmail = foundUser.getDataValue('email')
        const roomName = foundRoom.getDataValue('room_name')
        const emailSubject = `${roomName} Booking Notification`
        const formattedDate = moment(dateNow).format("MMM Do YY")
        const emailTextBody = `You have booked room ${roomName} at ${formattedDate} for ${total_person} person.`

        await sendMail(userEmail, emailSubject, emailTextBody)
        return sendSuccess(req, res, { state: 'bookRoomSucceeded', message: 'Room booked successfully.'}, created_data)
    } catch (error) {
        console.log(error)
        return sendError(req, res, { code: 500, error })
    }
}

exports.checkInBookedRoom = async (req, res) => {
    try {
        const { booking_id } = req.body
        const user_id = req.user.id
        const foundBooking = await model.Bookings.findOne({
            where: {
                id: booking_id,
                user_id,
            },
        })
        if (!foundBooking) return sendError(req, res, {
            code: 400,
            state: 'checkInBookedRoomFailed',
            message: 'Total person exceeding room capacity.'
        });
        const foundUser = await model.Users.findOne({
            attributes: { exclude: ['BookingId'] },
            where: {
                id: user_id,
            },
        });
        if (!foundUser) return sendError(req, res, {
            code: 400,
            state: 'bookRoomFailed',
            message: 'User not found.'
        });
        if (foundBooking.getDataValue('check_in_time')) return sendError(req, res, {
            code: 400,
            state: 'checkInBookedRoomFailed',
            message: 'Room already checked in.'
        });
        const dateNow = new Date()
        const updatedData = {
            check_in_time: dateNow
        }
        await model.Bookings.update(updatedData, { where: { id: booking_id } })
        const updatedBooking = await model.Bookings.findOne({
            where: {
                id: booking_id,
                user_id,
            },
        })
        const userEmail = foundUser.getDataValue('email')
        const emailSubject = `Check In Notification`
        const formattedDate = moment(dateNow).format("MMM Do YY")
        const emailTextBody = `You have checked in at ${formattedDate} for Booking with Booking ID ${booking_id}.`

        await sendMail(userEmail, emailSubject, emailTextBody)

        return sendSuccess(req, res, { state: 'checkInBookedRoomSucceeded', message: 'Check in booked room successfully.'}, updatedBooking)
    } catch (error) {
        console.log(error)
        return sendError(req, res, { code: 500, error })
    }
}
