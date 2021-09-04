const nodemailer = require("nodemailer");
const config = require("config");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "devcodetest1@gmail.com",
        pass: "Shaktiman123",
        // user: config.get("user"), //or process.env.username
        // pass: config.get("pass"), //or process.env.password,
    },
});

const mailSender = async({ subject, body, receiver, html = "" }) => {
    return await transporter.sendMail({
        from: process.env.username, //env variable saved email address
        to: receiver,
        subject: subject,
        text: body,
        html,
    });
};

module.exports = { mailSender };