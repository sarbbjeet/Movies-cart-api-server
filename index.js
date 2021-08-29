const express = require('express')
const winston = require('winston')
const http = require('http')
const cors = require('cors')
const app = express()
    //cors 
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors())
    // app.use((req, res, next) => {
    //         res.header('Access-Control-Allow-Origin', '*')
    //         res.header('Access-Control-Allow-Headers', '*')
    //         if (req.method === 'OPTIONS')
    //             res.header('Access-Control-Allow-Origin', '*')
    //         res.header('Access-Control-Allow-Headers', '*')
    //         if (req.method === 'OPTIONS') {
    //             res.header('Access-Control-Allow-Methods', 'PUT POST GET DELETE')
    //             return res.status(200).json({})
    //         }

//         next()
//     })
//app.use(cors()) // Use this after the variable declaration

const server = http.createServer(app)

app.use(express.json())
require('./startup/db')() //mongodb function call    
require('./startup/routes')(app) //all route defined inside routes module
require('./startup/logging')(app)
require('./startup/prod')(app) //production environment 
const mailSender = require('./startup/mailSender')
const route = express.Router()

route.get('/', async(req, res) => {
    try {
        const subject = "test mail"
        const body = `${req.protocol}://${req.get('host')}`
        const reciever = "sarbjeets18@gmail.com" //receiver email address
        await mailSender(subject, body, reciever)

    } catch (ex) { return res.status(500).send(ex.message) }

    return res.json({ success: true })
        //res.send("hello world")


})
process.on("unhandledRejection", (ex) => {
    console.error("we got an unhandle rejection")
    winston.error(ex.message)

})
app.use('/', route)
const port = process.env.PORT || 3001;
const host = '0.0.0.0'
server.listen(port, host, () => console.log(`server lisenting on port=${port }`))