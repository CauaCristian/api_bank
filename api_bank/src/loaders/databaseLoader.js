const database = require('../database/index');
const {userModel,transactionModel} = [require('../api/models/userModel'),require('../api/models/transactionModel')];
exports.init = async()=>{
    await database.sync().then(() => {
        console.log("Database connected and synchronized");
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
    });
};