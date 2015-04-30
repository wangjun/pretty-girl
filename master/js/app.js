var app = angular.module('girl', ['ngRoute']);
app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
          when('/list', {
              templateUrl: 'html/list.html',
              controller: 'ListCtrl'
          }).
          when('/list/:imgId', {
              templateUrl: 'html/profile.html',
              controller: 'ProfileCtrl'
          }).
          otherwise({
              redirectTo: '/list'
          });
    }]);

app.constant('constant', {
    apiUrl: 'http://localhost:7777/',
    imgprefix: 'http://114.215.159.50:7777/'
});

app.controller('MainCtrl', ['$scope', 'constant', function ($scope, constant) {
    $scope.imgprefix = constant.imgprefix;
}]);

app.controller('ListCtrl', ['$scope', '$http', 'constant',
    function ($scope, $http, constant) {
    $http.get(constant.apiUrl + 'list?type=5&page=1&limit=500').success(function(data) {
        $scope.girls = data;
    });
}]);

app.controller('ProfileCtrl', ['$scope', '$routeParams', '$http', 'constant',
    function ($scope, $routeParams, $http, constant) {
    $http.get(constant.apiUrl +  'profile?id=' + $routeParams.imgId).success(function(data) {
        $scope.imgs = data;
    });
}]);