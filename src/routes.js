const { sendNotFound } = require('./helpers/response')
const authRoutes = require('./api/routes/auth')
const roomRoutes = require('./api/routes/room')
const bookRoutes = require('./api/routes/book')
module.exports = (app) => {
    app.get('/ping', (req, res) =>
        res.send({
            status: 'SUCCESS',
            code: 200,
            message: 'Pong!'
        })
    )
    app.use('/auth', authRoutes)
    app.use('/rooms', roomRoutes)
    app.use('/books', bookRoutes)

    app.use((req, res) => sendNotFound(res))
}
