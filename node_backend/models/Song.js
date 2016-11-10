var Sequelize = require('sequelize');
var sequelize = require('./../config/sequelize');

var Song = sequelize.define('song', {
  title: {
    type: Sequelize.STRING
  },
  artist: {
    field: 'artist_id',
    type: Sequelize.INTEGER
  },
  genre: {
    field: 'genre_id',
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.DECIMAL
  },
  playCount: {
    type: Sequelize.INTEGER,
    field: 'play_count'
  },
  createdBy: {
    type: Sequelize.STRING,
    field: 'created_by'
  }
}, {
  timestamps: false
});

module.exports = Song;
