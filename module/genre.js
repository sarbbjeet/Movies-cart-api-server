//create genre schema 

const mongoose = require('mongoose')
const Joi = require('joi') //version @13.1.0


const genreSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true }

})

const Genre = mongoose.model('Genres', genreSchema)

//validate genre rest api client side entered json data
const validateGenre = (genre) => {
    const schema = {
        name: Joi.string().required().min(3),
        desc: Joi.string().required().min(3)
    }
    return Joi.validate(genre, schema)
}

module.exports = { genreSchema, validateGenre, Genre }