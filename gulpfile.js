const { src, dest, series, parallel, watch } = require('gulp');
const { rm } = require('node:fs/promises');
 const browserSync=require ('browser-sync').created();
// Очищення папки збірки
function clean() {
    return rm('dist', { recursive: true, force: true });
}

// Копіювання HTML 
function html() {
    return src('src/app/**/*.html')
        .pipe(dest('dist'));
}

// Копіювання CSS
function styles() {
    return src('src/app/scss/**/*.scss') // шлях до папки scss та всіх файлів .scss
        .pipe(dest('dist/css'));         // куди зберігати готові стилі
}

// Копіювання JavaScript
function scripts() {
    return src('src/app/**/*.js')
        .pipe(dest('dist'));
}

// Загальна збірка
const build = series(
    clean,
    parallel(html, styles, scripts)
);
// Режим розробки зі спостереженням за файлами
function dev() {
    browserSync.init({
        server:{
            baseDir:"./dist"
        }
    } );
    
    watch('src/app/**/*.html', html);
    watch('src/app/scss/**/*.scss', styles); // слідкує за змінами в scss
    watch('src/app/**/*.js', scripts);
}

exports.build = build;
exports.dev = dev;
exports.default = series(build,dev);
