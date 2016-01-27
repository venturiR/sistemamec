// Contato.js
var mongoose = require('mongoose');

// Cria um novo Schema com os campos que iremos utilizar no model Contato
var UsuarioSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String,
});

//Define o model Contato
mongoose.model('Usuario', UsuarioSchema);
