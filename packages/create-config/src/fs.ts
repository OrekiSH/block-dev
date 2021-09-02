import { genEditorConfigFile } from './config/editorconfig';
import { genEsmTSConfigFile, genTSConfigFile } from './config/tsconfig';
import {
  genBabelConfigFile, genPackageJSONFile, PackageJSONOptions, useVue,
} from './package';
import { genESLintConfigFile, genESLintIgnoreFile } from './config/linter/eslint';
import { genStyleLintConfigFile, genStyleLintIgnoreFile } from './config/linter/stylelint';
import { genCommitLintConfigFile } from './config/linter/commitlint';
import { genGitignoreFile } from './config/gitignore';
import { genPrettierConfigFile, genPrettierIgnoreFile } from './config/linter/prettier';

const fs = require('fs');

const log = (err: Error) => {
  if (err) console.log(err);
};

// eslint-disable-next-line import/prefer-default-export
export const genConfigFiles = (opts: PackageJSONOptions) => {
  fs.writeFile('package.json', genPackageJSONFile(opts), log);

  if (opts?.editorconfig !== false) {
    fs.writeFile('.editorconfig', genEditorConfigFile(), log);
  }
  if (opts?.gitignore !== false) {
    fs.writeFile('.gitignore', genGitignoreFile(), log);
  }

  if (useVue(opts)) {
    fs.writeFile('babel.config.json', genBabelConfigFile(), log);
  }

  // typescript
  if (opts?.ts) {
    fs.writeFile('tsconfig.json', genTSConfigFile(), log);
    if (opts?.ts_esm) {
      fs.writeFile('tsconfig.es.json', genEsmTSConfigFile(), log);
    }
  }

  // eslint
  const eslint = opts?.airbnb || opts?.standard;
  if (eslint) {
    fs.writeFile('.eslintrc', genESLintConfigFile(opts), log);
    fs.writeFile('.eslintignore', genESLintIgnoreFile(), log);
  }

  // stylelint
  const stylelint = opts?.style_recommended || opts?.style_standard;
  if (stylelint) {
    fs.writeFile('stylelint.config.json', genStyleLintConfigFile(opts), log);
    fs.writeFile('.stylelintignore', genStyleLintIgnoreFile(), log);
  }

  // commitlint
  if (opts?.commitlint) {
    fs.writeFile('.commitlintrc.json', genCommitLintConfigFile(opts), log);
  }

  if (opts?.prettier) {
    fs.writeFile('.prettierrc.json', genPrettierConfigFile(), log);
    fs.writeFile('.prettierignore', genPrettierIgnoreFile(), log);
  }
};
