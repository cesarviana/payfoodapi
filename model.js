var mongoose = require('mongoose');
// ++++++++++++++++++++++++++++++ Banco de dados ++++++++++++++++++++++++++++++
mongoose.connect('mongodb://localhost/payfood');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.info("Abriu conexão");
});

var usuarioSchema = mongoose.Schema({
  name : { type: String, required: true },
  email : { type: String, unique: true, required: true },
  password : { type: String, required: true }
});

var Usuario = mongoose.model('usuarios', usuarioSchema);

var estabelecimentoSchema = mongoose.Schema({
  name: { type:String, required: true },
  address: { type: String, unique:true, required: true },
  location : {
    x : Number,
    y : Number
  },
  imgUrl : String,
  descricao : String,
  stars : { type:Number, min: 0, max: 5 }
});

var Estabelecimento = mongoose.model('estabelecimentos', estabelecimentoSchema);

module.exports = {
  Estabelecimento : Estabelecimento,
  Usuario : Usuario
};