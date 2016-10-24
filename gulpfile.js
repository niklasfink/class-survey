var gulp = require('gulp'),
  webserver = require('gulp-webserver'),
  typescript = require('gulp-typescript'),
  sourcemaps = require('gulp-sourcemaps'),
  gutil = require('gulp-util'),
  sass = require('gulp-sass'),
  minifyCss = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  bower = require('bower'),
  sh = require('shelljs'),
  tscConfig = require('./tsconfig.json');

var paths = {
  dist: ['dist/'],
  sass: ['src/ionic/scss/**/*.scss'],
  tsSrc: ['src/backend/typescript/'],
  webSrc: ['src/webapp/']
};

gulp.task('default', ['install']);
gulp.task('web', ['copylibs', 'typescript', 'html', 'css', 'watch', 'webserver']);

gulp.task('sass', function (done) {
  return gulp.src('src/ionic/scss/app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest(paths.dist + 'css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest(paths.dist + 'css/'))
    .on('end', done);
});

gulp.task('html', function () {
  return gulp.src(paths.webSrc + '**/*.html')
    .pipe(gulp.dest(paths.dist + ''));
});

gulp.task('css', function () {
  return gulp.src(paths.webSrc + '**/*.css')
    .pipe(gulp.dest(paths.dist + ''));
});

gulp.task('copylibs', ['copyfolders'], function () {
  //TODO: to be modified
  return gulp
    .src([
      'node_modules/reflect-metadata/Reflect.js',
      'node_modules/core-js/client/shim.min.js',
      'node_modules/zone.js/dist/zone.js',
      'node_modules/systemjs/dist/system.src.js',
      'src/backend/systemjs.config.js',
      'node_modules/@angular/core/bundles/core.umd.js',
      'node_modules/@angular/common/bundles/common.umd.js',
      'node_modules/@angular/compiler/bundles/compiler.umd.js',
      'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
      'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      'node_modules/@angular/http/bundles/http.umd.js',
      'node_modules/@angular/router/bundles/router.umd.js',
      'node_modules/@angular/forms/bundles/forms.umd.js'
    ])
    .pipe(gulp.dest(paths.dist + '/js/lib/angular'));
});

gulp.task('copyfolders', function () {
  gulp
    .src(['node_modules/rxjs/**/*'])
    .pipe(gulp.dest(paths.dist + '/js/lib/angular/rxjs'));
  gulp
    .src(['node_modules/angular-in-memory-web-api/**/*'])
    .pipe(gulp.dest(paths.dist + '/js/lib/angular/angular-in-memory-web-api'));
});

gulp.task('typescript', function () {
  return gulp
    .src(paths.tsSrc + '**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist + 'js'));
});

gulp.task('watch', function () {
  gulp.watch(paths.tsSrc + '**/*.ts', ['typescript']);
  gulp.watch(paths.webSrc + 'css/*.css', ['css']);
  gulp.watch(paths.webSrc + '**/*.html', ['html']);
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('webserver', function () {
  return gulp.src(paths.dist)
    .pipe(webserver({
      livereload: true
    }));
});

gulp.task('install', ['git-check'], function () {
  return bower.commands.install()
    .on('log', function (data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function (done) {
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