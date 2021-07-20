//
const mongoose = require('mongoose')
const { movieSchema } = require('./movie')
const Joi = require('joi')
const Joi_objectId = require('joi-objectid')(Joi)


const rentalSchema = new mongoose.Schema({
    customer: {
        id: { //reference of all properities of a customer
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customers'
        },
        name: { type: String, required: true }, //embedded document
        phone: { type: String, required: true }
    },
    movie: {
        type: movieSchema,
        required: true
    }

})


const Rental = mongoose.model('Rentals', rentalSchema)

//validate 
function rentalValidate(rental) {

    const schema = {
        customerId: Joi_objectId().required(),
        movieId: Joi_objectId().required()
    }

    return Joi.validate(rental, schema)

}

module.exports = { rentalValidate, Rental, rentalSchema }