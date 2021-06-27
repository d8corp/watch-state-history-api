import typescript from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'
import pkg from './package.json'

const def = {
  input: {
    index: 'src/index.ts',
    history: 'src/history.ts',
    decode: 'src/decode.ts',
    setSearch: 'src/setSearch.ts',
    parseUrl: 'src/parseUrl.ts',
  },
  external: [
    ...Object.keys(pkg.dependencies || {})
  ]
}

const exclude = [
  '**/*.test.ts'
]

export default [{
  ...def,
  output: {
    dir: './lib',
    entryFileNames: '[name]' + pkg.main.replace('index', ''),
    format: 'cjs',
  },
  plugins: [
    json(),
    typescript({
      typescript: require('typescript'),
      tsconfigOverride: {
        exclude,
      }
    }),
  ]
}, {
  ...def,
  output: {
    dir: './lib',
    entryFileNames: '[name]' + pkg.module.replace('index', ''),
    format: 'es',
  },
  plugins: [
    json(),
    typescript({
      typescript: require('typescript'),
      tsconfigOverride: {
        compilerOptions: {
          target: 'es6',
        },
        exclude,
      }
    }),
  ]
}]
