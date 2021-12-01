import {
  getBusinessObject,
  is
} from 'bpmn-js/lib/util/ModelUtil';

import elementHelper from 'bpmn-js-properties-panel/lib/helper/ElementHelper';
import cmdHelper from 'bpmn-js-properties-panel/lib/helper/CmdHelper';

import Ids from 'ids';

import extensionElementsEntry from 'bpmn-js-properties-panel/lib/provider/camunda/parts/implementation/ExtensionElements';

import {
  isIoProperty,
  parseIoProperty,
  createIoProperty
} from '../process-io-helper';

import {
  getExtensionElements
} from 'bpmn-js-properties-panel/lib/helper/ExtensionElementsHelper';


const ids = new Ids([ 16, 36, 1 ]);

function getProperties(element) {
  const propertiesParent = getInputOutput(element);

  return propertiesParent ? propertiesParent.get('values') : [];
}

function getInputOutput(element) {
  const bo = getBusinessObject(element);

  const properties = getExtensionElements(bo, 'camunda:Properties') || [];

  if (properties.length) {
    return properties[0];
  }

  return null;
}

function getIoProperties(element, type) {
  const properties = getProperties(element);

  return (
    properties
      .filter(property => isIoProperty(property))
      .filter(property => parseIoProperty(property).type === type)
  );
}

function getInputParameters(element) {
  return getIoProperties(element, 'input');
}

function getOutputParameters(element) {
  return getIoProperties(element, 'output');
}

function getInputParameter(element, idx) {
  return getInputParameters(element)[idx];
}

function getOutputParameter(element, idx) {
  return getOutputParameters(element)[idx];
}


function createElement(type, parent, factory, properties) {
  return elementHelper.createElement(type, properties, parent, factory);
}

function createCamundaProperties(parent, bpmnFactory, properties) {
  return createElement('camunda:Properties', parent, bpmnFactory, properties);
}


/**
 * Defines the input/output tab contents.
 */
function inputOutput(element, bpmnFactory, translate) {

  var processBo = getBusinessObject(element);

  if (is(processBo, 'bpmn:Participant')) {
    processBo = processBo.processRef;
  }

  function newElement(type) {

    return function(element, extensionElements, value) {
      var commands = [];

      var camundaProperties = getInputOutput(processBo);
      if (!camundaProperties) {
        camundaProperties = createCamundaProperties(extensionElements, bpmnFactory, {
          values: []
        });

        commands.push(cmdHelper.addAndRemoveElementsFromList(
          element,
          extensionElements,
          'values',
          'extensionElements',
          [ camundaProperties ],
          []
        ));
      }

      var newElem = createIoProperty(bpmnFactory, {
        type,
        name: `var_${ids.next()}`,
        dataType: 'String',
        description: ''
      });

      commands.push(cmdHelper.addElementsTolist(element, camundaProperties, 'values', [ newElem ]));

      return commands;
    };
  }

  function removeElement(type) {
    return function(element, extensionElements, value, idx) {

      var properties = getIoProperties(processBo, type);
      var property = properties[idx];

      var camundaProperties = getInputOutput(processBo);

      var removePropertyCommand = cmdHelper.removeElementsFromList(
        element, camundaProperties, 'values', null, [ property ]
      );

      return [
        removePropertyCommand
      ];
    };
  }

  function setOptionLabelValue(getter) {
    return function(element, node, option, property, value, idx) {
      var parameter = getter(processBo, idx);

      var ioProperty = parseIoProperty(parameter);

      option.text = `${ioProperty.name} : ${ioProperty.dataType}`;
    };
  };


  // input parameters //////////////////////////////

  var inputEntry = extensionElementsEntry(element, bpmnFactory, {
    id: 'process-io-inputs',
    label: 'Inputs',
    modelProperty: 'name',
    prefix: 'Input',
    resizable: true,

    businessObject: processBo,

    createExtensionElement: newElement('input'),
    removeExtensionElement: removeElement('input'),

    getExtensionElements: function(element) {
      return getInputParameters(processBo);
    },

    onSelectionChange: function(element, node, event, scope) {
      outputEntry && outputEntry.deselect(element, node);
    },

    setOptionLabelValue: setOptionLabelValue(getInputParameter)

  }, translate);


  // output parameters ///////////////////////////

  var outputEntry = extensionElementsEntry(element, bpmnFactory, {
    id: 'process-io-outputs',
    label: 'Outputs',
    modelProperty: 'name',
    prefix: 'Output',
    resizable: true,

    businessObject: processBo,

    createExtensionElement: newElement('output'),
    removeExtensionElement: removeElement('output'),

    getExtensionElements: function(element) {
      return getOutputParameters(processBo);
    },

    onSelectionChange: function(element, node, event, scope) {
      inputEntry.deselect(element, node);
    },

    setOptionLabelValue: setOptionLabelValue(getOutputParameter)

  }, translate);


  function getSelectedParameter(element, node) {
    var inputOption = inputEntry.getSelected(element, node);

    if (inputOption && inputOption.idx !== -1) {
      return getInputParameter(processBo, inputOption.idx);
    }

    var outputOption = outputEntry.getSelected(element, node);

    if (outputOption && outputOption.idx !== -1) {
      return getOutputParameter(processBo, outputOption.idx);
    }

    return null;
  };


  return {
    getSelectedParameter,
    entries: [
      inputEntry,
      outputEntry
    ]
  };

};


/**
 * Defines the two lists displaying input and output mappings.
 *
 * @return {Object}
 */
export default function processIoProps(group, element, injector) {

  var {
    entries,
    getSelectedParameter
  } = injector.invoke(inputOutput, null, { element });

  group.entries = group.entries.concat(entries);

  return {
    getSelectedParameter
  };

}
