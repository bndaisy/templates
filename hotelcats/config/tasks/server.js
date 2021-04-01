import browsersync from 'browser-sync';
import config from '../config';

const server = (callback) => {
  browsersync.create().init({
    server: {
      baseDir: config.build.root,
    },
    files: [
      `${config.build.root}/**/*.html`,
      `${config.build.css}/**/*.css`,
      `${config.build.js}/**/*.js`,
      {
        match: `${config.build.images}/**/*`,
        fn: () => this.reload(),
      },
    ],
  });

  callback();
};

export default server;
