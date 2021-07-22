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
const route = express.Router()

route.get('/', (req, res) => {
    res.send("hello world")
})
process.on("unhandledRejection", (ex) => {
    console.error("we got an unhandle rejection")
    winston.error(ex.message)

})
app.use('/', route)
const port = process.env.PORT || 3000;
const host = '0.0.0.0'
server.listen(port, host, () => console.log(`server lisenting on port=${port }`))