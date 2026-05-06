import {
  registerCloudBpmnJSPlugin,
  registerCloudBpmnJSModdleExtension
} from 'camunda-modeler-plugin-helpers';

import propertiesPanelExtensionModule, { externalParametersModdle } from 'zeebe-io-properties-panel-extension';

registerCloudBpmnJSPlugin(propertiesPanelExtensionModule);

registerCloudBpmnJSModdleExtension(externalParametersModdle);
