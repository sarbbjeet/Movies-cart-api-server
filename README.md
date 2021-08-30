# Backend code for the movies app that includes node js, express, jwt, bcrypt, and other features.
Backend built with Node.js/Express and MongoDB, with pre-defined authentication, email verification, and account deletion.
# ready to use

# Features
- Mongodb (local and cloud)
- Email Verification 
- user details and password stored into environment variables
- Password reset and delete account
- Manage user Authentication using Json Web Token
- CRUD operations for the movies api
- CRUD operations for the genres api



# Set-Up
### Steps to set up development environment variables
1. install config npm i config 
2. create config folder with "default.json" and "custom-environment-variables.json" files
3. defined required enviroment variables in "default.json" and "custom-enviroment-variables files"
4. set custom environment variables on local machine server by typing ex: $ export variablename="variablevalue"
5. set custom environment variables on remote server(heroku) by  typing ex: $ heroku config:set variablename="variablevalue"
6. display saved custom variables on remote server by typing ex: $ heroku config
7. display saved custom variables on local server by typing ex: $ export
