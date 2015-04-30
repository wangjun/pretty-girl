app.controller('SidebarCtrl', ['$scope', '$rootScope', 'localStorageService',
    function ($scope, $rootScope,localStorageService) {
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
}]);