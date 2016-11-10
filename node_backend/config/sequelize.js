require('dotenv').config();
var Sequelize = require('sequelize');

var { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD } = process.env;

module.exports = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: 'mysql',
  host: DB_HOST
});
