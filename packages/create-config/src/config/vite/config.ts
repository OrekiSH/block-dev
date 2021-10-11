export const genViteConfigFile = (externals?: boolean) => `
import path from 'path'
import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Vue from '@vitejs/plugin-vue'
import { viteExternalsPlugin } from 'vite-plugin-externals'

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    Vue(),
    Pages({
      extensions: ['vue', 'js', 'tsx'],
    }),
    Layouts(),
    viteExternalsPlugin(${externals ? `
      {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        '@vue/composition-api': 'VueCompositionAPI'
      }
    `.trim() : '{}'}),
  ],
  server: {
    port: 3000,
    proxy: {},
  },
})
`.trim();

export const genLegacyViteConfigFile = (externals?: boolean) => `
import path from 'path'
import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import { createVuePlugin } from 'vite-plugin-vue2'
import { viteExternalsPlugin } from 'vite-plugin-externals'

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    createVuePlugin({
      jsx: true,
    }),
    Pages({
      extensions: ['vue', 'js', 'tsx'],
    }),
    Layouts(),
    viteExternalsPlugin(${externals ? `
      {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
      }
    `.trim() : '{}'}),
  ],
  server: {
    port: 3000,
    proxy: {}
  },
})
`.trim();
