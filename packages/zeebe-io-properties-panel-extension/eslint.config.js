import bpmnIoPlugin from 'eslint-plugin-bpmn-io';

const files = {
  ignored: [
    'dist'
  ],
  build: [
    '*.js',
    '*.cjs'
  ],
  test: [
    'test/**/*.js',
    'test/**/*.cjs'
  ]
};

export default [

  {
    ignores: files.ignored
  },

  // build
  ...bpmnIoPlugin.configs.node.map(config => {

    return {
      ...config,
      files: files.build
    };
  }),

  // lib + test
  ...bpmnIoPlugin.configs.browser.map(config => {

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