'use strict'
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var sha1 = require("sha1");
var app = express();

var sha1Senha = function( obj ){
  return sha1( obj.email + obj.password );
}

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
  password : String
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
  var email = req.body.email;
  var password = req.body.password;
  Usuario.find({
    email : email,
    password : sha1Senha({ email:email, password: password })
  }, function( err, usuarios ){
    if( usuarios.length == 0 || err ){
      console.error(err); 
      res.sendStatus( 404 );
    } else {
      var usuario = usuarios[0];
      delete usuario.password;
      res.json({
        name : usuario.name,
        id : usuario._id
      }); 
    }
  });
});

app.post('/usuario', function( req, res ){
  
  var params = req.body;
  
  Usuario.count({ email:params.email }, 
    
    function(err, nUsuarios){
      if(err || nUsuarios > 0){
        res.sendStatus( 409 ); // Jà existe email cadastrado
      } else if( !params.name || !params.email || !params.password ) {
        res.sendStatus( 400 ); // Faltam propriedades
      } else {
        params.password = sha1Senha( params );
        var usuario = new Usuario( params );
        usuario.save(function( err, usuario ){
          if( err ) res.sendStatus( 500 ); // Falha ao salvar
          res.json( usuario );
        });
      };
    }
  
  );
  
});

app.listen(process.env.PORT, function(){
  console.log( "ESCUTANDO A PORTA: " + process.env.PORT );
});

