app.controller('SidebarCtrl', ['$scope', '$rootScope', 'localStorageService', '$location',
    function ($scope, $rootScope,localStorageService, $location) {
    // SHOW HIDE SETTINGS
    var settings = $('.settings');
    $('.settings-ctrl').on('click', function(){
        settings.toggleClass('show');
    });
    var show = false;
    var qrcode = null;
    $scope.isShow = function () {
        show = !show;
        if (show) {
            if (!qrcode) {
                qrcode = new QRCode("qrcode", {
                    text: $location.absUrl(),
                    width: 100,
                    height: 100
                });
            }
            $scope.showQr = true;
            $scope.btn.value = 'unshow';

        } else {
            $scope.showQr = false;
            $scope.btn.value = 'show';
        }
    };
    $scope.btn = {value: 'show'};
}]);
app.controller('SidebarListCtrl', ['$scope', '$rootScope', 'localStorageService',
    function ($scope, $rootScope,localStorageService) {
    var $loaders = $('[load-css]');
    $loaders.on('click', function (e) {
        var element = $(this);

        $loaders.removeClass('checked');
        element.addClass('checked');

        if(element.is('a')) e.preventDefault();

    });
    $scope.isCheck = function (val) {
        return $rootScope.type == val;
    };
    $scope.switchTheme = function (val) {
        localStorageService.set('type', val);
        $scope.$emit('switchTheme', val);
    };
    $scope.nav = function (val) {
        $scope.$emit('nav', val);
    };
}]);

app.controller('SidebarGameCtrl', ['$scope', function ($scope) {

}]);