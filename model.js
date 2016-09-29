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

module.exports = {
    Produto : Produto,
    Usuario : Usuario
};
