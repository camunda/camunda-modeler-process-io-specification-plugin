import {
  createToolInputsGroup
} from './props/process-io-groups.js';

import { getBusinessObject, is } from 'bpmn-js/lib/util/ModelUtil.js';

// ensure we load after element templates
const EVEN_LOWER_PRIORITY = 299;

/**
 * An extension that makes process IO mappings configurable via a new
 * properties tab.
 *
 * @param {import('didi').Injector} injector
 */
export default class ProcessIoExtensionProvider {
  constructor(propertiesPanel, injector) {
    this._injector = injector;

    propertiesPanel.registerProvider(EVEN_LOWER_PRIORITY, this);
  }

  getGroups(element) {
    return groups => {
      const result = groups.slice();

      // "Tool inputs" group for start events and AHSP children
      if (isToolInputTarget(element)) {
        const insertIndex = findInsertIndex(result);
        result.splice(insertIndex, 0, createToolInputsGroup(element, this._injector));
      }

      return result;
    };
  }
}

function isToolInputTarget(element) {
  const bo = getBusinessObject(element);

  if (is(element, 'bpmn:StartEvent') && is(bo.$parent, 'bpmn:Process')) {
    return true;
  }

  if (is(element, 'bpmn:FlowNode') && is(bo.$parent, 'bpmn:AdHocSubProcess')) {
    return true;
  }

  return false;
}

function findInsertIndex(groups) {

  let afterGroups = [ 'general', 'documentation', 'general', 'ElementTemplates__Template' ];
  let beforeGroups = [ 'inputs', 'outputs', 'ElementTemplates__CustomProperties-output' ];

  let insertBefore = null;
  let insertAfter = 0;

  for (let i = groups.length - 1; i >= 0; i--) {

    const group = groups[i];

    // select last before group in list
    if (beforeGroups.includes(group.id)) {
      insertBefore = i;
    }

    // find first after group in list
    if (afterGroups.includes(group.id)) {
      insertAfter = i;
      break;
    }
  }

  if (insertBefore === null) {
    return insertAfter + 1;
  }

  return insertBefore;
}

ProcessIoExtensionProvider.$inject = [
  'propertiesPanel',
  'injector'
];