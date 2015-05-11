var app = angular.module('girl', [
    'ngRoute',
    'angular-loading-bar',
    'ngFx',
    'ngAnimate',
    'LocalStorageModule'
]);
app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
          when('/list', {
              templateUrl: 'html/list.html',
              controller: 'ListCtrl'
          }).
          when('/list/:imgId', {
              templateUrl: 'html/profile.html',
              controller: 'ProfileCtrl'
          }).
          when('/game', {
              templateUrl: 'html/game.html',
              controller: 'GameCtrl'
          }).
          when('/game-reward', {
              templateUrl: 'html/game-reward.html',
              controller: 'GameRewardCtrl'
          }).
          otherwise({
              redirectTo: '/list'
          });
    }]);
app.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('girl')
      .setStorageType('sessionStorage')
      .setNotify(true, true);
}]);
app.constant('constant', {
    apiUrl: 'http://114.215.159.50:7776/',
    imgprefix: 'http://114.215.159.50:7777/'
});
app.run(['$rootScope', 'localStorageService',
    function ($rootScope, localStorageService) {
    $rootScope.currentPage = 1;
    $rootScope.navDisable = false;
    var type = localStorageService.get('type');
    if (!type) {
        $rootScope.type = '4';
    } else {
        $rootScope.type = type;
    }
}]);





