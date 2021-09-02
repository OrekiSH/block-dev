<h1 align="center">@block-dev/create-block</h1>

🔨 CLI to create a well linted project

## Usage

Config in this package is created by following code:

```js
import { genConfigFiles } from '@block-dev/create-config';

genConfigFiles({
  name: '@block-dev/create-block',
  description: '🔨 CLI to create a well linted project',
  license: 'MIT',
  author: 'OrekiSH <orekish@163.com> (https://github.com/OrekiSH)',
  repository: 'https://github.com/OrekiSH/block-dev',
  ts: true,
  ts_esm: true,
  editorconfig: false,
  gitignore: false,
  custom_dev_dependencies: {
    'npm-run-all': '^4.1.5',
    '@types/prompts': '^2.0.14',
  },
  custom_dependencies: {
    kolorist: '^1.5.0',
    minimist: '^1.2.5',
    prompts: '^2.4.1',
    '@block-dev/create-config': 'latest'
  },
  custom_scripts: {
    build: 'npm-run-all --parallel build:*',
    'build:es': 'tsc --p ./tsconfig.es.json',
    'build:cjs': 'tsc',
    'lint:js': 'eslint . --ignore-path .eslintignore',
  },
});
```
