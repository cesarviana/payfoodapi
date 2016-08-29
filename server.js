'use strict'
var express = require('express');
var bodyParser = require("body-parser");
var sha1 = require("sha1");
var model = require("./model.js");
var app = express();

var sha1Senha = function( obj ){
  return sha1( obj.email + obj.password );
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.get('/', function(req, res){
  res.send('payfoodapi :)');
});

app.post('/login', function( req, res ){
  var email = req.body.email;
  var password = req.body.password;
  model.Usuario.find({
    email : email,
    password : sha1Senha({ email:email, password: password })
  }, function( err, usuarios ){
    if( usuarios.length == 0 || err ){
      console.error(err); 
      res.sendStatus( 404 );
    } else {
      var usuario = usuarios[0];
      usuario.password = '*';
      res.json( usuario );
    }
  });
});

app.post('/usuario', function( req, res ){
  var usuario = new model.Usuario( req.body );
  usuario.password = sha1Senha( req.body );
  usuario.save( function(err, usuario){
    if(err) {
      res.status(400);
      res.json( err.code );
    } else {
      usuario.password = '*';
      res.json( usuario );
    }
  });
});

app.post('/estabelecimento', function( req, res ){
  var estabelecimento = new model.Estabelecimento( req.body );
  estabelecimento.save( function(err, estabelecimento){
    if(err) {
      res.status(400);
      res.json( err.code );
    } else {
      res.json( estabelecimento );
    }
  });
});

app.get('/estabelecimento', function( req, res ){
  model.Estabelecimento.find( function(err, estabelecimentos ){
    if(err) {
      res.status(400);
      res.json( err.code );
    } else {
      res.json( estabelecimentos );
    }
  });
});

app.listen(process.env.PORT, function(){
  console.log( "ESCUTANDO A PORTA: " + process.env.PORT );
});

