import gulp from 'gulp';
import pug from 'gulp-pug';
import plumber from 'gulp-plumber';

import config from '../config';

const markup = () => (
  gulp.src(`${config.src.pug}/**/*.pug`)
    .pipe(plumber())
    .pipe(pug({
      pretty: '\t',
    }))
    .pipe(gulp.dest(config.build.root))
);

export default markup;
