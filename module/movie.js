const Joi = require('joi')
const mongoose = require('mongoose')
const { genreSchema } = require('./genre')
const Joi_ObjectId = require('joi-objectid')(Joi) // validate mongodb unique key  
    //"mongoose.Types.ObjectId.isValid"  //check monogodb _id validation  


//movie schema 
const movieSchema = new mongoose.Schema({

    title: { type: String, required: true, minlength: 5, maxlength: 255 },
    // genre: {  //Embedded document schema
    //     type: genreSchema,
    //     required: true
    // },

    // genre: {    //reference based relational database schema
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Genres'
    // },
    genre: { //hybrid based relational database 
        _id: { //reference(normalization)
            type: mongoose.Schema.Types.ObjectId,
            ref: 'genres',
            required: true
        },
        name: { //embedded relational(denormalation)
            type: String,
            required: true
        }
    },
    numberInStock: { type: Number, required: true, min: 0, max: 255 },
    dailyRentalRate: { type: Number, required: true, min: 0, max: 255 }
})

//create collection "Movies"
const Movie = mongoose.model('movies', movieSchema)

//joi validation check client side entered data
// function validateMovie(movie) {
//     const schema = {
//         title: Joi.string().required().min(5).max(255),
//         genreId: Joi.string().required(),
//         numberInStock: Joi.number().min(0).max(255).required(),
//         dailyRentalRate: Joi.number().min(0).max(255).required()
//     }

//     return Joi.validate(movie, schema)
// }
//"mongoose.Types.ObjectId.isValid"  //check monogodb _id validation  
//modified validate function to validate unique mongodb _id 
function validateMovie(movie) {
    const schema = {
        title: Joi.string().required().min(5).max(255),
        genreId: Joi_ObjectId().required(), // unique _id validate 
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required()
    }

    return Joi.validate(movie, schema)
}

module.exports = { validateMovie, movieSchema, Movie }