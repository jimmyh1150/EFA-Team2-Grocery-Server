const {DataTypes} = require('sequelize');
const db = require('../db');

const Grocerylist = db.define('grocerylist', {
    item: {
        type: DataTypes.JSON,
        allowNull: false
    },
    owner_id: {
        type: DataTypes.INTEGER
    }
})


module.exports = Grocerylist;