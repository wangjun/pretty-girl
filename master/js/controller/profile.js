app.controller('ProfileCtrl', ['$scope', '$routeParams', '$http', 'constant', '$rootScope',
    function ($scope, $routeParams, $http, constant, $rootScope) {
        $rootScope.title = '超清美女图片';

        $http.get(constant.apiUrl + 'profile?id=' + $routeParams.imgId).success(function (data) {
            $scope.imgs = data;
        });
    }]);