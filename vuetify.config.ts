import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration';
import colors from 'vuetify/util/colors';

export default defineVuetifyConfiguration({
  /* vuetify options */
  icons: {
    defaultSet: 'mdi',
    sets: ['mdi', 'fa'],
  },
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#002A6f',
          secondary: colors.blue.lighten4,
          accent: colors.red.lighten3,
          light: '#F8FBFF'
        }
      },
    },
  },
})