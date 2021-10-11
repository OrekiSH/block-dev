import { LintRule } from './eslint';

export type StylelintConfigOptions = Partial<{
  scss: boolean;
  style_standard: boolean;
  style_recommended: boolean;
  rational_order: boolean;
  stylelint_rules: Record<string, LintRule>;
  prettier: boolean;
}>;

export const genStylelintConfig = (opts: StylelintConfigOptions = {}) => {
  const { scss, prettier } = opts || {};
  const recommended = opts?.style_recommended && !opts?.style_standard;
  const standard = opts?.style_standard && !opts?.style_recommended;

  return {
    extends: [
      standard && 'stylelint-config-standard',
      recommended && 'stylelint-config-recommended',
      opts.rational_order && 'stylelint-config-rational-order',
      prettier && 'stylelint-config-prettier',
    ].filter(Boolean),

    plugins: [
      scss && 'stylelint-scss',
      prettier && 'stylelint-prettier',
    ].filter(Boolean),

    rules: {
      'at-rule-no-unknown': scss ? null : undefined,
      'scss/at-rule-no-unknown': scss ? true : undefined,
      'no-invalid-position-at-import-rule': scss ? null : undefined,
    },
  };
};

export const genStylelintIgnoreFile = () => `
node_modules
dist
lib
es
`.trim();
