const express = require('express')
const { User, userSchema, userValidate } = require('../module/user')
const route = express.Router()
const _ = require("lodash") //pick selected key from object

route.post('/', async(req, res) => {
    const { error } = userValidate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) return res.status(400).send("email id is already register")
            // user = new User({
            //     name: req.body.name,
            //     email: req.body.email,
            //     password: req.body.password

        // })

        //use of lodash in the place of above code
        user = new User(_.pick(req.body, ['name', 'email', 'password']))

        await user.save()

        //use lodash library to select arguments 
        // return res.send({ name: user.name, email: user.email }) // return user by hiding password 
        return res.send(_.pick(user, ['_id', 'name', 'email']))
    } catch (err) { res.status(400).send(err.message) }
    //return res.send(await user.save())
})

module.exports = route