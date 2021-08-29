const config = require('config') //environment variables
const jwt = require('jsonwebtoken')

module.exports = async(req, res, next) => {

    const token = req.header('x-auth-token')
        //access token from header
    if (token == "null" || token == undefined) {
        return res.status(401).json({
            success: false,
            message: "Access denied: token is required"
        })
    }
    try {
        const payload = await jwt.verify(token, config.get('jwtPrivateKey'))
        req.user = payload //pass payload to user object key
        next() //pass pipeline  
    } catch (ex) {
        res.status(400).json({ success: false, message: ex.message })

    }
}