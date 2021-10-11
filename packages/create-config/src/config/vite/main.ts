// vue3
export const genViteMainFile = () => `
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createStore } from 'vuex'
import routes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
import {
  state,
  mutations,
  actions,
  getters,
  modules,
} from './store/index'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts(routes),
})
const store = createStore({
  state,
  mutations,
  actions,
  getters,
  modules,
})

app.use(router)
app.use(store)
app.mount('#app')
`.trim();

// vue2
export const genLegacyViteMainFile = () => `
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import routes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
import {
  state,
  mutations,
  actions,
  getters,
  modules,
} from './store/index'

Vue.use(VueRouter)
Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules,
})

const router = new VueRouter({
  mode: 'history',
  routes: setupLayouts(routes),
})

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
})
`.trim();
