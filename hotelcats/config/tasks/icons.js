import gulp, { series } from 'gulp';
import svg from 'gulp-svg-sprite';

import config from '../config';

const transfer = () => (
  gulp.src(`${config.src.icons}/background/*.svg`)
    .pipe(gulp.dest(`${config.build.icons}/background/`))
);

const sprite = () => (
  gulp.src(`${config.src.icons}/*.svg`)
    .pipe(svg({
      mode: {
        symbol: {
          sprite: '../sprite.svg',
        },
      },
      shape: {
        transform: [{
          svgo: {
            plugins: [{
              removeAttrs: {
                attrs: ['class'],
              },
            }],
          },
        }],
      },
    }))
    .pipe(gulp.dest(config.build.icons))
);

const icons = (done) => series(transfer, sprite)(done);

export default icons;
