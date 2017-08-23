'use strict'

/*
 *  Gulp Packages
 */

// default gulp package
const gulp = require('gulp');
// gulp sass package
const sass = require('gulp-sass');
// gulp server package
const browserSync = require('browser-sync').create();

/*
 *  Path Variables
 */

// dist path for site build
const distDest = 'dist/';

// source path for HTML files
const htmlSrc = '*.html';
// dest path for HTML files
const htmlDest = distDest;

// source path for JavaScript files
const jsonSrc = 'exercise-sample-data.json';
// dest path for JavaScript files
const jsonDest = distDest;

// source path for JavaScript files
const jsSrc = 'js/*.js';
// dest path for JavaScript files
const jsDest = distDest + 'js/';

// source path for image files
const imgSrc = 'img/*.*';
// dest path for JavaScript files
const imgDest = distDest + 'img/';


// source path for SASS/SCSS files
const sassSrc = 'scss/*.scss';
// dest path for SASS/SCSS files
const sassDest = distDest + 'css/';
// CSS file output by SASS compilation
const sassOutput = 'styles.css'

/*
 *  Gulp Functions
 */

// gulp function to copy src files to dest directory
function copy(src, dest) {
  return gulp.src(src)
    .pipe(gulp.dest(dest));
};

/*
 *  Gulp Tasks
 */

// Run everything
gulp.task('default', [
  'sass',
  'js',
  'html',
  'json',
  'images'
]);

// Compile SCSS files from to dist/css/
gulp.task('sass', function() {
  return gulp.src(sassSrc)
    .pipe(sass())
    // .pipe(concat(sassOutput))
    .pipe(gulp.dest(sassDest))
});

// Copy HTML files to dist
gulp.task('html', function() {
  return copy(htmlSrc, htmlDest);
});

// Copy JavaScript files to dist
gulp.task('js', function() {
  return copy(jsSrc, jsDest);
});

// Copy json files to dist
gulp.task('json', function() {
  return copy(jsonSrc, jsonDest);
});

// Copy image files to dist
gulp.task('images', function() {
  return copy(imgSrc, imgDest);
});

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
});

// Run development server task with browserSync locally on port 3000
gulp.task('serve', ['browserSync', 'default'], function() {
  // run gulp tasks when source files change
  gulp.watch(htmlSrc, ['html']);
  gulp.watch(jsSrc, ['js']);
  gulp.watch(sassSrc, ['sass']);

  // Reload the browser whenever files change
  gulp.watch(htmlSrc, browserSync.reload)
  gulp.watch(jsSrc, browserSync.reload)
  gulp.watch(sassSrc, browserSync.reload)
})
