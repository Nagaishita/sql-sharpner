const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('testDB', 'root', 'sharpner25', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
