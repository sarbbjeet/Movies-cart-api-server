//middleware to display error from central point 

module.exports = async(err, req, res, next) => {

    res.status(500).send("something failed") //
}