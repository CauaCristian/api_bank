const config = require('../config/index');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.dbConfig.database,config.dbConfig.username,config.dbConfig.password,{
    host:config.dbConfig.host,
    port:config.dbConfig.port,
    dialect:config.dbConfig.dialect
});
module.exports = sequelize;