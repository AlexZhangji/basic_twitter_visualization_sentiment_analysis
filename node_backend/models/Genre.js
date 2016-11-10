var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize');

var Genre = sequelize.define('genre', {
  name: {
    field: 'genre',
    type: Sequelize.STRING
  }
}, {
  timestamps: false
});

module.exports = Genre;
