const dotenv = require('dotenv');
const path = require('path');
dotenv.config({path:path.resolve(__dirname,'.env')});

module.exports = {
    externalApiUrl:process.env.EXTERNALAPIURL,
    secret: process.env.SECRET,
    port: process.env.PORT,
    dbConfig: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql' 
    }
};