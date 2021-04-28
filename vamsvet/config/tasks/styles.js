import gulp from 'gulp';
import sass from 'gulp-sass';
import plumber from 'gulp-plumber';
import gulpif from 'gulp-if';
import autoprefixer from 'gulp-autoprefixer';
import groupmedia from 'gulp-group-css-media-queries';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import config from '../config';

const styles = () => (
  gulp.src(`${config.src.sass}/main.sass`, { sourcemaps: config.isDevelopment })
    .pipe(plumber())
    .pipe(sass({
      outputStyle: 'expanded',
    }).on('error', sass.logError))
    .pipe(
      gulpif(config.isProduction,
        groupmedia(),
        autoprefixer(),
        cleanCSS({ level: 2 })))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(config.build.css, { sourcemaps: config.isDevelopment }))
);

export default styles;
