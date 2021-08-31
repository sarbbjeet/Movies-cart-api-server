const express = require("express");
const { User, userSchema, userValidate } = require("../module/user");
const route = express.Router();
const _ = require("lodash"); //pick selected key from object
const bcrypt = require("bcrypt"); //hashing password
const auth = require("../middleware/auth"); //middleware to check valid token
const randomCode = require("crypto-random-string");

const { secretCodeHandler } = require("../utils/secretCodeHandler");
const { mailSender } = require("../utils/mailSender");
const { SecretCode } = require("../module/secretCode");

//access below route  by using web token

const responseToServe = (statusCode, res, msg, success = false) => {
    return res.status(statusCode).json({ success, message: msg });
};

route.get("/me", auth, async(req, res) => {
    try {
        //req.user keywoard came from auth middleware
        const user = await User.findById(req.user._id).select("-password"); //deselect password
        res.send(user);
    } catch (ex) {
        res.status(400).json({ success: false, message: ex.message });
    }
});

route.post("/", async(req, res) => {
    const { error } = userValidate(req.body);
    if (error) responseToServe(400, res, error.details[0].message);
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) responseToServe(400, res, "email id is already register");
        user = new User(_.pick(req.body, ["name", "email", "password", "isAdmin"]));
        //hashing password and insert
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        //generate jwt token
        const token = await user.generateWebToken();
        if (!token)
            responseToServe(400, res, "server error, web token is not generated");

        const secretCodeObject = await secretCodeHandler(user.email);
        if (!secretCodeObject.success)
            responseToServe(400, res, secretCodeObject.message);

        const baseUrl = `${req.protocol}://${req.get("host")}`;
        let subject = "Your Activation Link ...";

        let body = `Please use the following link within the next 10 minutes to activate 
              your account: ${baseUrl}/api/users/${user._id}/${secretCodeObject.message.code}`;
        await mailSender(subject, body, user.email); //send mail with verification code otp

        await user.save(); //generate token before save user to database
        //use lodash library to select arguments
        return (
            res
            .header("x-auth-token", token)
            //allow custom token otherwise x-auth-token is not accesable
            .header("Access-Control-Expose-Headers", "x-auth-token")
            .json(_.pick(user, ["_id", "name", "email", "isAdmin"]))
        );
    } catch (err) {
        responseToServe(400, res, err.message);
    }
    //return res.send(await user.save())
});

//activate account

route.get("/:id/:code", async(req, res) => {
    const code = req.params.code;
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) responseToServe(400, res, "wrong user id");
    const email = user.email;
    const response = await SecretCode.findOne({ email, code });
    if (!response) responseToServe(400, res, "wrong verification key...");
    user.isVerified = true; //verfied account
    await user.save();
    await SecretCode.deleteMany({ email });
    return res.status(200).json({
        success: true,
        message: _.pick(user, ["_id", "isAdmin", "isVerified", "email"]),
    });
});

module.exports = route;