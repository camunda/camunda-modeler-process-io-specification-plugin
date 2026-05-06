import { useService } from 'bpmn-js-properties-panel';

import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil.js';

import { CheckboxEntry, ListGroup, TextAreaEntry, TextFieldEntry } from '@bpmn-io/properties-panel';

import {
  createExtensionElements,
  getExtensionElements,
  getExternalInputSpecifications,
  getExternalParameters,
  createExternalParameters,
  createExternalInputSpecification
} from '../process-io-helper.js';

import { Ids } from 'ids';


const ids = new Ids([ 16, 36, 1 ]);


// tool inputs (zeebe:ExternalParameters) ////////

export function createToolInputsGroup(element, injector) {
  const translate = injector.get('translate');

  const inputSpecifications = getExternalInputSpecifications(element);

  return {
    id: 'tool-inputs-group',
    label: translate('Tool inputs'),
    tooltip: translate('Specify tool input parameters for MCP or Agent Connector.'),
    component: ListGroup,
    add: addExternalInputSpecificationFactory(element, injector),
    items: inputSpecifications.map(function(param, index) {
      const id = `${element.id}-tool-input-${index}`;

      return ToolInputSpecificationItem({
        id,
        element,
        item: param,
        injector
      });
    })
  };
}

function addExternalInputSpecificationFactory(element, injector) {
  const bpmnFactory = injector.get('bpmnFactory'),
        commandStack = injector.get('commandStack');

  function add(event) {
    event.stopPropagation();

    const commands = [];

    const businessObject = getBusinessObject(element);

    let extensionElements = getExtensionElements(businessObject);

    if (!extensionElements) {
      extensionElements = createExtensionElements(businessObject, bpmnFactory);

      commands.push({
        cmd: 'element.updateModdleProperties',
        context: {
          element,
          moddleElement: businessObject,
          properties: { extensionElements }
        }
      });
    }

    const extensionElementValues = extensionElements.get('values');

    let externalParameters = getExternalParameters(element);

    if (!externalParameters) {
      externalParameters = createExternalParameters(extensionElements, bpmnFactory);

      commands.push({
        cmd: 'element.updateModdleProperties',
        context: {
          element,
          moddleElement: extensionElements,
          properties: {
            values: extensionElementValues.concat(externalParameters)
          }
        }
      });
    }

    const inputSpecification = createExternalInputSpecification(bpmnFactory, {
      name: `param_${ids.next()}`,
      type: 'string',
      description: '',
      required: true,
      schema: ''
    });

    commands.push({
      cmd: 'element.updateModdleProperties',
      context: {
        element,
        moddleElement: externalParameters,
        properties: {
          inputSpecification: externalParameters.get('inputSpecification').concat(inputSpecification)
        }
      }
    });

    return commandStack.execute('properties-panel.multi-command-executor', commands);
  }

  return add;
}

function removeExternalInputSpecificationFactory(element, item, modeling) {
  return function(event) {
    event.stopPropagation();

    const externalParameters = getExternalParameters(element);

    modeling.updateModdleProperties(element, externalParameters, {
      inputSpecification: externalParameters.get('inputSpecification').filter(v => v !== item)
    });
  };
}

function ToolInputSpecificationItem(props) {
  const { id, element, item, injector } = props;

  return {
    id,
    label: `${item.name || ''} : ${item.type || 'string'}`,
    entries: [
      { id: `${id}-name`, component: Name, item, element },
      { id: `${id}-type`, component: Type, item, element },
      { id: `${id}-description`, component: Description, item, element },
      { id: `${id}-required`, component: Required, item, element },
      { id: `${id}-schema`, component: Schema, item, element }
    ],
    autoFocusEntry: id + '-name',
    remove: removeExternalInputSpecificationFactory(element, item, injector.get('modeling'))
  };
}


// individual properties ///////////

function Name(props) {
  const {
    id,
    element,
    item
  } = props;

  const modeling = useService('modeling');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const setValue = (value) => {
    updateItemProperty(element, item, { name: value || '' }, modeling);
  };

  const getValue = () => {
    return item.name || '';
  };

  // return error if contains spaces
  const validate = (value) => {
    if (!value) {
      return translate('Must have a name.');
    }

    if (/\s/.test(value)) {
      return translate('Name must not contain spaces.');
    }
  };

  return TextFieldEntry({
    element: item,
    id,
    label: translate('Name'),
    getValue,
    setValue,
    debounce,
    validate
  });
}

function Type(props) {
  const {
    id,
    element,
    item
  } = props;

  const modeling = useService('modeling');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const setValue = (value) => {
    updateItemProperty(element, item, { type: value }, modeling);
  };

  const getValue = () => {
    return item.type || 'string';
  };

  // return error if contains spaces
  const validate = (value) => {
    if (!value) {
      return translate('Must have a type.');
    }
  };

  return TextFieldEntry({
    element: item,
    id,
    label: translate('Type'),
    getValue,
    setValue,
    debounce,
    validate
  });
}

function Description(props) {
  const {
    id,
    element,
    item
  } = props;

  const modeling = useService('modeling');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const setValue = (value) => {
    updateItemProperty(element, item, { description: value || '' }, modeling);
  };

  const getValue = () => {
    return item.description || '';
  };

  return TextAreaEntry({
    element: item,
    id,
    label: translate('Description'),
    getValue,
    setValue,
    debounce
  });
}

function Schema(props) {
  const {
    id,
    element,
    item
  } = props;

  const modeling = useService('modeling');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const setValue = (value) => {
    updateItemProperty(element, item, { schema: value || '' }, modeling);
  };

  const getValue = () => {
    return item.schema || '';
  };

  return TextAreaEntry({
    element: item,
    id,
    label: translate('Schema'),
    getValue,
    setValue,
    debounce
  });
}

function Required(props) {
  const {
    id,
    element,
    item
  } = props;

  const modeling = useService('modeling');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const setValue = (value) => {
    updateItemProperty(element, item, { required: value }, modeling);
  };

  const getValue = () => {
    return item.required;
  };

  return CheckboxEntry({
    element: item,
    id,
    label: translate('Required'),
    getValue,
    setValue,
    debounce
  });
}


// helpers ////////////

function updateItemProperty(element, businessObject, newProperties, modeling) {
  return modeling.updateModdleProperties(element, businessObject, newProperties);
}
