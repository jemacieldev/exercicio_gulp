const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

// Caminhos
const paths = {
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js'
  },
  images: {
    src: 'src/images/**/*',
    dest: 'dist/images'
  }
};

// Compilar SASS
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.styles.dest));
}

// Compressão de Imagens
function images() {
  return gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
}

// Compressão de JavaScript
function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(paths.scripts.dest));
}

// Watch
function watchFiles() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.images.src, images);
}

const build = gulp.series(gulp.parallel(styles, images, scripts), watchFiles);

// Export tasks
exports.styles = styles;
exports.images = images;
exports.scripts = scripts;
exports.watch = watchFiles;
exports.build = build;
exports.default = build;
