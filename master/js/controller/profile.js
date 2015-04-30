app.controller('ProfileCtrl', ['$scope', '$routeParams', '$http', 'constant',
    function ($scope, $routeParams, $http, constant) {
        $http.get(constant.apiUrl + 'profile?id=' + $routeParams.imgId).success(function (data) {
            $scope.imgs = data;
        });
        var settings = $('.settings');
        settings.css('display', 'none');
    }]);