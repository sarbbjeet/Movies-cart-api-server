const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')
const { rentalSchema, rentalValidate, Rental } = require('../module/rental')
const { Genre } = require('../module/genre')
const { Movie } = require('../module/movie')
const { Customer } = require('../module/customer')

route.get('/', async(req, res) => {
    const rentals = await Rental.find()
        // const filterMovies = movies.find(m => m.numberInStock == 10)
        // console.log(filterMovies)
        //console.log(rentals)
    res.send(rentals)
})


route.post('/', async(req, res) => {
    const { error } = rentalValidate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const customer = await Customer.findById(req.body.customerId)
    const movie = await Movie.findById(req.body.movieId)
    if (!movie || !customer)
        return res.status(400).send("customer id or movie id is not exist")
    try {
        //here i want to subtract 1 from numberofStock and save movie collection
        //movie.save and rental.save both methods should perform successfully so we need
        // to use "Transaction" group of operations 

        const rental = new Rental({
            customer: {
                id: req.body.customerId,
                name: customer.name,
                phone: customer.phone
            },
            movie
            // title: movie.title,
            // genre: movie.genre,
            // numberInStock: movie.numberInStock,
            //dailyRentalRate: movie.dailyRentalRate

            // }
        })

        //  const k= await rental.save()
        res.send(await rental.save())
    } catch (err) { return res.status(400).send(err.message) }
})

module.exports = route