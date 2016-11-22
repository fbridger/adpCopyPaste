var gulp = require('gulp');
var jshint = require('gulp-jshint');
var checkstyle = require('gulp-jshint-checkstyle-reporter');

var production = (process.env.NODE_ENV === 'production');

function lintSource() {
    return gulp.src([ './source/*.js'])
        .pipe(jshint());
}

gulp.task('lint', function () {
    return lintSource()
        .pipe(jshint.reporter(require('jshint-stylish')));
});

gulp.task('default', [ 'lint' ]);
