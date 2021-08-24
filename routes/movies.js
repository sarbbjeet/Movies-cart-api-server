const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')
const { movieSchema, validateMovie, Movie } = require('../module/movie')
const { Genre } = require('../module/genre')

route.get('/', async(req, res) => {
    const movies = await Movie.find()
        .populate('genre._id')

    // const filterMovies = movies.find(m => m.numberInStock == 10)
    // console.log(filterMovies)
    console.log(movies)
    res.send(movies)
})

route.put('/:id', async(req, res) => {
    const { error } = validateMovie(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const genre = await Genre.findById(req.body.genreId)
    if (!genre) return res.status(404).send("invalid genre...")
    let movie = await Movie.findById(req.params.id)
    if (!movie) return res.status(404).send("invalid movie id...")
    movie.title = req.body.title;
    movie.genre = { //hybrid relational database 
        _id: req.body.genreId, //reference
        name: genre.name //embedded 
    }
    movie.numberInStock = req.body.numberInStock
    movie.dailyRentalRate = req.body.dailyRentalRate
    try {
        const result = await movie.save()
        res.send(result)
    } catch (err) { res.status(404).json({ success: false, message: err.message }) } //err.message // error validation
})


route.post('/', async(req, res) => {
    const { error } = validateMovie(req.body)
    if (error) return res.status(400).json({ success: false, message: error.details[0].message })
        //try {
    const genre = await Genre.findById(req.body.genreId)
    if (!genre) return res.status(404).json({ success: false, message: "invalid genre..." })
    const movie = new Movie({
        title: req.body.title,
        genre: { //hybrid relational database 
            _id: req.body.genreId, //reference
            name: genre.name //embedded 
        },
        //genre,    //this code used in embedded document relational database
        //genre: genre._id  // this code is use in reference based relational database
        // genre: {    //embedded relational database 
        //     _id: genre._id,
        //     name: genre.name,
        //     desc: genre.desc
        // },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })
    try {
        const result = await movie.save()
        res.send(result)
    } catch (err) { res.status(404).json({ success: false, message: err.message }) } //err.message // error validation
})

route.delete('/:id', async(req, res) => {
    let movie = await Movie.findById(req.params.id)
    if (!movie) return res.status(404).json({ success: false, message: 'invaild movie id' })
    return res.json(await Movie.findByIdAndRemove(movie._id)) || ({ success: true, message: `successfully delete ${movie.title}` })
})


module.exports = route