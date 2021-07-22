const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
app.use(express.json())
require('./startup/db')() //mongodb function call    
require('./startup/routes')(app) //all route defined inside routes module
require('./startup/logging')(app)
const port = process.env.port || 3000;
server.listen(port, () => console.log(`server lisenting on port=${port }`))