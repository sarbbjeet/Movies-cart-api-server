const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')
const { genreSchema, validateGenre, Genre } = require('../module/genre')

// const Genre = mongoose.model('Genre', genreSchema)


route.get('/', async(req, res, next) => {
    // try {  //if we are usign "express-async-errors" library then no need to use try/catch block
    const genre = await Genre.find()
    console.lg(genre)
    res.send(genre)
        // } catch (ex) { next(ex) }
})

route.post('/', async(req, res) => {

    const { error } = validateGenre(req.body)

    if (error) return res.status(400).send(error.details[0].message)
    const genre = new Genre({
        name: req.body.name,
        desc: req.body.desc
    })
    try {
        const result = await genre.save()
        res.send(result)
    } catch (err) { res.status(404).send(err.errors) } //err.message // error validation
})

module.exports = route