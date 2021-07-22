require('express-async-errors') //no need to write try/catch to handle error 
const error = require('../middleware/error') //error handler middleware function
    //winston library used to error handling 
const winston = require('winston')
module.exports = (app) => {

    //require('winston-mongodb') //logging error using winston

    //winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/vidly' })
    app.use(error)
}