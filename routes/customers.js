const express = require('express')

const route = express.Router()
const mongoose = require('mongoose')
const { customerSchema, customerValidate, Customer } = require('../module/customer')

const auth = require('../middleware/auth')

// const Genre = mongoose.model('Genre', genreSchema)

const checkValue = ({ val }) => {
    if (val == undefined || val == "")
        return null
    else
        return val
}

route.get('/', async(req, res) => {
    //check for //get data with the help of query ?name=xyz&id=abc
    const customers = await Customer.find()
    try {
        const name = checkValue({ val: req.query.name })
        const id = checkValue({ val: req.query.id })
        if (name == null && id == null) {
            return res.send(customers)
        } else {
            if (name != null || (name != null && id != null)) {
                //filter with the help of name
                let customer = await Customer.find({ name })
                if (customer.length == 0 || !customer)
                    return res.send(customers) //name not exist
                return res.send(customer)

            } else if (id != null) {
                //filter with id
                let customer = await Customer.findById(id)
                if (customer.length == 0 || !customer)
                    return res.send(customers) //id not exist
                return res.send(customer)

            }
        }
    } catch (err) { res.send(customers) } //something went wrong with name or id
})

//add customer if client have valid token 
//auth is a middelware function to verify token 
//to add new customer client should pass valid token 
route.post('/', auth, async(req, res) => {

    const { error } = customerValidate(req.body)

    if (error) return res.status(400).send(error.details[0].message)
    try {
        const customer = new Customer({
            name: req.body.name,
            addr: req.body.addr,
            phone: req.body.phone,
            age: req.body.age,
            isGold: req.body.isGold
        })
        const result = await customer.save()
        res.send(result)
    } catch (err) { res.status(404).send(err.errors) } //err.message // error validation
})


//edit customer details
route.put('/:id', async(req, res) => {
    const customerId = req.params.id;
    const isValid = mongoose.Types.ObjectId.isValid(customerId) //check validate of mongodb _id 
    if (!isValid) return res.status(404).send("invalid customerId")
    const customer = await Customer.findById(customerId) //find customer id exist in customer collection
    if (!customer) return res.status(404).send("customer id is not exist")
    const { error } = customerValidate(req.body) //client rest json check validate
    if (error) return res.status(404).send(error.details[0].message) //validate error message
        //update customer data
    customer.name = req.body.name
    customer.addr = req.body.addr
    customer.phone = req.body.phone
    customer.age = req.body.age
    customer.isGold = req.body.isGold
    try {
        const result = await customer.save()
        res.json(result)
    } catch (err) {
        res.status(404).send(err.message)

    }

})

//remove customer with id 
route.delete('/:id', async(req, res) => {
    const customerId = req.params.id;
    const isValid = mongoose.Types.ObjectId.isValid(customerId) //check validate of mongodb _id 
    if (!isValid) return res.status(404).send("invalid customerId")
    const customer = await Customer.findById(customerId) //find customer id exist in customer collection
    if (!customer) return res.status(404).send("customer id is not exist")
    try {
        const result = await Customer.findByIdAndRemove(customer._id)
        res.status(200).send(`successfully delete customer of id=${customerId}`)
    } catch (err) {
        res.status(404).send(err.message)

    }
})

//get a customer with name 
route.get('/:name', async(req, res) => {
    //check name validate 
    const customerName = req.params.name
    const nameLength = customerName.length
    if (!(customerName != "" && customerName != null && nameLength >= 5 && nameLength <= 255))
        return res.status(404).send("customer name is not vaild")

    const customer = await Customer.find({ name: customerName })
    if (customer.length == 0 || !customer) return res.status(404).send(`${customerName} is not exist`)
    res.send(customer)

})


module.exports = route