<h1 align="center">@block-dev/create-config</h1>

🔨 Utilities to create a well linted project

### Featrues

- eslint: standard/airbnb
- stylelint: standard/recommended
- prettier
- commitlint
- husky
- lint-staged
- typescript
- vue2/vue3: eslint-vue
- vite

## Options

```ts
interface {
  name: string // name in package.json
  version?: string // version in package.json
  description?: string // description in package.json

  main?: boolean // if is main project in monorepo

  /* husky & commitlint */
  husky?: boolean // if use husky or not
  lint_staged?: boolean // if use lint-staged or not
  commitlint?: boolean // if use commitlint or not

  /* typescript */
  ts?: boolean // if use typescript or not
  ts_esm?: boolean // if add tsconfig.es.json or not

  /* eslint */
  standard?: boolean // if use eslint-config-standard or not
  airbnb?: boolean // if use eslint-config-airbnb or not

  /* stylelint */
  scss?: boolean // if use stylelint-scss plugin or not
  style_standard?: boolean // if use stylelint-config-standard or not
  style_recommended?: boolean // if use stylelint-config-recommended or not
  rational_order?: boolean // if use stylelint-config-rational-order or not

  /* eslint-vue */
  vue2_essential?: boolean // if use eslint-plugin-vue or not
  vue3_essential?: boolean
  vue2_strongly_recommended?: boolean
  vue3_strongly_recommended?: boolean
  vue2_recommended?: boolean
  vue3_recommended?: boolean

  /* vite */
  vite?: boolean

  /* repository */
  license?: string // license in package.json
  repository?: string // repository in package.json
  author?: string // author in package.json
  homepage?: string // homepage in package.json

  /* custom */
  custom_scripts?: Record<string, string> // append fields in scripts filed
  custom_dependencies?: Record<string, string> // append fields in dependencies filed
  custom_dev_dependencies?: Record<string, string> // append fields in devDependencies filed
  custom_package_json_fields: Record<string, any> // overwrite fields in package.json
}
```

## Usage

Config in this package is created by following code:

```js
import { genConfigFiles } from './src';

genConfigFiles({
  name: '@block-dev/create-config',
  description: '🔨 Utilities to create a well linted project',
  license: 'MIT',
  author: 'OrekiSH <orekish@163.com> (https://github.com/OrekiSH)',
  repository: 'https://github.com/OrekiSH/block-dev',
  ts: true,
  ts_esm: true,
  editorconfig: false,
  gitignore: false,
  custom_dev_dependencies: {
    'npm-run-all': '^4.1.5',
  },
  custom_scripts: {
    build: 'npm-run-all --parallel build:*',
    'build:es': 'tsc --p ./tsconfig.es.json',
    'build:cjs': 'tsc',
    'lint:js': 'eslint . --ignore-path .eslintignore',
  },
});
```
