(function(angular) {
  'use strict';
  var services = angular.module('movieApp.services.moviceService', []);
  services.service('movieService', [
    '$route',
    function($route) {
      /**
       * @Author   greyu
       * @describe [提供导航条显示服务]
       * @DateTime 2017-02-27
       * @param    {[type]}   totalPage   [description]
       * @param    {[type]}   currentPage [description]
       * @return   {[type]}               [description]
       */
      this.navProvider = function(totalPage, currentPage) {
        //用于计算导航条显示的页码
        // 1. 总共页数小于或等于3页时
        var pageNav = [];
        if (totalPage <= 3) {
          for (var i = 1; i <= totalPage; i++) {
            pageNav.push({
              pageNum: i
            });
          }
          return pageNav;
        }
        // 总共页数为4页时
        else if (totalPage < 5) {
          // 当前页是1，显示 1,2,3
          if (currentPage == 1) {
            for (var i = 1; i <= 3; i++) {
              pageNav.push({
                pageNum: i
              });
            }
            return pageNav;
          }
          // 当前页不是1，显示2,3,4
          else {
            for (var i = 2; i <= totalPage; i++) {
              pageNav.push({
                pageNum: i
              });
            }
            return pageNav;
          }
        }
        // 总共页数大于5页时，页码显示5项
        else if (totalPage >= 5) {
          // 当前页小于或等于3 ，显示 1，2,3,4,5
          if (currentPage <= 3) {
            for (var i = 1; i <= 5; i++) {
              pageNav.push({
                pageNum: i
              });
            }
            return pageNav;
          }
          // 当前页码大于3
          else if (currentPage > 3) {
            // 当前页码 就是 最大页码
            if (totalPage === currentPage) {
              for (var i = currentPage - 4; i <= currentPage; i++) {
                pageNav.push({
                  pageNum: i
                });
              }
              return pageNav;
            }
            // 当前页码比最大页码小1页，例： 当前页7，最大页码8,显示4,5,6,7,8
            else if ((totalPage - currentPage) === 1) {
              for (var i = currentPage - 3; i <= currentPage + 1; i++) {
                pageNav.push({
                  pageNum: i
                });
              }
              return pageNav;
            }
            // 正常情况
            else if ((totalPage - currentPage) >= 2) {
              for (var i = currentPage - 2; i <= currentPage + 2; i++) {
                pageNav.push({
                  pageNum: i
                });
              }
              return pageNav;
            }
          }
        }
      }

      /**
       * @Author   greyu
       * @describe [用于点击页码，跳转页面]
       * @DateTime 2017-02-26
       * @return   {[type]}   [description]
       */
      this.goPage = function(pageNumber) {
        $route.updateParams({
          page: pageNumber
        });
      }

      /**
       * @Author   greyu
       * @describe [跳到下一页]
       * @DateTime 2017-02-26
       * @param    {[type]}   pageNumber [description]
       * @return   {[type]}              [description]
       */
      this.nextPage = function(pageNumber, totalPage) {
        // console.log("currentPage:"+$scope.currentPageNum);
        if (pageNumber >= totalPage) {
          $route.updateParams({
            page: totalPage
          });
        } else {
          pageNumber++;
          $route.updateParams({
            page: pageNumber
          });
        }
      }

      this.previousPage = function(pageNumber) {
        if (pageNumber <= 1) {
          $route.updateParams({
            page: 1
          });
        } else {
          pageNumber--;
          $route.updateParams({
            page: pageNumber
          });
        }
      }
    }
  ])
})(angular);
