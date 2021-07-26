import typescript from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'
import glob from 'glob'

import pkg from './package.json'

const input = glob.sync('{src/index.ts,src/**/index.ts}')
const external = Object.keys(pkg.dependencies || {})

const exclude = [
  'src/**/*.test.ts',
  'src/**/*.test.tsx',
]

export default [
  {
    input,
    external,
    output: {
      dir: 'lib',
      entryFileNames: '[name].js',
      format: 'cjs',
      preserveModules: true,
    },
    plugins: [
      json(),
      typescript({
        rollupCommonJSResolveHack: false,
        clean: true,
        tsconfigOverride: {exclude},
      }),
    ]
  },
  {
    input,
    external,
    output: {
      dir: 'lib',
      entryFileNames: '[name].es6.js',
      format: 'es',
      preserveModules: true,
      preserveModulesRoot: 'src'
    },
    plugins: [
      json(),
      typescript({
        rollupCommonJSResolveHack: false,
        clean: true,
        tsconfigOverride: {
          exclude,
          compilerOptions: {
            target: 'es6',
          }
        }
      }),
    ]
  }
]
