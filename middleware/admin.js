//check user is admin or not 
module.exports = async(req, res, next) => {
    if (!req.user.admin) return res.status(403).json({ success: false, message: "Access denied" })
    next()
}