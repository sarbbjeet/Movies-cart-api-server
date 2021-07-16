//create genre schema 

const mongoose = require('mongoose')
const Joi = require('joi') //version @13.1.0

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    addr: { type: String, required: true, minlength: 5, maxlength: 255 },
    age: { type: Number, required: true, min: 5, max: 100 },
    isGold: { type: Boolean, default: false },
    phone: { type: String, required: true }

})

const Customer = mongoose.model('Customers', customerSchema)

//validate genre rest api client side entered json data
const customerValidate = (customer) => {
    const schema = {
        name: Joi.string().required(),
        addr: Joi.string().required().min(5).max(255),
        age: Joi.number().required(),
        isGold: Joi.boolean(),
        phone: Joi.string().required().min(8).max(12)
    }
    return Joi.validate(customer, schema)
}

module.exports = { customerSchema, customerValidate, Customer }