import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import pkg from './package.json';


export default [
  {
    input: 'esnext/index.js',
    output: {
      name: 'Wod',
      file: pkg.main,
      format: 'umd',
      exports: 'named'
    },
    plugins: [
      babel({
        exclude: ['node_modules/**'],
        runtimeHelpers: true
      }),
      uglify()
    ]
  },
  {
    input: 'esnext/index.js',
    output: [
      {
        file: pkg.module,
        format: 'es'
      }
    ],
    plugins: [
      babel({
        exclude: ['node_modules/**'],
        runtimeHelpers: true
      })
    ]
  }
];
