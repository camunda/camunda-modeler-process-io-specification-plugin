import {
  inject,
  bootstrapPropertiesPanel,
  insertCoreStyles,
  insertBpmnStyles,
  enableLogging,
  getBpmnJS
} from '../TestHelper.js';

import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  ZeebePropertiesProviderModule
} from 'bpmn-js-properties-panel';

import PropertiesPanelExtensionModule from '../../src/index.js';

import ZeebeBehaviorsModule from 'camunda-bpmn-js-behaviors/lib/camunda-cloud/index.js';

import ZeebeModdle from 'zeebe-bpmn-moddle/resources/zeebe.json';
import ZeebeIoModdle from 'zeebe-io-moddle/resources/ccon.json';

import ioDiagram from './ioSpecification.bpmn';


const singleStart = window.__env__ && window.__env__.SINGLE_START;

insertCoreStyles();
insertBpmnStyles();


describe('properties-panel-extension', function() {

  beforeEach(bootstrapPropertiesPanel(ioDiagram, {
    additionalModules: [
      BpmnPropertiesPanelModule,
      BpmnPropertiesProviderModule,
      ZeebePropertiesProviderModule,
      ZeebeBehaviorsModule,
      PropertiesPanelExtensionModule
    ],
    moddleExtensions: {
      zeebe: ZeebeModdle,
      ccon: ZeebeIoModdle
    }
  }));


  beforeEach(function() {
    enableLogging(getBpmnJS(), singleStart);
  });


  (singleStart ? it.only : it)('should use extension', inject(async function() {


  }));
});