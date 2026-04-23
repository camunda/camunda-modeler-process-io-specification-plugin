import {
  registerCloudBpmnJSPlugin,
  registerCloudBpmnJSModdleExtension
} from 'camunda-modeler-plugin-helpers';

import propertiesPanelExtensionModule from 'zeebe-io-properties-panel-extension';

import ioModdle from 'zeebe-io-moddle/resources/ccon.json' with { type: 'json' };

registerCloudBpmnJSPlugin(propertiesPanelExtensionModule);

registerCloudBpmnJSModdleExtension(ioModdle);
