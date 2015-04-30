app.directive('topBtn', [function () {
    return {
        restrict: "E",
        template: '<a id="back-to-top" ng-click="toTop()">^</a>'
    };
}]);