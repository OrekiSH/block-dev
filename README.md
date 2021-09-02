# block-dev

## @block-dev/create-config

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

### Options

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
  vue_essential?: boolean
  vue2_strongly_recommended?: boolean
  vue_strongly_recommended?: boolean
  vue2_recommended?: boolean
  vue_recommended?: boolean

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

### Usage

```ts
import { genConfigFiles } from '@block-dev/create-config';

genConfigFiles({
  main: true,
  ts: true,
  ts_esm: true,
  airbnb: true,
  husky: true,
  lint_staged: true,
  commitlint: true,
  // commitlint options
  scope: true,
  type_enum: true,
  scope_min: 3,
  subject_min: 5,
  // inject custom eslint rules
  eslint_rules: {
    '@typescript-eslint/naming-convention': 0,
  },
  license: 'MIT',
  author: 'OrekiSH <orekish@163.com> (https://github.com/OrekiSH)',
  repository: 'https://github.com/OrekiSH/block-dev',
});
```

## @block-dev/create-block

🔨 Scaffolding a well linted project

## Usage

```shell
npm init @block-dev/block@latest
# OR
yarn create @block-dev/block
# OR
pnpx @block-dev/create-block
```