app.controller('SidebarCtrl', ['$scope', '$rootScope', 'localStorageService', '$location',
    function ($scope, $rootScope,localStorageService, $location) {
    // SHOW HIDE SETTINGS
    var settings = $('.settings');
    $('.settings-ctrl').on('click', function(){
        settings.toggleClass('show');
    });
    // Load THEME CSS

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
    var show = false;
    $scope.isShow = function () {
        show = !show;
        if (show) {
            $scope.showQr = true;
            $scope.btn.value = 'unshow';
        } else {
            $scope.showQr = false;
            $scope.btn.value = 'show'
        }
    };
    $scope.qr = {
        version: 4,
        level: 'M',
        size: '100',
        var: $location.absUrl()
    };
    $scope.btn = {value: 'show'};
}]);