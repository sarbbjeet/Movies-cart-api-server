//check user is admin or not 
module.exports = async(req, res, next) => {
    if (!req.user.admin) return res.status(403).send("Access denied")

    next()
}