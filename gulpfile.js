var gulp = require('gulp');
var less = require('gulp-less');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var iconfont = require('gulp-iconfont');
var runTimestamp = Math.round(Date.now()/1000);

var pathTo = {
    less: './less/**/*.less',
    sass: './sass/**/*.sass',
    icons: 'icons/*.svg',
    build: './build/'
};

gulp.task('font', function(){
    return gulp.src([pathTo.icons])
        .pipe(iconfont({
            fontName: 'myfont', // required
            prependUnicode: true, // recommended option
            formats: ['ttf', 'eot', 'woff'], // default, 'woff2' and 'svg' are available
            timestamp: runTimestamp, // recommended to get consistent builds when watching files

            normalize: true,
            fontHeight: 1001
        }))
        .pipe(gulp.dest(pathTo.build + 'fonts'));
});

gulp.task('less', function () {
    return gulp.src(pathTo.less)
        .pipe(less())
        .pipe(concat('common.css'))
        .pipe(gulp.dest(pathTo.build + 'css'));
});

gulp.task('sass', function () {
    return gulp.src(pathTo.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('common.css'))
        .pipe(gulp.dest(pathTo.build + 'css'));
});

gulp.task('watch', function () {
    gulp.watch(pathTo.sass, ['sass']);
});
