const { src, dest, watch, series } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

// Завдання для стилів
function styles() {
  return src('src/app/scss/main.scss', { allowEmpty: true })
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(rename('index.min.css'))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}
// Завдання для Bootstrap
function copyBootstrap() {
  return src([
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/bootstrap/dist/js/bootstrap.min.js'
    ], { base: 'node_modules/bootstrap/dist' })
    .pipe(dest('dist/bootstrap'));
}

// Завдання для власних скриптів
function scripts() {
  return src('src/app/js/main.js')
    .pipe(dest('dist/js'));
}

// Завдання для копіювання HTML
function copyHtml() {
  return src('src/app/*.html')
    .pipe(dest('dist'));
}

// Завдання для копіювання зображень
function copyImages() {
  return src('src/app/imgs/**/*', { encoding: false })
    .pipe(dest('dist/imgs'));
}

// Завдання для спостереження
function watching() {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
  });
  watch(['src/app/scss/**/*.scss'], styles);
  watch(['src/app/js/**/*.js'], scripts).on('change', browserSync.reload);
  watch(['src/app/*.html'], copyHtml).on('change', browserSync.reload);
  watch(['src/app/imgs/**/*'], copyImages).on('change', browserSync.reload);
}

// Головне завдання для запуску
exports.default = series(
  copyBootstrap, 
  styles, 
  scripts, 
  copyHtml, 
  copyImages, 
  watching
);