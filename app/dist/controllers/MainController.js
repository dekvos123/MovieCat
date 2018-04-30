(function(angular) {
  'user strict';
  var controllers = angular.module('movieApp.controllers.mainController', [
    'greyu.util.HttpService',
    'movieApp.services.moviceService'
  ]);
  controllers.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/detail/:id', {
        templateUrl: 'templates/detail.html',
        controller: 'detailController'
      })
      .when('/top250/:page?', {
        templateUrl: 'templates/view.html',
        controller: 'mainController'
      })
      .when('/in_theaters/:page?', {
        templateUrl: 'templates/view.html',
        controller: 'mainController'
      })
      .when('/coming_soon/:page?', {
        templateUrl: 'templates/view.html',
        controller: 'mainController'
      });
  }]);
  controllers.controller('mainController', [
    '$scope',
    '$route',
    '$routeParams',
    '$location',
    'HttpService',
    'movieService',
    function($scope, $route, $routeParams, $location, HttpService, movieService) {
      $scope.loading = true;
      var path = $location.path();
      var position = "";
      if (path.startsWith('/in_theaters')) {
        position = "in_theaters";
      } else if (path.startsWith("/coming_soon")) {
        position = "coming_soon";
      } else if (path.startsWith("/top250")) {
        position = "top250";
      }
      var currentPage = $routeParams.page ? parseInt($routeParams.page) : 1;
      var url = "http://api.douban.com/v2/movie/" + position;
      // 规定每页显示条数
      var count = 10;
      //接收params的页码
      // 计算起始位置
      var start = (currentPage - 1) * count;
      $scope.totalPage = "";
      $scope.pageNav = [];
      $scope.title = "";
      $scope.currentPageNum = currentPage;
      $scope.totalCount = "";
      $scope.subjects = {};
      HttpService.jsonp(url, {
        start: start,
        count: count
      }, function(data) {
        $scope.title = data.title;
        $scope.subjects = data.subjects;
        $scope.totalCount = data.total;
        $scope.totalPage = Math.ceil($scope.totalCount / count);
        if (currentPage > $scope.totalPage) {
          $route.updateParams({
            page: 1
          });
        }
        $scope.pageNav = movieService.navProvider($scope.totalPage, currentPage)
        $scope.loading = false;
        $scope.$apply();
      });

      $scope.goPage = function(pageNumber) {
        movieService.goPage(pageNumber);
      };

      $scope.nextPage = function(pageNumber) {
        movieService.nextPage(pageNumber, $scope.totalPage);
      };

      $scope.previousPage = function(pageNumber) {
        movieService.previousPage(pageNumber);
      };

    }
  ]);

})(angular);
