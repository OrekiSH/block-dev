import {
  yellow, green,
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

export const STYLELINT_CONFIGS = [
  {
    name: 'recommended',
    display: 'stylelint-config-recommended',
    color: yellow,
  },
  {
    name: 'standard',
    display: 'stylelint-config-standard',
    color: green,
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
