var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var order = require('gulp-order');

gulp.task('build', function() {
  gulp.src([
    'src/Preloader.js',
    'src/Controls.js',
    'src/Sprite.js',
    'src/Collision.js',
    'src/Util.js',
    'src/Maned.js',
    'src/**/*.js'
    ])
    .pipe(concat("maned.js"))
    .pipe(gulp.dest("./dist"))
    .pipe(uglify())
    .pipe(rename("maned.min.js"))
    .pipe(gulp.dest("./dist"))
    .pipe(gulp.dest("./site/dist"))
});

gulp.task('watch', function() {
  gulp.watch('./src/**/*.js', ['build']);
});

gulp.task('default', ['watch']);
