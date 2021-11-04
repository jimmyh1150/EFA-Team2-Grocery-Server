const { DataTypes } = require('sequelize');
const db = require('../db');

const myList = db.define('mylist', {
    recipeName: {
        type: DataTypes.JSON,
        allowNull: false
    },
    owner_id: {
        type: DataTypes.INTEGER
    }
    
});

module.exports = myList;