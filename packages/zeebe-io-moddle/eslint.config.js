import bpmnIoPlugin from 'eslint-plugin-bpmn-io';

const files = {
  build: [
    '*.js'
  ],
  test: [
    'test/**/*.js',
    'test/**/*.cjs'
  ]
};

export default [

  // build
  ...bpmnIoPlugin.configs.node.map(config => {

    return {
      ...config,
      files: files.build
    };
  }),

  // lib + test
  ...bpmnIoPlugin.configs.recommended.map(config => {

    return {
      ...config,
      ignores: files.build
    };
  }),

  // test
  ...bpmnIoPlugin.configs.mocha.map(config => {

    return {
      ...config,
      files: files.test
    };
  }),

  // support "with" import
  {
    languageOptions: {
      ecmaVersion: 2025
    }
  }
];