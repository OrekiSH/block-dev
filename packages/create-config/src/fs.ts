import path from 'path';
import { genEditorConfigFile } from './config/editorconfig';
import { genEsmTSConfig, genTSConfig, genViteTsConfig } from './config/tsconfig';
import { genPackageJSON, PackageJSONOptions, useVue3 } from './package';
import { genESLintConfig, genESLintIgnoreFile } from './config/linter/eslint';
import { genStylelintConfig, genStylelintIgnoreFile } from './config/linter/stylelint';
import { genCommitlintConfig } from './config/linter/commitlint';
import { genGitignoreFile } from './config/gitignore';
import { genPrettierConfig, genPrettierIgnoreFile } from './config/linter/prettier';
import { genLegacyVueTsxBabelConfig, genVueTsxBabelConfig } from './config/babel';
import { genLegacyViteConfigFile, genViteConfigFile } from './config/vite/config';
import { genLegacyViteMainFile, genViteMainFile } from './config/vite/main';
import {
  genDefaultAppFile,
  genDefaultHtmlFile,
  genDefaultLayoutFile,
  genDefaultStoreFile,
  genEnvDtsFile,
  genPlaceholderPageFile,
} from './config/vite/default';

const fs = require('fs');

const log = (err: Error) => {
  if (err) console.log(err);
};

export const genJSONFile = (obj: Record<string, any>) => JSON.stringify(obj, null, 2);

export const genCJSFile = (obj: Record<string, any>) => `
module.exports = ${JSON.stringify(obj, null, 2)}
`.trim();

export const genConfigFiles = (opts: PackageJSONOptions) => {
  fs.writeFile('package.json', genJSONFile(genPackageJSON(opts)), log);

  if (opts?.editorconfig !== false) {
    fs.writeFile('.editorconfig', genEditorConfigFile(), log);
  }
  if (opts?.gitignore !== false) {
    fs.writeFile('.gitignore', genGitignoreFile(), log);
  }

  if (opts?.vite) {
    const vue3 = useVue3(opts);
    // babel
    const config = vue3 ? genVueTsxBabelConfig() : genLegacyVueTsxBabelConfig();
    fs.writeFile('.babelrc', genJSONFile(config), log);

    // vite.config.ts
    const viteConfig = vue3
      ? genViteConfigFile(opts?.externals)
      : genLegacyViteConfigFile(opts?.externals);
    fs.writeFile('vite.config.ts', viteConfig, log);

    // index.html
    fs.writeFile('index.html', genDefaultHtmlFile(), log);

    const root = path.join(process.cwd(), 'src');
    if (!fs.existsSync(root)) {
      fs.mkdirSync(root);
    }
    // src/main.ts
    const main = vue3 ? genViteMainFile() : genLegacyViteMainFile();
    fs.writeFile(path.join(root, 'main.ts'), main, log);

    // src/env.d.ts
    fs.writeFile(path.join(root, 'env.d.ts'), genEnvDtsFile(), log);

    // src/App.vue
    fs.writeFile(path.join(root, 'App.vue'), genDefaultAppFile(), log);

    // src/pages
    const pages = path.join(root, 'pages');
    if (!fs.existsSync(pages)) {
      fs.mkdirSync(pages);
    }
    fs.writeFile(path.join(pages, 'index.vue'), genPlaceholderPageFile('index'), log);

    // src/components
    const components = path.join(root, 'components');
    if (!fs.existsSync(components)) {
      fs.mkdirSync(components);
    }

    // src/layouts
    const layouts = path.join(root, 'layouts');
    if (!fs.existsSync(layouts)) {
      fs.mkdirSync(layouts);
    }
    fs.writeFile(path.join(layouts, 'default.vue'), genDefaultLayoutFile(), log);

    // src/store
    const store = path.join(root, 'store');
    if (!fs.existsSync(store)) {
      fs.mkdirSync(store);
    }
    fs.writeFile(path.join(store, 'index.ts'), genDefaultStoreFile(), log);
  }

  // typescript
  if (opts?.ts) {
    const config = opts?.vite ? genViteTsConfig() : genTSConfig();
    fs.writeFile('tsconfig.json', genJSONFile(config), log);
    if (opts?.ts_esm) {
      fs.writeFile('tsconfig.es.json', genJSONFile(genEsmTSConfig()), log);
    }
  }

  // eslint
  const eslint = opts?.airbnb || opts?.standard;
  if (eslint) {
    fs.writeFile('.eslintrc', genJSONFile(genESLintConfig(opts)), log);
    fs.writeFile('.eslintignore', genESLintIgnoreFile(), log);
  }

  // stylelint
  const stylelint = opts?.style_recommended || opts?.style_standard;
  if (stylelint) {
    fs.writeFile('.stylelintrc', genJSONFile(genStylelintConfig(opts)), log);
    fs.writeFile('.stylelintignore', genStylelintIgnoreFile(), log);
  }

  // commitlint
  if (opts?.commitlint) {
    fs.writeFile('commitlint.config.js', genCJSFile(genCommitlintConfig(opts)), log);
  }

  if (opts?.prettier) {
    fs.writeFile('.prettierrc', genJSONFile(genPrettierConfig()), log);
    fs.writeFile('.prettierignore', genPrettierIgnoreFile(), log);
  }
};
