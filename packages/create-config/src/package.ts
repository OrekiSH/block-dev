import { CommitLintConfigOptions } from './config/linter/commitlint';
import { ESLintConfigOptions } from './config/linter/eslint';
import { StyleLintConfigOptions } from './config/linter/stylelint';

export interface PackageJSONOptions
  extends ESLintConfigOptions,
  StyleLintConfigOptions,
  CommitLintConfigOptions {
  name?: string;
  version?: string;
  description?: string;
  husky?: boolean;
  lint_staged?: boolean;
  commitlint?: boolean;
  ts_esm?: boolean;
  license?: string;
  repository?: string;
  author?: string;
  homepage?: string;
  custom_scripts?: Record<string, string>;
  custom_dependencies?: Record<string, string>;
  custom_dev_dependencies?: Record<string, string>;
  custom_package_json_fields?: Record<string, any>;
  main?: boolean;
  editorconfig?: boolean;
  gitignore?: boolean;
}

export const useVue2 = (opts: PackageJSONOptions) => {
  const vue = opts?.vue2_essential
    || opts?.vue2_recommended
    || opts?.vue2_strongly_recommended;

  return vue;
};

export const useVue = (opts: PackageJSONOptions) => {
  const vue = useVue2(opts)
    || opts?.vue_essential
    || opts?.vue_recommended
    || opts?.vue_strongly_recommended;

  return vue;
};

export const genPackageJSON = (opts: PackageJSONOptions) => {
  // eslint
  const vue = useVue(opts);
  const airbnb = opts?.airbnb && !opts?.standard;
  const standard = opts?.standard && !opts?.airbnb;
  const eslint = opts?.airbnb || opts?.standard;

  // stylelint
  const style_standard = opts?.style_standard && !opts?.style_recommended;
  const style_recommended = opts?.style_recommended && !opts?.style_standard;
  const stylelint = opts?.style_recommended || opts?.style_standard;

  const {
    ts, scss, husky, lint_staged, commitlint, repository, main, name, prettier,
  } = opts || {};
  const eslintFiles = ['js', vue && 'vue', ts && 'ts'].filter(Boolean);
  const stylelintFiles = ['css', vue && 'vue', scss && 'scss,sass'].filter(Boolean);

  return {
    name: name || undefined,
    version: opts?.version || '0.1.0',
    description: opts?.description,
    private: main ? true : undefined,
    workspaces: main ? ['packages/*'] : undefined,
    main: 'lib/index.js',
    module: 'es/index.js',
    unpkg: 'dist/index.js',
    types: 'lib/index.d.ts',
    files: ['src', 'lib', 'dist', 'es'],
    keywords: [],
    authors: [opts?.author].filter(Boolean),
    repository: repository
      ? {
        type: 'git',
        url: repository,
      } : undefined,
    bugs: repository ? `${repository}/issues` : undefined,
    homepage: opts?.homepage,
    license: opts?.license,
    scripts: {
      ...opts?.custom_scripts,
      'lint:js': eslint ? 'eslint . --ignore-path .eslintignore' : undefined,
      'lint:style': stylelint ? 'stylelint . --ignore-path .stylelintignore' : undefined,
      'pre-commit': lint_staged ? 'lint-staged' : undefined,
      format: prettier ? 'prettier --write .' : undefined,
      prepare: husky
        ? [
          'test -e .husky && echo husky installed || husky install',
          'test -e .husky/pre-commit && echo pre-commit exists || npx husky add .husky/pre-commit \'npm run pre-commit\'',
          commitlint
            ? 'test -e .husky/commit-msg && echo commit-msg exists || npx husky add .husky/commit-msg \'npx --no-install commitlint --edit "$1"\''
            : undefined,
        ]
          .filter(Boolean)
          .join(' && ')
        : undefined,
      prepublishOnly: 'npm run build',
    },
    'lint-staged': lint_staged
      ? {
        [`*.{${eslintFiles.join(',')}}`]: eslint ? 'npm run lint:js' : undefined,
        [`*.{${stylelintFiles.join(',')}}`]: stylelint ? 'npm run lint:style' : undefined,
        '*.*': prettier ? 'npm run format' : undefined,
      }
      : undefined,
    dependencies: {
      ...opts?.custom_dependencies,
    },
    devDependencies: {
      ...opts?.custom_dev_dependencies,
      // babel
      '@babel/core': '^7.14.6',
      '@babel/preset-env': '^7.14.7',

      // eslint
      eslint: eslint ? '^7.30.0' : undefined,
      'eslint-plugin-import': eslint ? '^2.23.4' : undefined,

      'eslint-plugin-node': standard ? '^11.1.0' : undefined,
      'eslint-plugin-promise': standard ? '^5.1.0' : undefined,
      'eslint-config-standard': standard ? '^16.0.3' : undefined,
      'eslint-config-airbnb-base': airbnb ? '^14.2.1' : undefined,

      // vue
      'eslint-plugin-vue': vue ? '^7.13.0' : undefined,

      // typescript
      typescript: ts ? '^4.3.5' : undefined,
      '@typescript-eslint/eslint-plugin': ts && eslint ? '^4.28.4' : undefined,
      'eslint-config-standard-with-typescript': ts && standard ? '^20.0.0' : undefined,
      'eslint-config-airbnb-typescript': ts && airbnb ? '^12.3.1' : undefined,

      // stylelint
      stylelint: stylelint ? '^13.13.1' : undefined,
      'stylelint-order': opts?.rational_order ? '^4.1.0' : undefined,
      'stylelint-config-rational-order': opts?.rational_order ? '^0.1.2' : undefined,
      'stylelint-config-standard': style_standard ? '^22.0.0' : undefined,
      'stylelint-config-recommended': style_recommended ? '^5.0.0' : undefined,

      // scss
      'stylelint-scss': scss ? '^3.14.0' : undefined,

      // commitlint
      '@commitlint/cli': commitlint ? '^12.1.4' : undefined,
      '@commitlint/config-conventional': commitlint ? '^12.1.4' : undefined,

      // prettier
      prettier: prettier ? '^2.3.2' : undefined,
      'eslint-config-prettier': prettier ? '^8.3.0' : undefined,
      'eslint-plugin-prettier': prettier ? '^3.4.0' : undefined,
      'stylelint-config-prettier': prettier ? '^8.0.2' : undefined,
      'stylelint-prettier': prettier ? '^1.2.0' : undefined,

      // hooks
      husky: husky ? '^7.0.1' : undefined,
      'lint-staged': lint_staged ? '^11.0.0' : undefined,
    },
    publishConfig: {
      access: 'public',
    },
    ...opts.custom_package_json_fields,
  };
};

// eslint-disable-next-line arrow-body-style
export const genPackageJSONFile = (opts: PackageJSONOptions) => {
  return JSON.stringify(genPackageJSON(opts), null, 2);
};

export const genBabelConfigFile = () => JSON.stringify({
  presets: ['@babel/preset-env'],
}, null, 2);
