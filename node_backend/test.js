var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var app = express();

var connection = mysql.createConnection({
    host: '45.55.213.242',
    port: '80',
    user: 'root',
    password: 'admin',
    // dstport: 3306,
    database: 'itp_web'
});


connection.connect();

app.get('/', function(req, resp){
  connection.query('SELECT * form test',function(err, rows, fields){
    if(!!error){
      console.log('error in query');
    }else{
      console.log(rows);
    }
  });
});



app.listen(3001);
