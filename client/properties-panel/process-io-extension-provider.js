import inherits from 'inherits';

import CamundaPropertiesProvider from
  'bpmn-js-properties-panel/lib/provider/camunda/CamundaPropertiesProvider';

import {
  is,
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';

import processIoProps from './props/process-io-props';
import processIoEntryProps from './props/process-io-entry-props';

import {
  parseIoProperty
} from './process-io-helper';


function getIoParameterLabel(param) {

  const { type } = parseIoProperty(param);

  if (type === 'input') {
    return 'Input Definition';
  }

  if (type === 'output') {
    return 'Output Definition';
  }

  return '';
};

/**
 * Create our extension group tab with the contained groups.
 */
function createProcessIoTab(element, injector) {

  var processIoGroup = {
    id: 'process-io-group',
    label: 'Parameters',
    entries: []
  };

  // create groups showing input and output parameters

  var {
    getSelectedParameter
  } = injector.invoke(processIoProps, null, { group: processIoGroup, element: element });

  var processIoEntryGroup = {
    id: 'process-io-entry-group',
    entries: [],
    enabled: function(element, node) {
      return getSelectedParameter(element, node);
    },
    label: function(element, node) {
      var property = getSelectedParameter(element, node);

      return property && getIoParameterLabel(property) || '';
    }
  };

  // create single entry edit group

  injector.invoke(processIoEntryProps, null, {
    group: processIoEntryGroup,
    element: element,
    options: {
      getSelectedParameter
    }
  });

  var processIoTab = {
    id: 'process-io-tab',
    label: 'I/O Specification',
    groups: [
      processIoGroup,
      processIoEntryGroup
    ]
  };

  return processIoTab;
}


/**
 * An extension that makes process IO mappings configurable via a new
 * properties tab.
 *
 * @param {didi.Injector} injector
 */
export default function ProcessIoExtensionProvider(injector) {

  injector.invoke(CamundaPropertiesProvider, this);


  var originalGetTabs = this.getTabs.bind(this);

  this.getTabs = function(element) {

    var tabs = originalGetTabs(element);

    var bo = getBusinessObject(element);

    if (
      is(bo, 'bpmn:Process') || (
        is(bo, 'bpmn:Participant') &&
        bo.processRef
      )
    ) {
      var positionTab = createProcessIoTab(element, injector);

      tabs = tabs.slice(0, 1).concat(positionTab).concat(tabs.slice(1));
    }

    return tabs;
  };
}

inherits(ProcessIoExtensionProvider, CamundaPropertiesProvider);

ProcessIoExtensionProvider.$inject = [
  'injector'
];