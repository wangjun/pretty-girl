app.controller('MainCtrl', ['$scope', 'constant', '$anchorScroll', 'localStorageService',
    function ($scope, constant, $anchorScroll, localStorageService) {
        $scope.imgprefix = constant.imgprefix;
        $scope.toTop = function () {
            $anchorScroll();
        };
        $(window).scroll(function () {
            console.log($(this).scrollTop());
            if ($(this).scrollTop() > 100) {
                $('#back-to-top').fadeIn();
            } else {
                $('#back-to-top').fadeOut();
            }
        });


    }]);