import { useService } from 'bpmn-js-properties-panel';

import { is } from 'bpmn-js/lib/util/ModelUtil.js';

import { CheckboxEntry, ListGroup, TextAreaEntry, TextFieldEntry } from '@bpmn-io/properties-panel';

import {
  getInputSpecifications,
  getOutputSpecifications,
  getIoSpecificationParent,
  createInputSpecification,
  createExtensionElements,
  getExtensionElements,
  createIoSpecification,
  getIoSpecification,
  createOutputSpecification
} from '../process-io-helper.js';

import { Ids } from 'ids';


const ids = new Ids([ 16, 36, 1 ]);


// input specification //////////////////

export function createInputSpecificationGroup(element, injector) {
  const translate = injector.get('translate');

  const inputSpecifications = getInputSpecifications(element);

  const inputSpecificationGroup = {
    id: 'input-specification',
    label: translate('Input specification'),
    tooltip: translate('Specify input variables that this element consumes.'),
    component: ListGroup,
    add: addInputSpecificationFactory(element, injector),
    items: inputSpecifications.map(function(inputSpecification, index) {
      const id = `${element.id}-input-specification-${index}`;

      return InputSpecificationItem({
        id,
        element,
        item: inputSpecification,
        injector
      });
    })
  };

  return inputSpecificationGroup;
}


function addInputSpecificationFactory(element, injector) {
  const bpmnFactory = injector.get('bpmnFactory'),
        commandStack = injector.get('commandStack');

  function add(event) {
    event.stopPropagation();

    const commands = [];

    const businessObject = getIoSpecificationParent(element);

    let extensionElements = getExtensionElements(businessObject);

    if (!extensionElements) {
      extensionElements = createExtensionElements(businessObject, bpmnFactory);

      commands.push({
        cmd: 'element.updateModdleProperties',
        context: {
          element,
          moddleElement: businessObject,
          properties: {
            extensionElements
          }
        }
      });
    };

    const extensionElementValues = extensionElements.get('values');

    let ioSpecification = extensionElementValues.find(v => is(v, 'ccon:IoSpecification'));

    if (!ioSpecification) {
      ioSpecification = createIoSpecification(extensionElements, bpmnFactory);

      commands.push({
        cmd: 'element.updateModdleProperties',
        context: {
          element,
          moddleElement: extensionElements,
          properties: {
            values: extensionElementValues.concat(ioSpecification)
          }
        }
      });
    }

    const inputSpecification = createInputSpecification(ioSpecification, bpmnFactory, {
      name: `variable_${ids.next()}`,
      type: 'string',
      description: '',
      schema: ''
    });

    commands.push({
      cmd: 'element.updateModdleProperties',
      context: {
        element,
        moddleElement: ioSpecification,
        properties: {
          inputs: ioSpecification.get('inputs').concat(inputSpecification)
        }
      }
    });

    return commandStack.execute('properties-panel.multi-command-executor', commands);
  }

  return add;
}

function removeInputSpecificationFactory(element, item, modeling) {
  return function(event) {
    event.stopPropagation();

    const businessObject = getIoSpecificationParent(element);

    const ioSpecification = getIoSpecification(businessObject);

    modeling.updateModdleProperties(element, ioSpecification, {
      inputs: ioSpecification.get('inputs').filter(value => value !== item)
    });
  };
}

/**
 * @param { {
 *   id: string,
 *   element: Element,
 *   item: ModdleElement,
 *   injector: Injector
 * } } props
 */
function InputSpecificationItem(props) {
  const {
    id,
    element,
    item,
    injector
  } = props;

  return {
    id,
    label: `${item.name || ''} : ${item.type}`,
    entries: [
      {
        id: `${id}-name`,
        component: Name,
        item,
        element
      },
      {
        id: `${id}-type`,
        component: Type,
        item,
        element
      },
      {
        id: `${id}-description`,
        component: Description,
        item,
        element
      },
      {
        id: `${id}-schema`,
        component: Schema,
        item,
        element
      },
      {
        id: `${id}-required`,
        component: Required,
        item,
        element
      }
    ],
    autoFocusEntry: id + '-name',
    remove: removeInputSpecificationFactory(element, item, injector.get('modeling'))
  };
}

// output specification /////////////////

export function createOutputSpecificationGroup(element, injector) {
  const translate = injector.get('translate');

  const outputSpecifications = getOutputSpecifications(element);

  const outputSpecificationGroup = {
    id: 'output-specification',
    label: translate('Output specification'),
    tooltip: translate('Specify output variables that this element produces.'),
    component: ListGroup,
    add: addOutputSpecificationFactory(element, injector),
    items: outputSpecifications.map(function(outputSpecification, index) {
      const id = `${element.id}-output-specification-${index}`;

      return OutputSpecificationItem({
        id,
        element,
        item: outputSpecification,
        injector
      });
    })
  };

  return outputSpecificationGroup;
}


function addOutputSpecificationFactory(element, injector) {
  const bpmnFactory = injector.get('bpmnFactory'),
        commandStack = injector.get('commandStack');

  function add(event) {
    event.stopPropagation();

    const commands = [];

    const businessObject = getIoSpecificationParent(element);

    let extensionElements = getExtensionElements(businessObject);

    if (!extensionElements) {
      extensionElements = createExtensionElements(businessObject, bpmnFactory);

      commands.push({
        cmd: 'element.updateModdleProperties',
        context: {
          element,
          moddleElement: businessObject,
          properties: {
            extensionElements
          }
        }
      });
    };

    const extensionElementValues = extensionElements.get('values');

    let ioSpecification = extensionElementValues.find(v => is(v, 'ccon:IoSpecification'));

    if (!ioSpecification) {
      ioSpecification = createIoSpecification(extensionElements, bpmnFactory);

      commands.push({
        cmd: 'element.updateModdleProperties',
        context: {
          element,
          moddleElement: extensionElements,
          properties: {
            values: extensionElementValues.concat(ioSpecification)
          }
        }
      });
    }

    const outputSpecification = createOutputSpecification(ioSpecification, bpmnFactory, {
      name: `variable_${ids.next()}`,
      type: 'string',
      description: '',
      schema: ''
    });

    commands.push({
      cmd: 'element.updateModdleProperties',
      context: {
        element,
        moddleElement: ioSpecification,
        properties: {
          outputs: ioSpecification.get('outputs').concat(outputSpecification)
        }
      }
    });

    return commandStack.execute('properties-panel.multi-command-executor', commands);
  }

  return add;
}

function removeOutputSpecificationFactory(element, item, modeling) {
  return function(event) {
    event.stopPropagation();

    const businessObject = getIoSpecificationParent(element);

    const ioSpecification = getIoSpecification(businessObject);

    modeling.updateModdleProperties(element, ioSpecification, {
      outputs: ioSpecification.get('outputs').filter(value => value !== item)
    });
  };
}


/**
 * @param { {
 *   id: string,
 *   element: Element,
 *   item: ModdleElement,
 *   injector: Injector
 * } } props
 */
function OutputSpecificationItem(props) {
  const {
    id,
    element,
    item,
    injector
  } = props;

  return {
    id,
    label: `${item.name || ''} : ${item.type}`,
    entries: [
      {
        id: `${id}-name`,
        component: Name,
        item,
        element
      },
      {
        id: `${id}-type`,
        component: Type,
        item,
        element
      },
      {
        id: `${id}-description`,
        component: Description,
        item,
        element
      },
      {
        id: `${id}-schema`,
        component: Schema,
        item,
        element
      }
    ],
    autoFocusEntry: id + '-name',
    remove: removeOutputSpecificationFactory(element, item, injector.get('modeling'))
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