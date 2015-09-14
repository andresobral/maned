var gulp = require('gulp');
var concat = require('concat');
var uglify = require('uglify');
var rename = require('rename');
var order = require('order');

gulp.task('build', function() {
  gulp.src('./src/**/*.js')
    .pipe(order([
      "src/Preloader.js"
    ]))
    .pipe(concat("maned.js"))
    .pipe(uglify())
    .pipe(rename("maned.min.js"))
    .pipe(gulp.dest("./dist"))
});

gulp.task('watch', function() {
  gulp.watch('./src/**/*.js', ['build']);
});

gulp.task('default', ['watch']);
