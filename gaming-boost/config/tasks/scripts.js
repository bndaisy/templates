import gulp from 'gulp';
import browserify from 'browserify';
import plumber from 'gulp-plumber';
import gulpif from 'gulp-if';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';

import config from '../config';

const scripts = () => (
  browserify(`${config.src.js}/main.js`, { debug: true })
    .transform('babelify', { presets: ['@babel/preset-env'] })
    .bundle()
    .pipe(plumber())
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulpif(config.isDevelopment, sourcemaps.init({ loadMaps: true })))
    .pipe(gulpif(config.isProduction, uglify()))
    .pipe(gulpif(config.isDevelopment, sourcemaps.write()))
    .pipe(gulp.dest(config.build.js))
);

export default scripts;
