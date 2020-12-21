const sgMail = require('@sendgrid/mail')

exports.sendMail = async (email, subject, text) => {
    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: email,
            from: process.env.EMAIL_FROM,
            subject,
            text,
        };
        await sgMail.send(msg);
    } catch(error) {
        console.log(error)
        return error;
    }
}
