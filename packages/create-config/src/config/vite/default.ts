export const genEnvDtsFile = () => `
import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
`.trim();

export const genDefaultHtmlFile = () => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
    <meta name="description" content="">
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`.trim();

export const genDefaultAppFile = () => `
<template>
  <router-view />
</template>
`.trim();

export const genPlaceholderPageFile = (name: string) => `
<template>
  <div>${name}</div>
</template>
`;

export const genDefaultLayoutFile = () => `
<template>
  <div>
    <header>header</header>
    <router-view />
    <footer>footer</footer>
  </div>
</template>
`.trim();

export const genDefaultStoreFile = () => `
export const state = {}

export const mutations = {}

export const actions = {}

export const getters = {}

export const modules = {}
`;
