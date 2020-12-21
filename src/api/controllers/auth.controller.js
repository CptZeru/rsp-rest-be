const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { loginValidation, registerValidation } = require('../../validators/auth');
const model = require('../../../models');
const { sendError, sendSuccess } = require('../../helpers/response');

exports.login = async (req,res) => {
    try {
        const { error } = loginValidation(req.body);
        if (error) return sendError(req, res, {
            code: 400,
            state: 'loginFailed',
            message: error.details[0].message,
        });
        const { email, password } = req.body;

        const foundUser = await model.Users.findOne({
            attributes: { exclude: ['BookingId'] },
            where: {
                email
            },
        });
        if (!foundUser) return sendError(req, res, {
            code: 400,
            state: 'loginFailed',
            message: 'Invalid Email or Password.'
        });

        const validPass = await bcrypt.compare(password, foundUser.getDataValue('password'));
        if (!validPass) return sendError(req, res, {
            code: 400,
            state: 'loginFailed',
            message: 'Invalid Email or Password.'
        });

        const token = jwt.sign(
            {
                id: foundUser.getDataValue('id').toString(),
                email: foundUser.getDataValue('email')
            },
            process.env.JWT_SECRET,
            {
                subject: foundUser.getDataValue('id').toString(),
                expiresIn: 3600,
            }
        );
        return sendSuccess(req, res, { state: 'loginSucceeded', message: 'Login succeeded.' }, { token })
    } catch (error){
        console.log(error);
        return sendError(req, res, { code: 500, error })
    }
};

exports.register = async (req,res) => {
    try {
        const { error } = registerValidation(req.body);
        if (error) return sendError(req, res, {
            code: 400,
            state: 'loginFailed',
            message: error.details[0].message,
        });
        const { email, password, photo } = req.body;
        const foundUser = await model.Users.findOne({
            attributes: { exclude: ['BookingId'] },
            where: {
                email
            },
        });
        if (foundUser) return sendError(req, res, {
            code: 400,
            state: 'registrationFailed',
            message: 'Email already used.'
        });
        const hashedPassword = await hashPassword(password)
        const createdData = await model.Users.create({
            email,
            password: hashedPassword,
            photo,
        })
        const response = {
            id: createdData.id,
            email: createdData.email
        }
        return sendSuccess(req, res, { state: 'registrationSucceeded', message: 'Registration Success'}, response)
    } catch (error) {
        console.log(error);
        return sendError(req, res, { code: 500, error })
    }
};

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt)
}
