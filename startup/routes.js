const genreRoute = require("../routes/genres");
const movieRoute = require("../routes/movies");
const customerRoute = require("../routes/customers");
const rentalRoute = require("../routes/rentals");
const userRoute = require("../routes/users");
const authRoute = require("../routes/auth");
const forgottenPassword = require("../routes/forgottenPassword");
module.exports = (app) => {
    app.use("/api/genres", genreRoute); //genre route
    app.use("/api/movies", movieRoute); //movie Route
    app.use("/api/customers", customerRoute); //movie Route
    app.use("/api/rentals", rentalRoute); //rental Route
    app.use("/api/users", userRoute); //user Route
    app.use("/api/login", authRoute); //user Route
    app.use("/api/forgotten-password", forgottenPassword); //foget password?
};