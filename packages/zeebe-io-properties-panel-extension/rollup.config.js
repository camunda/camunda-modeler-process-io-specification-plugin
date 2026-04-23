import pkg from './package.json' with { type: 'json' };


export default [
  {
    input: 'src/index.js',
    output: [
      {
        sourcemap: true,
        format: 'esm',
        file: pkg.exports['.']
      }
    ],
    external: [
      'bpmn-js-properties-panel',
      '@bpmn-io/properties-panel',
      'ids',
      'bpmn-js/lib/util/ModelUtil.js'
    ]
  }
];