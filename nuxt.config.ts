/*
 * Copyright (c) 2023 - 2024 drolx Labs
 * 
 * Licensed under the drolx Source Available License 1.0
 * you may not use this file except in compliance with the License.
 *     https://drolx.com/licenses/source-license-1.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 * Author: Falana Sheriff (sheriff@drolx.com)
 * Created At: Thursday, 7th Nov 2024
 * Modified By: Falana Sheriff
 * Modified At: Thu Nov 07 2024
 */

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    'vuetify-nuxt-module',
    '@unocss/nuxt',
  ],
  runtimeConfig: {
    public: {  
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
    }, 
  },
  supabase: {
    redirectOptions: {
      login: '/auth/login',
      callback: '/auth/confirm',
      include: undefined,
      exclude: ['/auth/*'],
      cookieRedirect: true,
    },
  }
})