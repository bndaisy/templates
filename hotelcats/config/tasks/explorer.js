import { watch } from 'gulp';

import markup from './markup';
import styles from './styles';
import scripts from './scripts';
import fonts from './fonts';
import images from './images';
import icons from './icons';

import config from '../config';

const explorer = () => {
  watch(`${config.src.root}/**/*.pug`, markup);
  watch(`${config.src.sass}/**/*.sass`, styles);
  watch(`${config.src.js}/**/*.js`, scripts);
  watch(`${config.src.fonts}/**/*`, fonts);
  watch(`${config.src.images}/**/*`, images);
  watch(`${config.src.icons}/**/*.svg`, icons);
};

export default explorer;
