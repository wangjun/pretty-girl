var gulp        = require("gulp");
var open        = require("gulp-open");
var express     = require("express");
var path        = require("path");
var concat      = require("gulp-concat");
var uglify      = require("gulp-uglify");
var livereload  = require("gulp-livereload");
var minifyCSS   = require('gulp-minify-css');
var gutil       = require("gulp-util");
var minifyHTML  = require("gulp-minify-html");
var jshint      = require("gulp-jshint");
var autoprefixer= require("gulp-autoprefixer");

// express port
var port        = 8080;
var isPorduction = false;
var minifyHTMLOpt = {quotes: true};
// for production
gulp.task('build', ['prod', 'start'], function () {
    // change the querystring on static files
    var timestamp = +new Date;
    var fs = require("fs");
    var htmlfilename = './dist/index.html';
    var htmlbuf = fs.readFileSync(htmlfilename, 'utf8');
    htmlbuf = htmlbuf.replace(/js\/app.js/, 'js/app.js?t=' + timestamp).replace('css\/app.css', 'css/app.css?t=' + timestamp);
    fs.writeFileSync(htmlfilename, htmlbuf);
});

// for development
gulp.task('default', ['start', 'watch'], function () {
    gutil.log(gutil.colors.cyan('************'));
    gutil.log(gutil.colors.cyan('* All Done *'), 'You can staiting your code, LiveReload will update your browser after any change..');
    gutil.log(gutil.colors.cyan('************'));
    var app = express();
    app.use(express.static(path.resolve('./dist')));
    app.listen(port, function () {
        gutil.log('Server on running:' + port);
        var options = {
            url: 'http://localhost:' + port
        };
        gulp.src('./dist/index.html')
          .pipe(open('', options));
    });
});

gulp.task('start', ['vendor:js', 'vendor:css', 'font', 'basic']);

gulp.task('basic', ['css', 'js', 'index', 'html']);

gulp.task('prod', function () {
    isPorduction = true;
});

gulp.task('vendor:js', function () {
    var js = require("./vendor").js;
    return gulp.src(js).pipe(concat('base.js')).pipe(uglify()).pipe(gulp.dest('./dist/js/'));
});

gulp.task('vendor:css', function () {
    var css = require("./vendor").css;
    return gulp.src(css).pipe(concat('base.css')).pipe(minifyCSS()).pipe(gulp.dest('./dist/css/'));
});

gulp.task('font', function () {
    return gulp.src(['./bower_components/font-awesome/fonts/**']).pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('css', function () {
    return gulp.src(['./master/css/**/*.css'])
      .pipe(concat('app.css'))
      .pipe(autoprefixer())
      .pipe(isPorduction ? minifyCSS() : gutil.noop())
      .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', function () {
    return gulp.src(['./master/js/app.js','./master/js/directive/**/*.js', './master/js/service/**/*.js','./master/js/controller/**/*.js'])
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(concat('app.js'))
      .pipe(isPorduction ? uglify() : gutil.noop())
      .pipe(gulp.dest('./dist/js/'));
});


gulp.task('index', function () {
    return gulp.src(['./master/index.html']).pipe(isPorduction ? minifyHTML(minifyHTMLOpt) : gutil.noop()).pipe(gulp.dest('./dist'));
});

gulp.task('html', function () {
    return gulp.src('./master/html/**').pipe(isPorduction ? minifyHTML(minifyHTMLOpt) : gutil.noop()).pipe(gulp.dest('./dist/html'));
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(['./master/index.html', './master/html/*.html', './master/css/*.css', './master/js/**/*.js'], ['basic']);
    gulp.watch(['./dist/**.*']).on('change', function(event) {
        livereload.changed( event.path );
    });
});