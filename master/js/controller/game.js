app.controller('GameCtrl', ['$scope', '$routeParams', '$http', 'constant', '$rootScope', '$timeout',
    function ($scope, $routeParams, $http, constant, $rootScope, $timeout) {
        $rootScope.title = '美女连连看';
        var timingInterval = null;
        var first = null;
        var firstIndex = null;
        var count = 0;

        var isReseted = null;
        var reset = function () {
            var height = $(window).height();
            var width = $(window).width();
            if (height > width) {
                $('.game').css('width', (width + 'px'));
                $('.game').css('height', (height + 'px'));
                $scope.wrap = {height: (height / 10) + 'px',  width: "20%"};
            } else {
                $('.game').css('width', (width + 'px'));
                $('.game').css('height', (height + 'px'));
                $scope.wrap = {height: (height / 5) + 'px'};
            }
            if (isReseted) {
                $scope.$apply();
            } else {
                isReseted = true;
            }

        };

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
        var uniIds = [];
        var getImgArray = function () {
            $http.post(constant.apiUrl + 'imgarray', {ids: uniIds}).success(function (data) {
                console.log("data\n", data);
            });
        };
        var getData = function () {
            $http.get(constant.apiUrl + 'game').success(function (data) {
                $scope.girls = data;
                var ids = data.map(function (i) {
                    return i.id;
                });
                for (var i = 0; i < ids.length; i++) {
                    if (uniIds.indexOf(ids[i]) === -1) {
                        uniIds.push(ids[i]);
                    }
                }
                $('#startAudio')[0].play();
                timing();
            });
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

        $(window).resize(function () {
            reset();
        });
        var imgSrc = null;

        $(document).on('mouseover', function(e) {
            imgSrc = $(e.target).attr('src');
        });
        var getBigImg = function () {
/*            $http.get(constant.apiUrl + 'game/big?id=' + $scope.imgId).success(function (data) {
                $scope.bigImg = data.localBigPic;

            });*/
            $('#bigImg').attr('src', imgSrc);
            $scope.displayBigImg = true;
            $timeout(function () {
               $scope.displayBigImg = false;
            }, 1000);
            $scope.$apply();

        };
        $(document).keydown(function(event){
            var keyCode = event.keyCode;
            if (keyCode === 32 && imgSrc) {
                getBigImg();
            }
        });
        $scope.choose = function (id, index) {
            if (first === null) {
                first = id;
                firstIndex = index;
                $('#click')[0].play();
            } else {
                if (first === id && firstIndex !== index) {
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
                    firstIndex = index;
                    $('#click')[0].play();

                }
            }

        };

        getData();
        reset();
    }]);