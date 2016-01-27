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
   .state('novoUsuario/:uri', {
     url: '/novo/:uri',
     parent: 'dashboard',
     templateUrl: 'routes/usuarios/client/show/usuario.html',
     titlePage: 'Cadastro de usuários',
     controller: 'UsuarioCtrl'
   });
 });


mecApp.controller('UsuarioCtrl', function($scope, $state, $http, $location, ngToast) {

    $scope.$state = $state;
    $scope.titlePage = $scope.$state.current.titlePage;
    $scope.botaoInserir = false;
    $scope.botaoAlterar = false;

    if($scope.$state.params.uri === 'novo'){
      $scope.usuario = {};
      $scope.botaoInserir = true;
    }else {
      $scope.botaoAlterar = true;
      $http.get('/api/usuarios/' + $scope.$state.params.uri)
          .success(function(data) {
              $scope.usuario = data;
          })
          .error(function(data) {
              console.log('Error: ' + data);
          });
    }

    $scope.salvar = function(usuario){
      $http.post('/api/usuarios', usuario)
          .success(function(data) {
            ngToast.create('Usuário salvo com sucesso!');
            $state.go('usuarios');
          })
          .error(function(data) {
              console.log('Error: ' + data);
          });
    };

    $scope.alterar = function(){
      $http.put('/api/usuarios/' + $scope.usuario._id, $scope.usuario)
        .success( function(response){
          ngToast.create('Usuário alterado com sucesso!');
          $state.go('usuarios');
        });
    };

  });
