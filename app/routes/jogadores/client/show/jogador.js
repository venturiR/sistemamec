/*jslint node: true */
'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */

 var mecApp = angular.module('mec');

 mecApp.config(function($stateProvider) {
   $stateProvider
   .state('novoJogador/:uri', {
     url: '/novoJogador/:uri',
     parent: 'dashboard',
     templateUrl: 'routes/jogadores/client/show/jogador.html',
     titlePage: 'Cadastro de jogador',
     controller: 'JogadorCtrl'
   });
 });


mecApp.controller('JogadorCtrl', function($scope, $state, $http, $location, ngToast) {

    $scope.$state = $state;
    $scope.titlePage = $scope.$state.current.titlePage;
    $scope.botaoInserir = false;
    $scope.botaoAlterar = false;

    $scope.posicoes = [
        { id: 1, name: 'Goleiro' },
        { id: 2, name: 'Lateral-Direito' },
        { id: 3, name: 'Lateral-Esquerdo' },
        { id: 4, name: 'Volante' },
        { id: 5, name: 'Meia' },
        { id: 6, name: 'Atacante' }
    ];

    $scope.pernas = [
        { id: 1, name: 'Canhoto' },
        { id: 2, name: 'Destro' },
        { id: 2, name: 'Ambi-Destro' }
    ];

    if($scope.$state.params.uri === 'novo'){
      $scope.jogador = {};
      $scope.botaoInserir = true;
    }else {
      $scope.botaoAlterar = true;
      $http.get('/api/jogadores/' + $scope.$state.params.uri)
          .success(function(data) {
              $scope.jogador = data;
          })
          .error(function(data) {
              console.log('Error: ' + data);
          });
    }


    $scope.salvar = function(jogador){

      jogador.posicao = $scope.posicaoSelected.name;
      jogador.pernaPreferencial = $scope.pernaSelected.name;

      $http.post('/api/jogadores', jogador)
          .success(function(data) {
            ngToast.create('Jogador salvo com sucesso!');
            $state.go('jogadores');
          })
          .error(function(data) {
              console.log('Error: ' + data);
          });
    };

    $scope.alterar = function(){
      $http.put('/api/jogadores/' + $scope.jogador._id, $scope.jogador)
        .success( function(response){
          ngToast.create('Jogador alterado com sucesso!');
          $state.go('jogadores');
        });
    };


  });
