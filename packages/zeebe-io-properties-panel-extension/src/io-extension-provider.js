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

      // insert after documentation or general group, or at second position
      const insertIndex = (
        groups.findIndex(e => e.id === 'documentation') + 1 ||
        groups.findIndex(e => e.id === 'general') + 1 ||
        1
      );

      return [
        ...groups.slice(0, insertIndex),
        createInputSpecificationGroup(element, this._injector),
        createOutputSpecificationGroup(element, this._injector),
        ...groups.slice(insertIndex)
      ];
    };
  }
}


ProcessIoExtensionProvider.$inject = [
  'propertiesPanel',
  'injector'
];