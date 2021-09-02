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

export const genTSConfigFile = () => JSON.stringify(genTSConfig(), null, 2);
export const genEsmTSConfigFile = () => JSON.stringify(genEsmTSConfig(), null, 2);
