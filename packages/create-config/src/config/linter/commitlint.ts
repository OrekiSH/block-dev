import { LintRule } from './eslint';

export type CommitLintConfigOptions = Partial<{
  scope: boolean;
  type_enum: boolean;
  scope_min: number;
  subject_min: number;
  commitlint_rules: Record<string, LintRule>;
}>;

export const genCommitLintConfig = (opts: CommitLintConfigOptions = {}) => {
  const types = [
    'build',
    'ci',
    'docs',
    'feat',
    'fix',
    'perf',
    'refactor',
    'release',
    'revert',
    'style',
    'test',
  ];

  return {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'scope-empty': opts?.scope ? [2, 'never'] : undefined,
      'type-enum': opts?.type_enum ? [2, 'always', types] : undefined,
      'scope-min-length': opts?.scope_min ? [2, 'always', opts?.scope_min] : undefined,
      'subject-min-length': opts?.subject_min ? [2, 'always', opts?.subject_min] : undefined,
    },
  };
};

export const genCommitLintConfigFile = (opts = {}) => (
  JSON.stringify(genCommitLintConfig(opts), null, 2)
);
