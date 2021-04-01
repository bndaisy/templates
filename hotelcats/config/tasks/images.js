import gulp from 'gulp';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';
import webp from 'imagemin-webp';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';

import config from '../config';

const images = () => (
  gulp.src(`${config.src.images}/**/*.{jpeg, jpg, png}`)
    .pipe(changed(config.build.images, { extension: '.webp' }))
    .pipe(gulpif(config.isProduction, imagemin([
      webp({
        quality: 80,
      }),
    ])))
    .pipe(rename({
      extname: '.webp',
    }))
    .pipe(gulp.dest(config.build.images))
);

export default images;
