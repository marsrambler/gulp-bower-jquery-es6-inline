var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var inlineSource = require('gulp-inline-source');

var distFolderUrl = "dist";

gulp.task('clean', function () {
  return require('del')([distFolderUrl + '/**', 'tmp/**']);
});

gulp.task('public', function () {
  return gulp.src(['./app/public/**/*', './app/*.ico'], { base: './app/' })
    .pipe(gulp.dest(distFolderUrl))
});

gulp.task('copyjs', function () {
  return gulp.src('./app/js/*.js', { base: './app/' })
    .pipe(gulp.dest(distFolderUrl))
});

//gulp.task('vendorCss',function () {
//  return gulp.src(['./bower_components/**/*.css'])
//    .pipe(gulp.dest(distFolderUrl + '/vendor'))
//})

//gulp.task('vendorFont',function () {
//  return gulp.src([ './bower_components/bootstrap/dist/fonts/**'])
//    .pipe(gulp.dest(distFolderUrl + '/vendor/bootstrap/dist/fonts'))
//})

//gulp.task('vendorJs',function () {
//  return gulp.src('./bower_components/**/*.js')
//    .pipe(gulp.dest(distFolderUrl + '/vendor'))
//})

// gulp.task('vendor', ['vendorCss', 'vendorJs', 'vendorFont']);

gulp.task('convertJS', function() {
  return gulp.src('app/es6js/*.js')
      .pipe(babel({
          presets: ['es2015', 'stage-2']
      }))
      .pipe(gulp.dest('tmp/js'));
});  

gulp.task('browserify', ['convertJS'], function() {
  var b = browserify({
      entries: "tmp/js/es6.js"
  });

  return b.bundle()
  .pipe(source("app-es6.js"))
  .pipe(gulp.dest(distFolderUrl + '/js'));
});

/**
 * the same task as above browserify. babel equals babelify.
 */
//gulp.task('browserify', function() {
//  return browserify({ entries: 'app/es6js/es6.js', extensions: ['.js'], debug: true })
//    .transform(babelify.configure({ presets: ['es2015', 'stage-2'] }))
//    .bundle()
//    .pipe(source('app-es6.js'))
//    .pipe(gulp.dest('dist/js'));
//});

gulp.task('vendor', function () {
  return gulp.src(['./bower_components/**/*'])
    .pipe(gulp.dest(distFolderUrl + '/vendor'))
});

gulp.task('inline', ['public', 'browserify'], function() {
  return gulp.src(distFolderUrl + '/public/index-es6-inline.html')
  .pipe(inlineSource())
  .pipe(gulp.dest(distFolderUrl + '/public/'));
});

gulp.task('build-es5', ['clean'], function () {
  gulp.start('public', 'copyjs', 'vendor', 'browserify');
});

gulp.task('build-es6', ['clean'], function () {
  gulp.start('public', 'browserify');
});

gulp.task('build-es6-inline', ['clean'], function () {
  gulp.start('inline');
});


