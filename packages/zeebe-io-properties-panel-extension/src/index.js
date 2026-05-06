import PropertiesPanelIoExtensionProvider from './io-extension-provider.js';

export { default as externalParametersModdle } from './moddle/zeebe-external-parameters.js';

export default {
  __init__: [ 'propertiesPanelIoExtensionProvider' ],
  propertiesPanelIoExtensionProvider: [ 'type', PropertiesPanelIoExtensionProvider ]
};