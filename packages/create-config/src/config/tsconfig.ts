export const genTSConfig = () => ({
  compilerOptions: {
    target: 'es6',
    module: 'commonjs',
    moduleResolution: 'node',
    strict: true,
    resolveJsonModule: true,
    esModuleInterop: true,
    declaration: true,
    skipLibCheck: true,
    outDir: 'lib',
  },
  include: ['src/**/*'],
  exclude: ['node_modules', '**/*.test.ts', '**/lib/*', '**/es/*'],
});

export const genEsmTSConfig = () => ({
  extends: './tsconfig.json',
  compilerOptions: {
    outDir: 'es',
    module: 'esnext',
  },
});

export const genViteTsConfig = () => ({
  compilerOptions: {
    target: 'esnext',
    useDefineForClassFields: true,
    module: 'esnext',
    moduleResolution: 'node',
    strict: true,
    jsx: 'preserve',
    sourceMap: true,
    resolveJsonModaule: true,
    esModuleInterop: true,
    lib: ['esnext', 'dom'],
    types: ['vite-plugin-pages/client', 'vite-plugin-vue-layouts/client'],
  },
  include: ['src/**/*.ts', 'src/**/*.d.ts', 'src/**/*.tsx', 'src/**/*.vue'],
});
