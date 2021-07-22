const mongoose = require('mongoose')
const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
app.use(express.json())

require('express-async-errors') //no need to write try/catch to handle error 

const genreRoute = require('./routes/genres')
const movieRoute = require('./routes/movies')
const customerRoute = require('./routes/customers')
const rentalRoute = require('./routes/rentals')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')

const error = require('./middleware/error') //error handler middleware function

app.use('/api/genres', genreRoute) //genre route
app.use('/api/movies', movieRoute) //movie Route
app.use('/api/customers', customerRoute) //movie Route
app.use('/api/rentals', rentalRoute) //rental Route
app.use('/api/users', userRoute) //user Route
app.use('/api/login', authRoute) //user Route

app.use(error) //error middleware attach with app

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('connected with mongodb'))
    .catch(err => console.error(err))


const port = process.env.port || 3000;
server.listen(port, () => console.log(`server lisenting on port=${port }`))