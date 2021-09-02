import type { PackageJSONOptions } from '@block-dev/create-config';
import { Framework, Variant } from './frameworks';
import { ESLintConfig, Linter, StylelintConfig } from './linters';

export interface UserChoice {
  name: string
  overwrite: boolean
  framework: {
    name: Framework
  }
  variant: Variant
  linters: Linter[]
  eslintConfig?: ESLintConfig
  stylelintConfig?: StylelintConfig
}

export function resolveConfig(choice: UserChoice): PackageJSONOptions {
  const {
    variant = '', linters = [], eslintConfig, stylelintConfig,
  } = choice;

  const result: PackageJSONOptions = {
    name: choice.name,
    description: '',
    license: 'MIT',
    author: '',
    repository: '',
    ts: variant.includes('ts'),
    ts_esm: variant.includes('ts'),
    gitignore: true,
    husky: linters.includes('husky'),
    commitlint: linters.includes('commitlint'),
    lint_staged: linters.includes('lint-staged'),
  };

  if (eslintConfig && linters.includes('eslint')) {
    result[eslintConfig] = true;
  }

  if (result.commitlint) {
    result.scope = true;
    result.type_enum = true;
    result.scope_min = 3;
    result.subject_min = 5;
  }

  if (stylelintConfig && linters.includes('stylelint')) {
    result[`style_${stylelintConfig}`] = true;
  }

  return result;
}
