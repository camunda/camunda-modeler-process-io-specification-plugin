const path = require('path');

const CamundaModelerWebpackPlugin = require('camunda-modeler-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './client/client.js',
  output: {
    path: path.resolve(__dirname, 'client'),
    filename: 'client-bundle.js'
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new CamundaModelerWebpackPlugin()
  ]
};
