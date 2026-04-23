import {
  createInputSpecificationGroup,
  createOutputSpecificationGroup
} from './props/process-io-groups.js';

import {
  canHaveIoSpecification
} from './process-io-helper.js';

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
      if (!canHaveIoSpecification(element)) {
        return groups;
      }

      const insertIndex = findInsertIndex(groups);

      return [
        ...groups.slice(0, insertIndex),
        createInputSpecificationGroup(element, this._injector),
        createOutputSpecificationGroup(element, this._injector),
        ...groups.slice(insertIndex)
      ];
    };
  }
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