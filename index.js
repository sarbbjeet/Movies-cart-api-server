const express = require('express')
const winston = require('winston')
const http = require('http')
const app = express()
const server = http.createServer(app)
app.use(express.json())
require('./startup/db')() //mongodb function call    
require('./startup/routes')(app) //all route defined inside routes module
require('./startup/logging')(app)
require('./startup/prod')(app) //production environment 

process.on("unhandledRejection", (ex) => {
    console.error("we got an unhandle rejection")
    winston.error(ex.message)

})
const port = process.env.port || 3000;
server.listen(port, () => console.log(`server lisenting on port=${port }`))