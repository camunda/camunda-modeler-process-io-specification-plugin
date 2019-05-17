import { is } from 'bpmn-js/lib/util/ModelUtil';

import elementHelper from 'bpmn-js-properties-panel/lib/helper/ElementHelper';
import cmdHelper from 'bpmn-js-properties-panel/lib/helper/CmdHelper';
import { containsSpace } from 'bpmn-js-properties-panel/lib/Utils';

import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import {
  getIoPropertyProps,
  parseIoProperty
} from '../process-io-helper';


function inputOutputEntries(element, bpmnFactory, options) {

  const {
    getSelectedParameter: getSelected
  } = options;


  function isSelected(element, node) {
    return getSelected(element, node);
  }

  function getIoProperty(businessObject, name, defaultValue) {

    if (!businessObject) {
      return {
        [name]: defaultValue
      };
    }

    const props = parseIoProperty(businessObject);

    const value = props && props[name] || '';

    return {
      [name]: typeof value === 'undefined' ? defaultValue : value
    };
  }

  /**
   * Craft the UPDATE command to set a property value.
   */
  function updateCmd(businessObject, newProps) {
    var currentProps = parseIoProperty(businessObject);

    var props = getIoPropertyProps({
      ...currentProps,
      ...newProps
    });

    return cmdHelper.updateBusinessObject(element, businessObject, props);
  }


  // parameter name ///////////////

  const nameEntry = entryFactory.validationAwareTextField({
    id: 'parameterName',
    label: 'Name',
    modelProperty: 'name',

    getProperty: function(element, node) {
      const bo = getSelected(element, node);

      return getIoProperty(bo, 'name', '').name;
    },

    setProperty: function(element, values, node) {
      var bo = getSelected(element, node);

      return bo && updateCmd(bo, { name: values.name });
    },

    validate: function(element, values, node) {
      var bo = getSelected(element, node);

      var prop = bo && parseIoProperty(bo);

      var validation = {};

      if (prop) {
        var nameValue = values.name;

        if (nameValue) {
          if (containsSpace(nameValue)) {
            validation.name = 'Name must not contain spaces';
          }
        } else {
          validation.name = 'Parameter must have a name';
        }
      }

      return validation;
    },

    show: function(element, node) {
      return isSelected(element, node);
    }

  });


  // type ///////////////

  var selectOptions = [
    { value: 'String', name: 'String' },
    { value: 'int', name: 'int' },
    { value: 'boolean', name: 'boolean' },
    { value: 'double', name: 'double' },
    { value: 'Date', name: 'Date' }
  ];

  const typeEntry = entryFactory.selectBox({
    id : 'dataType',
    label: 'Type',
    selectOptions: selectOptions,
    modelProperty: 'dataType',

    get: function(element, node) {
      const bo = getSelected(element, node);

      return getIoProperty(bo, 'dataType', 'String');
    },

    set: function(element, values, node) {
      var bo = getSelected(element, node);

      return bo && updateCmd(bo, { dataType: values.dataType });
    },

    show: function(element, node) {
      return isSelected(element, node);
    }

  });


  // description ///////////////

  const descriptionEntry = entryFactory.textBox({
    id : 'parameterDescription',
    label : 'Description',
    modelProperty: 'description',
    get: function(element, node) {
      const bo = getSelected(element, node);

      return getIoProperty(bo, 'description', '');
    },

    set: function(element, values, node) {
      var bo = getSelected(element, node);

      return bo && updateCmd(bo, { description: values.description });
    },

    show: function(element, node) {
      return isSelected(element, node);
    }

  });


  return {
    entries: [
      nameEntry,
      typeEntry,
      descriptionEntry
    ]
  };
}


/**
 * Defines the group to edit an individual input or output entry.
 *
 * @return {Object}
 */
export default function processIoEntryProps(group, element, options, injector) {

  const {
    entries
  } = injector.invoke(inputOutputEntries, null, {
    element,
    options
  });

  group.entries = group.entries.concat(entries);
}
