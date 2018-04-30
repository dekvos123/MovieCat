(function(angular) {
  'use strict';
  var detail = angular.module('movieApp.controllers.detailController', ['greyu.util.HttpService']);
  detail.controller('detailController', [
    '$scope',
    '$route',
    '$routeParams',
    'HttpService',
    function($scope, $route, $routeParams, HttpService) {
      $scope.movie = {};
      $scope.images = {};
      $scope.images.large = "";
      $scope.movie.title = "";
      $scope.movie.summary = "";
      $scope.loading = true;
      var detailUrl = "http://api.douban.com/v2/movie/subject/" + $routeParams.id;
      HttpService.jsonp(detailUrl, {}, function(data) {
        $scope.movie.title = data.title;
        $scope.movie.summary = data.summary;
        $scope.images.large = data.images.large;
        $scope.loading = false;
        $scope.$apply();
      })
    }
  ]);
})(angular);
