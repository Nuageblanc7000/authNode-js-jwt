#!/bin/usr/bash

npm init -y >> debug.log
npm i express dotenv sequelize mysql2 jsonwebtoken argon2 yup express-async-errors >> debug.log
npm i --save-dev nodemon >> debug.log

mkdir controllers routes DTO models models middlewares utils services validators responses
echo >> "./models/index.js"
echo >> "./routes/index.js"
echo >> app.js
echo "PORT=8080"  >> .env
echo >> .env.example


 
ECHO module.exports = router; >> "./routes/index.js"




wait code .
