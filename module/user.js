const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('config')

const userSchema = new mongoose.Schema({

    name: { type: String, required: true, minlength: 5, maxlength: 50 },
    email: { type: String, required: true, unique: true, minlength: 5, maxlength: 255 },
    password: { type: String, required: true, minlength: 5, maxlength: 100 },
    isAdmin: { type: Boolean, default: false }

})

userSchema.methods.generateWebToken = async function() {
    // const token = await jwt.sign({ _id: this._id }, "jwtPrivateKey") //we cannot write jwt key hardcoded
    //npm i config 
    //we need to replace hard-coded jwt key with environment variable 
    //need to create config folder with "default.json" and "custom-environment-variables.json" files

    if (!config.get('jwtPrivateKey')) {
        // return res.send('private key not found')
        return null
            // console.error('private key not found')
            // process.exit(1) //failure
    }
    const token = await jwt.sign({ _id: this._id, name: this.name, admin: this.isAdmin }, config.get('jwtPrivateKey'))
    return token
}

const User = mongoose.model('users', userSchema)

const userValidate = (user) => {
    const schema = {
        name: Joi.string().required().min(5).max(50),
        email: Joi.string().required().email().min(5).max(255),
        password: Joi.string().required().min(5).max(255),
        isAdmin: Joi.boolean()
    }
    return Joi.validate(user, schema)
}


module.exports = { userSchema, User, userValidate }