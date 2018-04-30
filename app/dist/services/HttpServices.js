/**
 * @Author   greyu
 * @describe [the service which provide jsonp designed by greyu]
 * @DateTime 2017-02-26
 * @param    {[type]}   angular [description]
 * @return   {[type]}           [description]
 */
(function(angular) {
  'use strict';
  var HttpService = angular.module('greyu.util.HttpService', []);
  HttpService.service('HttpService', [
    '$window',
    '$document',
    function($window, $document) {
      this.jsonp = function(url, params, callback) {
        //回调函数名称
        // console.log("httpService");
        var cbName = 'cb_movie_jsonp_' + Math.random().toString().replace('.', '');
        // console.log(cbName);
        // 判断url是否带问号
        var jsonpPath = url.indexOf("?") == -1 ? url + "?" : url;
        // 挂载回调函数
        $window[cbName] = function(data) {
          callback(data);
          //移除jsonp节点
          $document[0].body.removeChild(script);
        };
        // console.log($window.cbName);
        var queryString = "";
        queryString += "callback=" + cbName + "&";
        for (var item in params) {
          queryString += item + "=" + params[item] + "&";
        }
        jsonpPath += queryString;
        // console.log(jsonpPath);
        var script = $document[0].createElement("script");
        script.src = jsonpPath;
        $document[0].body.appendChild(script);
      }
    }
  ]);
})(angular);
