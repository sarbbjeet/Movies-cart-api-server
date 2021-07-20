//
const mongoose = require('mongoose')
const { movieSchema } = require('./movie')
const Joi = require('joi')
const Joi_objectId = require('joi-objectid')(Joi)


const rentalSchema = new mongoose.Schema({
    customer: {

        // id: { //reference of all properities of a customer
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Customers'
        // },
        // name: { type: String, required: true }, //embedded document
        // phone: { type: String, required: true }
        type: mongoose.Schema({
            name: { type: String, required: true }, //embedded document
            phone: { type: String, required: true }
        })
    },
    movie: {
        type: new mongoose.Schema({
            title: { type: String, required: true },
            dailyRentalRate: { type: Number, required: true, min: 0, max: 255 },
            genre: { //hybrid based relational database 
                _id: { //reference(normalization)
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'genres',
                    required: true
                }
            }
        })

    }

})


const Rental = mongoose.model('rentals', rentalSchema)

//validate 
function rentalValidate(rental) {

    const schema = {
        customerId: Joi_objectId().required(),
        movieId: Joi_objectId().required()
    }

    return Joi.validate(rental, schema)

}

module.exports = { rentalValidate, Rental, rentalSchema }