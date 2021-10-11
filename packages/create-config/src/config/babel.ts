const PRESET_ENV = '@babel/preset-env';
const PRESET_TS = '@babel/preset-typescript';
const PLUGIN_RUNTIME = '@babel/plugin-transform-runtime';

export const genDefaultBabelConfig = () => ({
  presets: [PRESET_ENV],
});

// vue3 tsx
export const genVueTsxBabelConfig = () => ({
  presets: [PRESET_ENV, PRESET_TS],
  plugins: [
    ['@vue/babel-plugin-jsx', { transformOn: true }],
    PLUGIN_RUNTIME,
  ],
});

// vue2 tsx
export const genLegacyVueTsxBabelConfig = () => ({
  presets: [PRESET_ENV, PRESET_TS, '@vue/babel-preset-jsx'],
  plugins: [PLUGIN_RUNTIME],
});
