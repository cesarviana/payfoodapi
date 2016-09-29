var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/payfood');
var db = mongoose.connection;
db.on('open', function(){
    console.log("Abriu conexão");
});

var usuarioSchema = mongoose.Schema({
    name : { type: String, required: true },
    email : { type: String, required: true, unique: true },
    password : { type: String, required: true }
});

var Usuario = mongoose.model('usuarios', usuarioSchema);


var produtoSchema = mongoose.Schema({
    name : { type: String, required: true },
    estabelecimento_Id : { type: String, required: true,unique: true },
    preco : { type: Number, required: true },
    description : { type: String, required: false },
    imgUrl : { type: String, required: false }
});
var Produto= mongoose.model('produtos', produtoSchema);

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
    Produto : Produto,
    Usuario : Usuario
};
