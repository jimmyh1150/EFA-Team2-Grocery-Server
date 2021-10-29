const {DataTypes} = require('sequelize');
const db = require('../db');

const Grocerylist = db.define('grocerylist', {
    nameOfIngredient: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    measure: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
})


module.exports = Grocerylist;