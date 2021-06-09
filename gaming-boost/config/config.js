const path = {
  src: 'src',
  build: 'build',
};

const config = {
  src: {
    root: path.src,
    components: `${path.src}/components`,
    pug: `${path.src}/pug`,
    sass: `${path.src}/sass`,
    js: `${path.src}/js`,
    images: `${path.src}/assets/images`,
    icons: `${path.src}/assets/icons`,
    fonts: `${path.src}/assets/fonts`,
  },
  build: {
    root: path.build,
    pages: `${path.build}/pages`,
    css: `${path.build}/css`,
    js: `${path.build}/js`,
    images: `${path.build}/images`,
    icons: `${path.build}/icons`,
    fonts: `${path.build}/fonts`,
  },
  setEnviroment() {
    this.isProduction = process.argv.includes('--production');
    this.isDevelopment = !this.isProduction;
  },
};

export default config;
