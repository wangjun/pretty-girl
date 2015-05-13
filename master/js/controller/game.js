app.controller('GameCtrl', ['$scope', '$routeParams', '$http', 'constant', '$rootScope', '$timeout',
  function ($scope, $routeParams, $http, constant, $rootScope, $timeout) {
    $rootScope.title = '美女连连看';
    $scope.sidebarfile = 'html/sidebar-game.html';
    var timingInterval = null;
    var first = null;
    var firstIndex = null;
    var count = 0;
    $scope.level = [
      {key: '3', value: '简单'},
      {key: '2', value: '中等'},
      {key: '0', value: '困难'},
      {key: '1', value: '骨灰'}
    ];
    $scope.bgMp3 = [
      {key: '1', value: '爱情骗子我问你'},
      {key: '2', value: '爱拼才会赢'},
      {key: '3', value: '免失志'},
      {key: '4', value: '杯中影'},
      {key: '5', value: '浪子的心情'},
      {key: '6', value: '干一杯-酒廊情歌'},
      {key: '7', value: '烧酒话'},
      {key: '8', value: '你潇洒我漂亮'}
    ];
    $scope.config = {
      level: '2',
      bgMp3: '1'
    };
    var isReseted = null;
    var reset = function () {
      var height = $(window).height();
      var width = $(window).width();
      if (height > width) {
        $('.game').css('width', (width + 'px'));
        $('.game').css('height', (height + 'px'));
        $scope.wrap = {height: (height / 10) + 'px', width: "20%"};
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

    var createAudio = function (id, src) {
      var audioContainer = $('#audio');
      var audio = $('<audio />', {
        loop: 'loop',
        preload: 'auto',
        id: id,
        src: src
      });
      audio.appendTo(audioContainer);
    };
    var getData = function () {
      $http.get(constant.apiUrl + 'game?type=' + $scope.config.level).success(function (data) {
        $scope.girls = data;

        $('#bgAudio')[0].play();
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

    $(document).on('mouseover', function (e) {
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
    $(document).keydown(function (event) {
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
    var getRandomNum = function (end) {
      return Math.floor(Math.random() * end + 1); // 1-end
    };

    var createStartAudio = function () {
      createAudio('startAudio', './mp3/start_' + getRandomNum(2) + '.mp3');
      $('#startAudio')[0].play();
      createAudio('bgAudio', './mp3/12/' + getRandomNum(8) + '.mp3');
    };
    $scope.ok = function () {
      $(".cover").slideUp(1000, function () {
        $('.cover').remove();
      });
      $('#startAudio')[0].pause();
      getData();
    };
    createStartAudio();
    reset();
  }]);