const express = require('express')
const Joi = require('joi')
const route = express.Router()
const { User } = require('../module/user')
const bcrypt = require('bcrypt')
const _ = require('lodash')

const authValidate = (user) => {
    const schema = {
        email: Joi.string().required().min(5).max(255).email(),
        password: Joi.string().required().min(5).max(255)
    }
    return Joi.validate(user, schema)
}

//match email and password to check authentication  
route.post('/', async(req, res) => {
    const { error } = authValidate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    try {
        let user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(400).send("email id is wrong ")
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) return res.status(400).send("password is invalid")




        //next step to return header with json token 
        //   const token = await jwt.sign({ _id: this._id }, "jwtPrivateKey")
        const token = await user.generateWebToken()
            // return res.send(await user.generateWebToken())
        return res.header('x-auth-token', token).send(_.pick(user, ['_id', "name", "email"]))

    } catch (err) { return res.status(400).send(err.message) }


    //compare password 


})


module.exports = route