const colors = {
  'color__burning-orange': '#FF7236',
  'color__saffron-mango': '#FAC663',
  'color__white': '#FFF',
  'color__romance': '#FFFEFD',
  'color__del-rio': '#AD988F',
  'color__mirage': '#1A212F',
  'color__shuttle-gray': '#686B72',
  'color__gray': '#848484',
  'color__alto': '#D0D0D0',
  'color__mercury': '#E1E1E1',
  'color__gallery': '#EFEFEF',
}


export default {
  // Accent
  'palette__accent--primary': colors['color__burning-orange'],
  'palette__accent--secondary': colors['color__saffron-mango'],

  // Text
  'palette__text--primary': colors['color__mirage'],
  'palette__text--secondary': colors['color__shuttle-gray'],
  'palette__text--foreground': colors['color__white'],
  'palette__text--another': colors['color__gray'],

  // Background
  'palette__background--primary': colors['color__white'],
  'palette__background--secondary': colors['color__romance'],
  'palette__background--foreground': colors['color__mercury'],

  // Border
  'palette__border--primary': colors['color__gallery'],

  // Box-shadow
  'palette__shadow--primary': colors['color__alto'],
  'palette__shadow--secondary': colors['color__del-rio']
};
