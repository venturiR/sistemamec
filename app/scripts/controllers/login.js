'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('mec')
  .controller('LoginCtrl', function($scope, $location) {

    $scope.submit = function() {
      $location.path('/dashboard');
      return false;
    };

  });
