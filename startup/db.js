const mongoose = require('mongoose')
const winston = require('winston')
const config = require('config')
module.exports = () => {
    mongoose.connect(config.get('db'))
        .then(() => winston.info('connected with mongodb'))
        //.catch(err => console.error(err))

}