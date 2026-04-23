// configures browsers to run test against
// any of [ 'ChromeHeadless', 'Chrome', 'Firefox' ]
const browsers = (process.env.TEST_BROWSERS || 'ChromeHeadless').split(',');

const singleStart = process.env.SINGLE_START;

// use puppeteer provided Chrome for testing
process.env.CHROME_BIN = require('puppeteer').executablePath();

const suite = 'test/testBundle.js';

module.exports = function(karma) {

  const config = {

    frameworks: [
      'webpack',
      'mocha'
    ],

    files: [
      suite
    ],

    preprocessors: {
      [ suite ]: [ 'webpack', 'env' ]
    },

    reporters: [ 'progress' ],

    browsers,

    singleRun: true,
    autoWatch: false,

    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.css|\.bpmn$/,
            type: 'asset/source'
          },
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                plugins: [
                  [ '@babel/plugin-transform-react-jsx', {
                    'importSource': '@bpmn-io/properties-panel/preact',
                    'runtime': 'automatic'
                  } ]
                ]
              }
            }
          }
        ]
      },
      resolve: {
        mainFields: [
          'browser',
          'module',
          'main'
        ],
        alias: {
          'preact': '@bpmn-io/properties-panel/preact',
          'react': '@bpmn-io/properties-panel/preact/compat',
          'react-dom': '@bpmn-io/properties-panel/preact/compat'
        },
        modules: [
          'node_modules'
        ]
      },
      devtool: 'eval-source-map'
    }
  };

  if (singleStart) {
    config.browsers = [].concat(config.browsers, 'Debug');
    config.envPreprocessor = [].concat(config.envPreprocessor || [], 'SINGLE_START');
  }

  karma.set(config);
};
