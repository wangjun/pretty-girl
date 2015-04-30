app.factory('animationConfig', [function () {
    var timeArr = (function () {
        var speeds = [100];
        for (var i = 200; i < 1500; i += 100) {
            speeds.push(i);
        }
        return speeds;
    })();
    var animationsArr = [
        'zoom-right',
        'zoom-left',
        'zoom-down',
        'zoom-up',
        'zoom-normal',
        'rotate-counterclock-up',
        'rotate-clock',
        'rotate-counterclock',
        'rotate-clock-left',
        'fade-normal',
        'fade-down',
        'fade-down-big',
        'fade-left',
        'fade-left-big',
        'fade-right',
        'fade-right-big',
        'fade-up',
        'fade-up-big',
        'bounce-normal',
        'bounce-down',
        'bounce-left',
        'bounce-up',
        'bounce-right'
    ];
    var easingsArr = [
        'quad',
        'cubic',
        'quart',
        'quint',
        'strong',
        'back',
        'bounce',
        'circ',
        'elastic',
        'expo',
        'sine'
    ];
    var random = function (min, max) {
        if (max === null) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    };
    return {
        speed: timeArr[random(0, timeArr.length - 1)],
        animation: animationsArr[random(0, animationsArr.length - 1)],
        easing: easingsArr[random(0, easingsArr.length - 1)]
    };
}]);