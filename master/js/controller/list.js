app.controller('ListCtrl', ['$scope', '$http', 'constant', 'animationConfig', '$rootScope',
    function ($scope, $http, constant, animationConfig, $rootScope) {
        var settings = $('.settings');
        settings.css('display', 'block');
        $scope.params = {
            type: $rootScope.type,
            page: 1,
            limit: 100
        };
        var getQs = function () {
            return 'type=' + $scope.params.type +
              '&page=' + $scope.params.page +
              '&limit=' + $scope.params.limit;
        };
        var getData = function () {
            $http.get(constant.apiUrl + 'list?' + getQs()).success(function (data) {
                if (data.length < $scope.params.limit) {
                    $rootScope.navDisable = true;
                }
                $scope.girls = data;
            });
        };
        $scope.animationConfig = animationConfig;
        //console.log('animationConfig:' + JSON.stringify(animationConfig));
        $rootScope.$on('switchTheme', function (event, args) {
            $scope.params.type = args;
            $rootScope.currentPage = 1;
            $rootScope.navDisable = false;
            $scope.params.page = 1;
            getData();

        });
        $rootScope.$on('nav', function (event, args) {
            if (args === 'right') {
                $rootScope.currentPage++;
            } else {
                if ($rootScope.currentPage !== 1) {
                    $rootScope.currentPage--;
                } else {
                    return;
                }
            }
            $scope.params.page = $scope.currentPage;
            getData();
        });
        getData();
    }]);