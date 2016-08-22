'use strict'
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var app = express();

// ++++++++++++++++++++++++++++++ Banco de dados ++++++++++++++++++++++++++++++
mongoose.connect('mongodb://localhost/payfood');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.info("Abriu conexão");
});

var usuarioSchema = mongoose.Schema({
  name : String,
  email : String,
  passowrd : String
});

var Usuario = mongoose.model('usuarios', usuarioSchema);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.get('/', function(req, res){
  res.send('usuario/ (POST, GET, PUT)');
});

app.post('/login', function( req, res ){
  Usuario.find({
    email : req.body.email
  }, function( err, usuarios ){
    if( usuarios.length == 0 || err ){
      console.error(err); 
      res.sendStatus( 404 );
    } else {
      res.json( usuarios ); 
    }
  });
});

app.post('/usuario', function( req, res ){
  var valida = function( u ){
    var erro;
    if( !u.name || !u.email || !u.password ) {
      throw 'Faltam propriedades';
    } else {
      Usuario.count({email:u.email}, function(err, nUsuarios){
        if(err || nUsuarios > 0){
          throw 'Já existe usuário com e-mail ' + u.email;
        }
      });
    }
  };
  try {
    valida( req.body );
    var usuario = new Usuario( req.body );
    usuario.save(function( err, usuario ){
      if( err ) res.sendStatus( 500 );
      res.json( usuario );
    }); 
  } catch ( e ) {
    res.sendStatus( 409 );
  }
});

app.listen(process.env.PORT, function(){
  console.log( "ESCUTANDO A PORTA: " + process.env.PORT );
});

