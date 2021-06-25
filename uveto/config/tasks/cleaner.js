import del from 'del';
import config from '../config';

const cleaner = () => del(config.build.root);

export default cleaner;
