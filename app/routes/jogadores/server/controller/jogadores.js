// INICIANDO ==============================================
// Define as bibliotecas que iremos utilizar
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Jogador = mongoose.model('Jogador');

// ROTA BUSCAR ============================================
router.get('/api/jogadores', function(req, res) {
    // utilizaremos o mongoose para buscar todos os contatos no BD
    Jogador.find(function(err, jogadores) {
        // Em caso de erros, envia o erro na resposta
        if (err)
            res.send(err);
        // Retorna todos os contatos encontrados no BD
        res.json(jogadores);
    });
});

// ROTA CRIAR =============================================
router.post('/api/jogadores', function(req, res) {
    // Cria um contato, as informações são enviadas por uma requisição AJAX pelo Angular
    Jogador.create({
        nome : req.body.nome,
        numeroDocumento: req.body.numeroDocumento,
        dataNascimento: req.body.dataNascimento,
        posicao: req.body.posicao,
        pernaPreferencial: req.body.pernaPreferencial,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        estado: req.body.estado,
        rua: req.body.rua,
        numero: req.body.numero,
        telefone: req.body.telefone,
        celular: req.body.celular,
        email: req.body.email,
        done : false
    }, function(err, jogador) {
        if (err)
            res.send(err);
        // Busca novamente todos os contatos após termos inserido um novo registro
        Jogador.find(function(err, jogadores) {
            if (err)
                res.send(err);
            res.json(jogadores);
        });
    });

});


// ROTA DELETAR ============================================
router.delete('/api/jogadores/:jogador_id', function(req, res) {
    // Remove o contato no Model pelo parâmetro _id
    Jogador.remove({
        _id : req.params.jogador_id
    }, function(err, jogador) {
        if (err)
            res.send(err);
        // Busca novamente todos os contatos após termos removido o registro
        Jogador.find(function(err, jogadores) {
            if (err)
                res.send(err);
            res.json(jogadores);
        });
    });
});

// ROTA EDITAR =============================================
router.get('/api/jogadores/:jogador_id', function(req, res) {
    // Busca o contato no Model pelo parâmetro id
    Jogador.findOne({
        _id : req.params.jogador_id
    }, function(err, jogador) {
        if (err)
            res.send(err);
        res.json(jogador);
    });
});

// ROTA ATUALIZAR ==========================================
router.put('/api/jogadores/:jogador_id', function(req, res) {
    // Busca o contato no Model pelo parâmetro id
    var jogadorData = req.body;
    var id = req.params.jogador_id;
    Jogador.update(
        {_id: id },
        jogadorData,
        { upsert: true},
        function(err, jogador) {
            if (err) res.send(err);
            res.json(jogador);
    });

});

module.exports = router;
