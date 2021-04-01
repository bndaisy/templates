import gulp from 'gulp';
import config from '../config';

const fonts = () => (
  gulp.src(`${config.src.fonts}/**/*`)
    .pipe(gulp.dest(config.build.fonts))
);

export default fonts;
