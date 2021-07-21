const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = new mongoose.Schema({

    name: { type: String, required: true, minlength: 5, maxlength: 50 },
    email: { type: String, required: true, unique: true, minlength: 5, maxlength: 255 },
    password: { type: String, required: true, minlength: 5, maxlength: 100 }
})

const User = mongoose.model('users', userSchema)

const userValidate = (user) => {
    const schema = {
        name: Joi.string().required().min(5).max(50),
        email: Joi.string().required().email().min(5).max(255),
        password: Joi.string().required().min(5).max(255)
    }
    return Joi.validate(user, schema)
}


module.exports = { userSchema, User, userValidate }