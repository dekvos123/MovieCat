/**
 * @Author   greyu
 * @describe [main js file]
 * @DateTime 2017-02-26
 * @param    {[type]}   angular [description]
 * @return   {[type]}           [description]
 */
(function(angular) {
  'use strict';
  var movieApp = angular.module('movieApp', [
    'ngRoute',
    'movieApp.controllers.mainController',
    'movieApp.controllers.detailController',
    'movieApp.directive.activeFocus'
  ]);
  movieApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/in_theaters/1'
      });
  }]);

  // movieApp.controller("navController", [
  //   '$scope',
  //   '$location',
  //   function($scope, $location) {
  //     $scope.$location = $location;
  //     $scope.category = "";
  //     $scope.$watch('$location.path()', function(now) {
  //       if (now.startsWith('/in_theaters')) {
  //         $scope.category = "in_theaters";
  //       } else if (now.startsWith("/coming_soon")) {
  //         $scope.category = "coming_soon";
  //       } else if (now.startsWith("/top250")) {
  //         $scope.category = "top250";
  //       }
  //       console.log($scope.category);
  //     })
  //   }
  // ]);
})(angular);
