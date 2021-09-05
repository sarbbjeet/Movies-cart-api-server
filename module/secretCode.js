const Joi = require("joi");
const mongoose = require("mongoose");

const secretSchema = new mongoose.Schema({
    createdDate: { type: Date, default: Date.now(), expires: 3600 },
    email: { type: String, required: true },
    code: { type: String, required: true },
});

const SecretCode = mongoose.model("secretCode", secretSchema);

const secretValidate = (data) => {
    const schema = {
        code: Joi.string().required(),
        email: Joi.string().required().email(),
    };
    return Joi.validate(data, schema);
};

module.exports = { SecretCode, secretSchema, secretValidate };