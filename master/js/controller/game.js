app.controller('GameCtrl', ['$scope', '$routeParams', '$http', 'constant', '$rootScope',
    function ($scope, $routeParams, $http, constant, $rootScope) {
        $rootScope.title = '游戏-美女连连看';
        var reset = function () {
            var height = $(document).height();
            var width = $(document).width();
            $('.game').css('width', (width + 'px'));
            $('.game').css('height', (height + 'px'));
            $scope.wrap = {height: (height / 5) + 'px'};
        };

        var timingInterval = null;
        var timing = function () {
            var minutesLabel = document.getElementById("minutes");
            var secondsLabel = document.getElementById("seconds");
            var totalSeconds = 0;
            timingInterval = setInterval(setTime, 1000);

            function setTime() {
                ++totalSeconds;
                secondsLabel.innerHTML = pad(totalSeconds % 60);
                minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
            }

            function pad(val) {
                var valString = val + "";
                if (valString.length < 2) {
                    return "0" + valString;
                }
                else {
                    return valString;
                }
            }
        };
        var settings = $('.settings');
        settings.css('display', 'none');

        var getData = function () {
            $http.get(constant.apiUrl + 'game').success(function (data) {
                $scope.girls = data;
                $('#startAudio')[0].play();
                timing();
            });
        };

        $(window).resize(function () {
            reset();
        });
        var first = null;
        var count = 0;
        $scope.choose = function (id) {
            console.log(id);
            if (first === null) {
                first = id;
                $('#click')[0].play();
            } else {
                if (first === id) {
                    $('#same')[0].play();
                    count++;
                    first = null;
                    $("[data-id='" + id + "']").css('display', 'none');
                    if (count == 25) {
                        clearInterval(timingInterval);
                        alert('闯关通过,再来一局吧');
                        window.location.reload();
                    }
                } else {
                    first = id;
                    $('#click')[0].play();

                }
            }

        };
        var countDown = setInterval(function () {
            var val = parseInt($('#time').text());
            $('#time').text(--val);
            if (val === 0) {
                clearInterval(countDown);
                $(".cover").slideUp(1000, function () {
                    $('.cover').remove();
                });
            }
        }, 1000);
        getData();
        reset();
    }]);