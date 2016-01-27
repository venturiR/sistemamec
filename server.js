// app.js

// INICIANDO ==========================================
var express  = require('express');
// cria nossa aplicação Express
var app      = express();
// mongoose for mongodb
var mongoose = require('mongoose');
// solicitações para log no console (express4)
var logger = require('morgan');
// puxar informações por POST HTML (express4)
var bodyParser = require('body-parser');
// simular DELETE e PUT (express4)
var methodOverride = require('method-override');

var lessMiddleware = require('less-middleware');

// MONGODB ============================================
// conectando ao mongodb no localhost, criando o banco de dados contato
mongoose.connect('mongodb://sistemamec:sistemamec@ds051645.mongolab.com:51645/sistemamec');
// Requisição ao arquivo que cria nosso model Contato
require('./app/routes/usuarios/server/model/Usuario');
require('./app/routes/jogadores/server/model/Jogador');


// DEFININDO A APLICAÇÃO ==============================
// definindo local de arquivos públicos
app.use(express.static(__dirname + '/app/'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(lessMiddleware(__dirname + '/app'));
// logando todas as requisições no console
app.use(logger('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended':'true'}));
// parse application/json
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

// ROTAS ===============================================
// Incluindo nossas rotas definidas no arquivo routes/index.js
// definindo nossas rotas na aplicação
var usuarios = require('./app/routes/usuarios/server/controller/usuarios');
app.use('/', usuarios);

var jogadores = require('./app/routes/jogadores/server/controller/jogadores');
app.use('/', jogadores);


// LISTEN (iniciando nossa aplicação em node) ==========
// Define a porta 8080 onde será executada nossa aplicação
app.listen(8080);
// Imprime uma mensagem no console
console.log('Aplicação executada na porta 8080');
