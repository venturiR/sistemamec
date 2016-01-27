'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('mec')
  .controller('DashboardCtrl', function($scope, $state) {

    $scope.$state = $state;
    $scope.titlePage = $scope.$state.current.titlePage;
    /*
    $translate
    $scope.changeLanguage('pt');
    $scope.changeLanguage = function (key) {
      $translate.use(key);
    };*/

  });
