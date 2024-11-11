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
          primary: colors.blue.darken1,
          secondary: colors.blue.lighten4,
          accent: colors.red.lighten3,
        }
      },
    },
  },
})