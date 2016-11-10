var express = require('express');
var Sequelize = require('sequelize');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

var DB_NAME = 'ji';
var DB_USER = 'ji';
var DB_PASSWORD = 'node ember 2016';
var sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    dialect: 'mysql',
    host: 'itp460.usc.edu'
});



var Song = sequelize.define('song', {
    title: {
        type: Sequelize.STRING
    },
    playCount: {
        type: Sequelize.INTEGER,
        field: 'play_count'
    },

    price:{
      type: Sequelize.DECIMAL,
      field: 'price'
    }

}, {
    timestamps: false
});

app.use(cors());
app.use(bodyParser());
// app.use(function(request, response, next){
//
// });

app.get('/api/songs', function(request, respond) {
    var promise = Song.findAll();
    promise.then(function(songs) {
        respond.json({
            data: songs
        });
    });

})

app.post('/api/songs', function(request, response) {
    // response.json(request.body);

    var song = Song.build({
        title: request.body.title
    });

    song.save().then(function(song) {
        response.json(song);
    });
});

app.delete('/api/songs/:id', function(request, response) {
    Song.findById(request.params.id).then(function(song) {
        if (song) {
            song.destroy().then(function(song) {
                response.json(song);
            });
        } else {
            response.status(404).json('song not found');
        }
    });

});

app.put('/api/songs/:id', function(request, response) {
    Song.findById(request.params.id).then(function(song) {
        if (song) {
            song.update({
                title: request.body.title,
                price: request.body.price,
            }).then(function(song) {
                response.json(song);
            });
        } else {
            response.status(404).json('song not found');
        }

    });
});

app.listen(3000)
