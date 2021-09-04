const express = require("express");
const { User } = require("../module/user");
const route = express.Router();
const _ = require("lodash");
const Joi = require("joi");
const randomCode = require("crypto-random-string");
const { mailSender } = require("../utils/mailSender");
const { SecretCode } = require("../module/secretCode");
const bCrypt = require("bcrypt");

route.post("/find-account", async(req, res) => {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (!user)
        return res
            .status(400)
            .json({ success: false, message: "Entered email does not exist" });
    return res.json({
        success: true,
        message: _.pick(user, ["_id", "name", "email"]),
    });
});

//generate 6 char password and send to define email address
route.post("/reset-password", async(req, res) => {
    const email = req.body.email;
    //validate email
    const { error } = Joi.validate({ email }, { email: Joi.string().email().required() });
    if (error)
        return res
            .status(400)
            .json({ success: false, message: error.details[0].message });

    try {
        const code = randomCode({ length: 6 }); //6 char long
        const html = `<div>
                    <p>We received a request to reset your account password</p>
                    <p>Enter the following password reset code: <strong>${code}</strong></p>
                    </div>`;
        const subject = `account recovery code is ${code}`;

        await mailSender({ subject, receiver: email, html, body: "" }); //send mail
        let response = new SecretCode({ email, code });
        response = await response.save();
        if (response)
            return res.json({
                success: true,
                message: "secret code sent successfully",
            });
        return res
            .status(400)
            .json({ success: false, message: "error to sent code" });
    } catch (ex) {
        return res.status(400).json({ success: false, message: ex.message });
    }
});

//verify security code is matching or not
route.post("/verify-secret-code", async(req, res) => {
    const { email, code } = req.body;
    try {
        const getCode = await SecretCode.findOne({ email, code });
        if (!getCode)
            return res
                .status(400)
                .json({ success: false, message: "wrong security code" });
        await SecretCode.deleteMany({ email });
        return res.json({ success: true, message: "Great code matched" });
    } catch (ex) {
        res.status(400).json({ success: false, message: ex.message });
    }
});

//update password
route.post("/update-password", async(req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user)
        res.status(400).json({ success: false, message: "user does not exist" });
    try {
        const salt = await bCrypt.genSalt(4);
        user.password = await bCrypt.hash(password, salt);
        await user.save();
        return res.json({
            success: true,
            message: "successfully password updated",
        });
    } catch (ex) {
        res.status(400).json({ success: false, message: ex.message });
    }
});

module.exports = route;