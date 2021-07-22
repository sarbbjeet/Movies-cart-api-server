const config = require('config') //environment variables
const jwt = require('jsonwebtoken')

module.exports = async(req, res, next) => {

        const token = req.header('x-auth-token') //access token from header
        if (!token) return res.status(401).send("Access denied: token is required")
        try {
            const payload = await jwt.verify(token, config.get('jwtPrivateKey'))
            req.user = payload //pass payload to user object key
            next() //pass pipeline  
        } catch (ex) { res.status(400).send(ex.message) }

    }
    //module.exports = auth