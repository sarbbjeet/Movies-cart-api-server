# Backend code for the movies app that includes node js, express, jwt, bcrypt, and other features.
Backend built with Node.js/Express and MongoDB, with pre-defined authentication, email verification, and account deletion.
# ready to use
this server is deployed on heroku https://movies-api-server11.herokuapp.com/

# Features
- Mongodb (local and cloud)
- Email Verification 
- user details and password stored into environment variables
- Password reset and delete account
- Manage user Authentication using Json Web Token
- CRUD operations for the movies api
- CRUD operations for the genres api


# access api routes
- GET /api/genres result ex: ````[{ name: "action", desc: "full of action"}, {name:"comedy", dec: "xyzz.."}]````
- POST /api/genres add genres to database ex: ````{name: "drama", desc: "drama stuff"}````
- GET/ POST /api/movies movies added to database ex: ```` {"title": "name of movie", "genreId": "genre id", "numberInStock": 12, "dailyRentalRate" : 1.2} ```` 
- PUT /api/movies/"type movie id"  update movie to database ex: ```` {"title": "name of movie", "genreId": "genre id", "numberInStock": 12, "dailyRentalRate" : 1.2} ````
- DELETE /api/movies/"movie id"   delete a movie from the database 
- POST /api/users  add a user account to login ex: ```` {name: "sarb", email: "sarb@gmail.com", password: "123dhjshk"}````
- POST /api/login  login to account ex: ````{email:"sarb@gmail.com", password: "ahdjkhkjadh"} ````   
- A jwt token will be sent in the header if the user successfully logs in.

# Set-Up
### Steps to set up development environment variables
1. install config npm i config 
2. create config folder with "default.json" and "custom-environment-variables.json" files
3. defined required enviroment variables in "default.json" and "custom-enviroment-variables files"
4. set custom environment variables on local machine server by typing ex: $ ````export variablename="variablevalue"````
5. For example if user want to set remote_db, just go to command prompt type : ````export remote_db="remote db address type here"```` 
6. set custom environment variables on remote server(heroku) by  typing ex: $ ````heroku config:set variablename="variablevalue"````
7. display saved custom variables on remote server by typing ex: $ ````heroku config````
8. display saved custom variables on local server by typing ex: $```` export````
