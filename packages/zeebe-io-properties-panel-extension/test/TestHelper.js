import TestContainer from 'mocha-test-container-support';

import {
  bootstrapBpmnJS,
  insertCSS
} from 'bpmn-js/test/helper/index.js';

import Modeler from 'bpmn-js/lib/Modeler.js';

import PropertiesPanelCSS from '@bpmn-io/properties-panel/dist/assets/properties-panel.css';
import TestCSS from './test.css';

import DiagramJsCSS from 'bpmn-js/dist/assets/diagram-js.css';
import BpmnJsCSS from 'bpmn-js/dist/assets/bpmn-js.css';
import BpmnFontCSS from 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';


export * from 'bpmn-js/test/helper/index.js';


export function bootstrapPropertiesPanel(diagram, options, locals) {
  return async function() {

    insertBpmnStyles();
    insertCoreStyles();

    const modelerContainer = document.createElement('div');
    modelerContainer.classList.add('modeler-container');

    const propertiesContainer = document.createElement('div');
    propertiesContainer.classList.add('properties-container');

    const testContainer = TestContainer.get(this);

    testContainer.appendChild(modelerContainer);
    testContainer.appendChild(propertiesContainer);

    const {
      propertiesPanel = {},
      ...otherOptions
    } = options;

    const actualOptions = {
      propertiesPanel: {
        ...propertiesPanel,
        parent: propertiesContainer
      },
      ...otherOptions,
      container: modelerContainer
    };

    // (1) create modeler + import diagram
    return bootstrapBpmnJS(Modeler, diagram, actualOptions, locals).call(this);
  };
}

export function insertCoreStyles() {
  insertCSS('properties-panel.css', PropertiesPanelCSS);
  insertCSS('test.css', TestCSS);
}

export function insertBpmnStyles() {
  insertCSS('diagram.css', DiagramJsCSS);
  insertCSS('bpmn-js.css', BpmnJsCSS);
  insertCSS('bpmn-font.css', BpmnFontCSS);
}

export function bootstrapModeler(diagram, options, locals) {
  return bootstrapBpmnJS(Modeler, diagram, options, locals);
}