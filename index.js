const mongoose = require('mongoose')
const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
app.use(express.json())

const genreRoute = require('./routes/genres')
const movieRoute = require('./routes/movies')
const customerRoute = require('./routes/customers')
const rentalRoute = require('./routes/rentals')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')

app.use('/api/genres', genreRoute) //genre route
app.use('/api/movies', movieRoute) //movie Route
app.use('/api/customers', customerRoute) //movie Route
app.use('/api/rentals', rentalRoute) //rental Route
app.use('/api/users', userRoute) //user Route
app.use('/api/login', authRoute) //user Route


mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('connected with mongodb'))
    .catch(err => console.error(err))


const port = process.env.port || 3000;
server.listen(port, () => console.log(`server lisenting on port=${port }`))