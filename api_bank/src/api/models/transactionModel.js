const Sequelize = require('sequelize');
const database = require('../../database/index');
const userModel = require('./userModel');

const transaction = database.define('transactions', {
    value: {
        type: Sequelize.DECIMAL(10, 2).UNSIGNED.ZEROFILL,
        allowNull: false
    },
    payerId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: userModel,
            key: 'id',
        }
    },
    payeeId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: userModel,
            key: 'id',
        }
    }
});

module.exports = transaction;
