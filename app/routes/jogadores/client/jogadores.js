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
   .state('jogadores', {
     url: '/jogadores',
     parent: 'dashboard',
     templateUrl: 'routes/jogadores/client/jogadores.html',
     titlePage: 'Jogadores',
     controller: 'JogadoresCtrl'
   });
 });


mecApp.controller('JogadoresCtrl', function($scope, $state, $http, $location, ngToast) {

    $scope.$state = $state;
    $scope.titlePage = $scope.$state.current.titlePage;

    $scope.refresh = function(){
      $http.get('/api/jogadores')
          .success(function(data) {
            $scope.jogadores = data;
            for (var i = 0; i < $scope.jogadores.length; i++) {
              $scope.jogadores[i].idade = new Date().getFullYear() - $scope.jogadores[i].dataNascimento.substring(0,4);
              //$scope.jogadores[i].idade = new Date().getFullYear();
            }
          })
          .error(function(data) {
          });
    };
    $scope.refresh();

    $scope.selecionar = function(jogador){
      $scope.selecionado = jogador;
    };

    $scope.inserir = function(){
      $state.go('novoJogador/:uri', {uri:'novo'});
    };

    $scope.alterar = function(){
      if($scope.selecionado){
        $state.go('novoJogador/:uri', {uri:$scope.selecionado._id});
      }else {
        ngToast.warning('Selecione um registro!');
      }
    };

    $scope.remover = function() {
      if($scope.selecionado){
        $http.delete('/api/jogadores/' + $scope.selecionado._id)
            .success(function(data) {
                $scope.jogadores = data;
                ngToast.create('Jogador excluido com sucesso!');
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }else {
          ngToast.warning('Selecione um registro!');
        }
      };


  });
