import gulp from 'gulp';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';
import webp from 'imagemin-webp';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';

import config from '../config';

const images = () => (
  gulp.src(`${config.src.images}/**/*.+(png|jpg|jpeg)`)
    .pipe(changed(config.build.images))
    .pipe(gulpif(config.isProduction, imagemin([
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      webp({ quality: 80 }),
    ])))
    .pipe(rename({ extname: '.webp' }))
    .pipe(gulp.dest(config.build.images))
);

export default images;
