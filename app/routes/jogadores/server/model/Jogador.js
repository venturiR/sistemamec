// Contato.js
var mongoose = require('mongoose');

// Cria um novo Schema com os campos que iremos utilizar no model Contato
var JogadorSchema = new mongoose.Schema({
  nome: String,
  numeroDocumento: String,
  dataNascimento: Date,
  posicao: String,
  pernaPreferencial: String,
  bairro: String,
  cidade: String,
  estado: String,
  rua: String,
  numero: String,
  telefone: String,
  celular: String,
  email: String,
});

mongoose.model('Jogador', JogadorSchema);
