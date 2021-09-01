const express = require("express");
const { User } = require("../module/user");
const route = express.Router();
const _ = require("lodash");

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

module.exports = route;