export type ESLintConfigOptions = Partial<{
  vue2_essential: boolean;
  vue3_essential: boolean;
  vue2_strongly_recommended: boolean;
  vue3_strongly_recommended: boolean;
  vue2_recommended: boolean;
  vue3_recommended: boolean;

  ts: boolean;

  standard: boolean;
  airbnb: boolean;
  eslint_rules: Record<string, LintRule>;
  prettier?: boolean;

  main: boolean;
}>;

export type LintRule =
  | string
  | number
  | [string, Record<string, boolean | string | string[]>]
  | [number, Record<string, boolean | string | string[]>];

export const genESLintConfig = (opts: ESLintConfigOptions = {}) => {
  const isAirbnb = opts?.airbnb && !opts?.standard;
  const isStandard = opts?.standard && !opts?.airbnb;
  const { ts, main, prettier } = opts || {};

  return {
    env: {
      browser: true,
      es6: true,
      node: true,
      jest: true,
    },
    extends: [
      opts?.vue2_essential && 'plugin:vue/essential',
      opts?.vue3_essential && 'plugin:vue/vue3-essential',
      opts?.vue2_strongly_recommended && 'plugin:vue/strongly-recommended',
      opts?.vue3_strongly_recommended && 'plugin:vue/vue3-strongly-recommended',
      opts?.vue2_recommended && 'plugin:vue/recommended',
      opts?.vue3_recommended && 'plugin:vue/vue3-recommended',

      isAirbnb && !ts && 'airbnb-base',
      isStandard && !ts && 'standard',

      isAirbnb && ts && 'airbnb-typescript/base',
      isStandard && ts && 'standard-with-typescript',

      prettier && 'prettier',
    ].filter(Boolean),
    plugins: prettier ? ['prettier'] : undefined,
    parserOptions: {
      // eslint-disable-next-line no-nested-ternary
      project: ts
        ? main
          ? ['./tsconfig.json', './packages/*/tsconfig.json']
          : './tsconfig.json'
        : undefined,
    },
    rules: {},
  };
};

export const genESLintIgnoreFile = () => `
node_modules
dist
lib
es
`.trim();
