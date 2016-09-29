const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/payfood');
const db = mongoose.connection;
db.on('open', function(){
    console.log("Abriu conexão");
});

const usuarioSchema = mongoose.Schema({
    name : { type: String, required: true },
    email : { type: String, required: true, unique: true },
    password : { type: String, required: true }
});

const Usuario = mongoose.model('usuarios', usuarioSchema);

const produtoSchema = mongoose.Schema({
    name : { type: String, required: true },
    estabelecimento_id : { type: mongoose.Schema.Types.ObjectId, required: true },
    preco : { type: Number, required: true },
    description : { type: String, required: false },
    imgUrl : { type: String, required: false, unique: true }
});
const Produto= mongoose.model('produtos', produtoSchema);

const estabelecimentoSchema = mongoose.Schema({
  name: { type:String, required: true },
  address: { type: String, unique:true, required: true },
  location : {
    x : Number,
    y : Number
  },
  imgUrl : String,
  descricao : String,
  stars : { type:Number, min: 0, max: 5 },
  usuario_id : { type: mongoose.Schema.Types.ObjectId, required: true }
});

const Estabelecimento = mongoose.model('estabelecimentos', estabelecimentoSchema);

const pedidoSchema = mongoose.Schema({
    cliente : { 
        id   : mongoose.Schema.Types.ObjectId,
        name : String
    },
    produto : {
        id : mongoose.Schema.Types.ObjectId,
        name : String,
        preco : Number
    },
    data : { type: Date, default: Date.now },
    status : Number,
    estabelecimento_id : { type : mongoose.Schema.Types.ObjectId, required: true, refs: 'Estabelecimento' }
});

const Pedido = mongoose.model('pedidos', pedidoSchema);

module.exports = {
    Estabelecimento : Estabelecimento,
    Produto : Produto,
    Usuario : Usuario,
    Pedido  : Pedido
};
