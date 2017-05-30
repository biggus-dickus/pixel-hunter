'use strict';

const del = require('del'),
      gulp = require('gulp'),
      sass = require('gulp-sass'),
      plumber = require('gulp-plumber'),
      postcss = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      server = require('browser-sync').create(),
      mqpacker = require('css-mqpacker'),
      minify = require('gulp-csso'),
      rename = require('gulp-rename'),
      imagemin = require('gulp-imagemin'),
      htmlmin = require('gulp-htmlmin'),
      rollup = require('gulp-better-rollup'),
      babel = require('rollup-plugin-babel'),
      sourcemaps = require('gulp-sourcemaps'),
      uglify = require('gulp-uglify');


gulp.task('test', function () {});

gulp.task('style', function () {
  gulp.src('sass/style.scss')
    .pipe(plumber())
    .pipe(sass({ sourceComments: true })
      .on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({
        browsers: [
          'last 1 version',
          'last 2 Chrome versions',
          'last 2 Firefox versions',
          'last 2 Opera versions',
          'last 2 Edge versions'
        ]
      }),
      mqpacker({sort: true})
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream())
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('scripts', function () {
  return gulp.src('js/main.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(rollup({plugins: [babel()]}, 'iife'))
    .pipe(uglify())
    .pipe(rename('bundle.min.js'))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('build/js/'));
});

gulp.task('imagemin', ['copy'], function () {
  return gulp.src('build/img/**/*.{jpg,png,gif}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest('build/img'));
});


gulp.task('copy-html', function () {
  return gulp.src('*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build'))
    .pipe(server.stream());
});

gulp.task('copy', ['copy-html', 'scripts', 'style'], function () {
  return gulp.src([
    'fonts/**/*.{woff,woff2}',
    'img/**/*.*'
  ], {base: '.'})
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('js-watch', ['scripts'], function (done) {
  server.reload();
  done();
});

gulp.task('serve', ['assemble'], function () {
  server.init({
    server: './build',
    notify: false,
    open: true,
    port: 3502,
    ui: false
  });

  gulp.watch('sass/**/*.{scss,sass}', ['style']);
  gulp.watch('*.html').on('change', (e) => {
    if (e.type !== 'deleted') {
      gulp.start('copy-html');
    }
  });
  gulp.watch('js/**/*.js', ['js-watch']);
});

gulp.task('assemble', ['clean'], function () {
  gulp.start('copy', 'style');
});

gulp.task('build', ['assemble', 'imagemin']);
gulp.task('default', ['serve']);
