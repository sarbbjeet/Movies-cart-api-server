const express = require('express')
const { User, userSchema, userValidate } = require('../module/user')
const route = express.Router()
const _ = require("lodash") //pick selected key from object

const bcrypt = require('bcrypt') //hashing password

const auth = require('../middleware/auth') //middleware to check valid token 


//access below route  by using web token  

route.get('/me', auth, async(req, res) => {
    try {
        //req.user keywoard came from auth middleware
        const user = await User.findById(req.user._id).select('-password') //deselect password
        res.send(user)

    } catch (ex) { res.status(400).json({ success: false, message: ex.message }) }

})

route.post('/', async(req, res) => {
    const { error } = userValidate(req.body)
    if (error) return res.status(400).json({ success: false, message: error.details[0].message })
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) return res.status(400).json({ success: false, message: "email id is already register" })
            // user = new User({
            //     name: req.body.name,
            //     email: req.body.email,
            //     password: req.body.password

        // })


        //use of lodash in the place of above code
        user = new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']))
            //hashing password and insert
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)

        //generate jwt token
        const token = await user.generateWebToken()
        if (!token) return res.status(400).json({ success: false, message: "server error, web token is not generated" })
        await user.save() //generate token before save user to database


        //use lodash library to select arguments  
        return res.header('x-auth-token', token)
            //allow custom token otherwise x-auth-token is not accesable
            .header("Access-Control-Expose-Headers", 'x-auth-token')
            .json(_.pick(user, ['_id', 'name', 'email', 'isAdmin']))
    } catch (err) { res.status(400).send(err.message) }
    //return res.send(await user.save())
})

module.exports = route