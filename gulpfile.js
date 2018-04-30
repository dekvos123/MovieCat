'use strict'
var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('html',function() {
  gulp.src(['app/*.html','app/templates/*.html'])
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('script1',function() {
  gulp.src('app/js/*.js')
    .pipe(gulp.dest('app/dist/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('script2',function() {
  gulp.src('app/js/controllers/*.js')
    .pipe(gulp.dest('app/dist/controllers/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('script3',function() {
  gulp.src('app/js/services/*.js')
    .pipe(gulp.dest('app/dist/services/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('serve',function() {
  browserSync({
    server: {
      baseDir: ['app/']
    }
  },function(err,bs) {
    console.log(bs.options.getIn(['urls','local']));
  });

  gulp.watch('app/*.html',['html']);
  gulp.watch('app/templates/*.html',['html']);
  gulp.watch('app/js/*.js',['script1']);
  gulp.watch('app/js/controllers/*.js',['script2']);
  gulp.watch('app/js/services/*.js',['script3']);
});
