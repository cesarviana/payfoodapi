var express = require('express');
var bodyParser = require('body-parser');
var sha1 = require('sha1');
var model = require('./model');

var app = express();
app.use( bodyParser.json() );
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var sha1Senha = function( obj ){
  return sha1( obj.email + obj.password );
};

var handleErr = function( err, res, msg ){
  res.status(400).send( err + msg );
};

var hidePassword = function( usuario ) {
  usuario.password = "**";
  return usuario;
};

app.post('/usuario', function(req, res){
  var data = req.body;
  data.password = sha1Senha( data );
  console.log( data );
  var u = new model.Usuario( data );
  u.save( function(err, usuario){
    if( err ) {
      return handleErr(err, res, "ERR_SALVAR_USUARIO");
    }
    res.json( hidePassword(usuario) );
  });
});

app.post('/login', function(req, res){
  var password = sha1Senha(req.body);
  var email = req.body.email;
  model.Usuario.find({
    email : email,
    password : password
  }, function(err, usuarios){
    if(err){
      return handleErr( err, res, "ERR_LOGIN" );
    } 
    if( !usuarios )
      return handleErr( err, res, "ERR_USUARIO_NAO_ENCONTRADO" );
    res.json( hidePassword(usuarios[0]) );
  });
});

app.post('/estabelecimento', function( req, res ){
  var estabelecimento = new model.Estabelecimento( req.body );
  estabelecimento.save( function(err, estabelecimento){
    if(err) {
      return handleErr( err, res, "ERR_SALVAR_ESTABELECIMENTO");
    } else {
      res.json( estabelecimento );
    }
  });
});

app.get('/estabelecimento', function( req, res ){
  model.Estabelecimento.find( function(err, estabelecimentos ){
    if(err) {
      return handleErr( err, res, "ERR_LISTAR_ESTABELECIMENTOS");
    } else {
      res.json( estabelecimentos );
    }
  });
});


app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log("Server listening");
});
