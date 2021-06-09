import { series, parallel } from 'gulp';

import cleaner from './config/tasks/cleaner';
import server from './config/tasks/server';
import explorer from './config/tasks/explorer';
import scripts from './config/tasks/scripts';
import markup from './config/tasks/markup';
import styles from './config/tasks/styles';
import fonts from './config/tasks/fonts';
import images from './config/tasks/images';
import icons from './config/tasks/icons';

import config from './config/config';

config.setEnviroment();

const builder = series(
  cleaner,
  parallel(
    markup,
    styles,
    scripts,
    fonts,
    images,
    icons,
  ),
);

const watcher = series(
  builder,
  server,
  explorer,
);

export { builder, watcher, cleaner };
