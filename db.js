const path = require('path');
const { Sequelize, Model, DataTypes } = require('sequelize');

// TODO - create the new sequelize connection
const db = new Sequelize({
    dialect: "sqlite",
    storage: "db.sqlite",
});

module.exports = {
    db,
    Model,
    DataTypes,
};
