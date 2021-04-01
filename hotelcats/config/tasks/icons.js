import gulp from 'gulp';
import svg from 'gulp-svg-sprite';

import config from '../config';

const icons = () => (
  gulp.src(`${config.src.icons}/**/*.svg`)
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

export default icons;
