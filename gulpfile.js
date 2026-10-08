const { src, dest, series, parallel, watch } = require('gulp');
const { rm } = require('node:fs/promises');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass')); // Підключаємо компілятор Sass

// Очищення папки збірки
function clean() {
    return rm('dist', { recursive: true, force: true });
}

// Копіювання HTML 
function html() {
    return src('src/app/**/*.html')
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
}

// Компіляція CSS із SCSS
function styles() {
    return src('src/app/scss/style.scss') // беремо головний файл стилів
        .pipe(sass().on('error', sass.logError)) // компілюємо SCSS у CSS
        .pipe(dest('dist/css'))                  // зберігаємо в dist/css
        .pipe(browserSync.stream());             // оновлюємо стилі в браузері "на льоту"
}

// Копіювання JavaScript
function scripts() {
    return src('src/app/**/*.js')
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
}

// Загальна збірка
const build = series(
    clean,
    parallel(html, styles, scripts)
);

// Режим розробки зі спостереженням за файлами
function dev() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: true 
    });
    
    watch('src/app/**/*.html', html);
    watch('src/app/scss/**/*.scss', styles); // слідкує за змінами в scss
    watch('src/app/**/*.js', scripts);
}

exports.build = build;
exports.dev = dev;
exports.default = series(build, dev);