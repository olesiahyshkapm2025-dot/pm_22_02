const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const { rm } = require('node:fs/promises');

// Only generated output is removed. Source files are never modified.
function clean() { return rm('dist', { recursive: true, force: true }); }

function bootstrapCss() {
  return src('node_modules/bootstrap/dist/css/*.min.css').pipe(dest('dist/css'));
}

function bootstrapJs() {
  return src('node_modules/bootstrap/dist/js/*.min.js').pipe(dest('dist/js'));
}

function styles() {
  return src('src/scss/main.scss')
    .pipe(sass({ style: 'compressed' }))
    .on('data', file => { file.basename = 'index.min.css'; })
    .pipe(dest('dist/css'));
}

// Функція обробки HTML із підтримкою інклудів (@@include)
function html() { 
  return src('src/*.html')
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest('dist')); 
}

function scripts() { return src('src/js/**/*.js').pipe(dest('dist/js')); }

function assets() { return src('src/assets/**/*', { encoding: false }).pipe(dest('dist/assets')); }

function bootstrapMaps() {
  return src(['node_modules/bootstrap/dist/css/*.min.css.map', 'node_modules/bootstrap/dist/js/*.min.js.map'], { base: 'node_modules/bootstrap/dist' }).pipe(dest('dist'));
}

function observe() {
  watch('src/scss/**/*.scss', styles);
  watch('src/*.html', html);
  watch('src/js/**/*.js', scripts);
  watch('src/assets/**/*', assets);
}

const build = series(clean, parallel(bootstrapCss, bootstrapJs, bootstrapMaps, styles, html, scripts, assets));

exports['bootstrap:css'] = bootstrapCss;
exports['bootstrap:js'] = bootstrapJs;
exports.styles = styles;
exports.build = build;
exports.dev = series(build, observe);
exports.default = build;