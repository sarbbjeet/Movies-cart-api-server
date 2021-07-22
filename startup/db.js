const mongoose = require('mongoose')
const winston = require('winston')
module.exports = () => {
    mongoose.connect('mongodb://localhost/vidly')
        .then(() => winston.info('connected with mongodb'))
        //.catch(err => console.error(err))

}