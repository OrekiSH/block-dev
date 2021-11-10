import {
  yellow, green, blue,
} from 'kolorist';

export const ESLINT_CONFIGS = [
  {
    name: 'airbnb',
    display: 'eslint-config-airbnb',
    color: yellow,
  },
  {
    name: 'standard',
    display: 'eslint-config-standard',
    color: green,
  },
];

export type ESLintConfig = 'airbnb' | 'standard';

export const ESLINT_PLUGIN_VUE_CONFIGS = [
  {
    name: 'recommended',
    display: 'plugin:vue/recommended',
    color: blue,
  },
  {
    name: 'strongly_recommended',
    display: 'plugin:vue/strongly-recommended',
    color: green,
  },
  {
    name: 'essential',
    display: 'plugin:vue/essential',
    color: yellow,
  },
];

export type ESLintPluginVueConfig = 'essential' | 'strongly_recommended' | 'recommended';

export const STYLELINT_CONFIGS = [
  {
    name: 'standard',
    display: 'stylelint-config-standard',
    color: green,
  },
  {
    name: 'recommended',
    display: 'stylelint-config-recommended',
    color: yellow,
  },
];

export type StylelintConfig = 'recommended' | 'standard';

export const LINTERS = [{
  name: 'eslint',
  selected: true,
}, {
  name: 'stylelint',
}, {
  name: 'commitlint',
  selected: true,
}, {
  name: 'husky',
  selected: true,
}, {
  name: 'lint-staged',
  selected: true,
}, {
  name: 'prettier',
}];

export type Linter = 'eslint' | 'stylelint' | 'commitlint' | 'husky'
| 'lint-staged' | 'prettier';
