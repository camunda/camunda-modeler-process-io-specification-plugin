import {
  is,
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';

import {
  createInputSpecificationGroup,
  createOutputSpecificationGroup
} from './props/process-io-groups';



/**
 * An extension that makes process IO mappings configurable via a new
 * properties tab.
 *
 * @param {didi.Injector} injector
 */
export default class ProcessIoExtensionProvider {
  constructor(propertiesPanel, injector) {
    this._injector = injector;
    propertiesPanel.registerProvider(this);
  }

  getGroups(element) {
    return groups => {
      if (!is(element, 'bpmn:Process') || is(element, 'bpmn:Participant') && !getProcessRef(element)) {
        return groups;
      }

      groups = groups.slice();

      groups.splice(1, 0,
        createInputSpecificationGroup(element, this._injector),
        createOutputSpecificationGroup(element, this._injector)
      );

      return groups;
    }
  }
}

ProcessIoExtensionProvider.$inject = [
  'propertiesPanel',
  'injector'
];


function getProcessRef(element) {
  const bo = getBusinessObject(element);

  return bo.processRef;
}
