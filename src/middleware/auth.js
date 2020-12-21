const jwt = require('jsonwebtoken')
const { sendForbidden } = require('../helpers/response')

exports.authMiddleware = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) return sendForbidden(res)

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.token = token
        req.user = user
        if (user.email.includes('admin')) req.user.admin = true

        return next()
    } catch (error) {
        console.log(error)
        const message = error.message.replace(/jwt/gi, 'JWT') + '.'
        return sendForbidden(res, message)
    }
}
