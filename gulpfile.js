const { src, dest, watch, parallel } = require('gulp');
const fileinclude = require('gulp-file-include');
const scss = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

// Обробка HTML
function html() {
  return src('src/app/index.html')
    .pipe(fileinclude({ prefix: '@@', basepath: '@file' }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

// Обробка SCSS
function styles() {
  return src('src/app/scss/**/*.scss')
    .pipe(scss())
    .pipe(cssnano())
    .pipe(concat('style.min.css'))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

// Обробка JS
function scripts() {
  return src('src/app/js/**/*.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());
}

// Динамічний імпорт для imagemin
async function images() {
  const imagemin = (await import('gulp-imagemin')).default;
  return src('src/app/imgs/**/*')
    .pipe(imagemin())
    .pipe(dest('dist/imgs'))
    .pipe(browserSync.stream());
}

// Сервер
function browsersync() {
  browserSync.init({
    server: { baseDir: 'dist/' },
    port: 3000,
    notify: false
  });
}

// Відстеження змін
function watching() {
  watch(['src/app/**/*.html'], html);
  watch(['src/app/scss/**/*.scss'], styles);
  watch(['src/app/js/**/*.js'], scripts);
  watch(['src/app/imgs/**/*'], images);
}

exports.default = parallel(html, styles, scripts, images, browsersync, watching);