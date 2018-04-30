(function(angular) {
  'use strict';
  angular.module('movieApp.directive.activeFocus', [])
    .directive('activeFocus', [
      '$location',
      '$document',
      function($location, $document) {
        return {
          restrict: 'A',
          link: function($scope, iElement, iAttrs) {
            $scope.$location = $location;
            $scope.$watch('$location.path()', function(now) {
              var href = iElement.children().attr('href');
              var type = href.replace(/#\/(.+?)\/\d+/, '$1');
              now = now.replace(/\/(.+?)\/\d+/, '$1');
              if (now === type) {
                iElement.parent().children().removeClass("active");
                iElement.addClass('active');
              }
            });
          }
        };
      }
    ])
})(angular);
