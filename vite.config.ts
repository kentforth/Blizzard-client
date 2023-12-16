import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import '../src/assets/scss/fonts.scss';
        @import '../src/assets/scss/_variables.scss';
        @import '../src/assets/scss/mixins/_responsive.scss';
        `
      },
    },
  },
  server: {
    host: 'localhost',
    port: 3000
  },
  plugins: [vue(), svgLoader()],
  alias: [{ find: "@", replacement: resolve(__dirname, "./src") }]
})
