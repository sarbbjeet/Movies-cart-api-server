const nodemailer = require('nodemailer')
const config = require('config')

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config.get('user'),
        pass: config.get('pass')
    }
})


const mailSender = async(subject, body, receiver) => {
    return await transporter.sendMail({
        from: config.get('user'), //env variable saved email address
        to: receiver,
        subject: subject,
        text: body,
        //html: '<h1>help me </h1>'
    })
}

module.exports = mailSender