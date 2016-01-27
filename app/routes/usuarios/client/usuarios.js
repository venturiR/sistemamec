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
   .state('usuarios', {
     url: '/usuarios',
     parent: 'dashboard',
     templateUrl: 'routes/usuarios/client/usuarios.html',
     titlePage: 'Usuários',
     controller: 'UsuariosCtrl'
   });
 });


mecApp.controller('UsuariosCtrl', function($scope, $state, $http, $location, ngToast) {

    $scope.$state = $state;
    $scope.titlePage = $scope.$state.current.titlePage;

    $scope.refresh = function(){
      $http.get('/api/usuarios')
          .success(function(data) {
              $scope.contatos = data;
          })
          .error(function(data) {
          });
    };
    $scope.refresh();

    $scope.inserir = function(){
      $state.go('novoUsuario/:uri', {uri:'novo'});
    };

    $scope.selecionar = function(usuario){
      $scope.selecionado = usuario;
    };

    $scope.alterar = function(){
      if($scope.selecionado){
        $state.go('novoUsuario/:uri', {uri:$scope.selecionado._id});
      }else {
        ngToast.warning('Selecione um registro!');
      }

    };

    $scope.remover = function() {
      if($scope.selecionado){
        $http.delete('/api/usuarios/' + $scope.selecionado._id)
            .success(function(data) {
                $scope.contatos = data;
                ngToast.create('Usuário excluido com sucesso!');
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
      }else {
        ngToast.warning('Selecione um registro!');
      }
      };

  });
