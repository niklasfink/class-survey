var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    typescript = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    bower = require('bower'),
    sh = require('shelljs'),
    tscConfig = require('./tsconfig.json');

var appSrc = 'dist/',
    tsSrc = 'src/backend/typescript/';

var paths = {
  sass: ['src/ionic/scss/**/*.scss']
};

gulp.task('default', ['install', 'git-check', 'sass', 'copylibs', 'typescript', 'watch', 'webserver']);

gulp.task('sass', function(done) { 
  gulp.src('src/ionic/scss/app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('dist/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('dist/css/'))
    .on('end', done);
});

gulp.task('html', function() {
  gulp.src(appSrc + '**/*.html');
});

gulp.task('css', function() {
  gulp.src(appSrc + '**/*.css');
});

gulp.task('copylibs', function() {
  return gulp
    .src([
      'node_modules/es6-shim/es6-shim.min.js',
      'node_modules/systemjs/dist/system-polyfills.js',
      'node_modules/angular2/bundles/angular2-polyfills.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/rxjs/bundles/Rx.js',
      'node_modules/angular2/bundles/angular2.dev.js'
    ])
    .pipe(gulp.dest(appSrc + 'js/lib/angular2'));
});

/* 
gulp.task('copyDev', function() {
  return gulp
    .src('dist/**-/*.*')
    .pipe(gulp.dest('src/ionic/www'));
});
*/

gulp.task('typescript', function () {
  return gulp
    .src(tsSrc + '**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(appSrc + '/js'));
});

gulp.task('watch', function() {
  gulp.watch(tsSrc + '**/*.ts', ['typescript']);
  gulp.watch(appSrc + 'css/*.css', ['css']);
  gulp.watch(appSrc + '**/*.html', ['html']);
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('webserver', function() {
  gulp.src(appSrc)
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
