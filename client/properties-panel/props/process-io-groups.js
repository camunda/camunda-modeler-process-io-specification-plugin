import { useService } from 'bpmn-js-properties-panel';

import { is } from 'bpmn-js/lib/util/ModelUtil';

import { ListGroup, SelectEntry, TextAreaEntry, TextFieldEntry } from '@bpmn-io/properties-panel';
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

import {
  createIoProperty,
  isIoProperty,
  parseIoProperty,
  updateIoProperty
} from '../process-io-helper';

import {
  createExtensionElements,
  createCamundaProperties,
  getExtensionElements,
  getCamundaProperties
} from '../extensions-helper';

import Ids from 'ids';

const ids = new Ids([ 16, 36, 1 ]);

export function createInputSpecificationGroup(element, injector) {
  const translate = injector.get('translate');

  const processBo = getProcessBo(element);

  const properties = getIOSpecificationProperties('input', processBo);

  const inputSpecificationGroup = {
    id: 'input-specification-group',
    label: translate('Input specification'),
    component: ListGroup,
    add: addPropertyFactory('input', element, injector),
    items: properties.map(function(property, index) {
      const id = `${element.id}-input-specification-${index}`;

      return PropertyItem({
        id,
        element,
        property,
        injector
      });
    })
  };

  return inputSpecificationGroup;
}

export function createOutputSpecificationGroup(element, injector) {
  const translate = injector.get('translate');

  const processBo = getProcessBo(element);

  const properties = getIOSpecificationProperties('output', processBo);

  const outputSpecificationGroup = {
    id: 'output-specification-group',
    label: translate('Output specification'),
    component: ListGroup,
    add: addPropertyFactory('output', element, injector),
    items: properties.map(function(property, index) {
      const id = `${element.id}-output-specification-${index}`;

      return PropertyItem({
        id,
        element,
        property,
        injector
      });
    })
  };

  return outputSpecificationGroup;
}


function addPropertyFactory(propertyType, element, injector) {
  const bpmnFactory = injector.get('bpmnFactory'),
        modeling = injector.get('modeling');

  function add(event) {
    event.stopPropagation();

    const property = createIoProperty(bpmnFactory, {
      type: propertyType,
      name: `var_${ids.next()}`,
      dataType: 'String',
      description: ''
    });

    const businessObject = getBusinessObject(element);

    const extensionElements = getExtensionElements(element),
          camundaProperties = getCamundaProperties(businessObject);

    let updatedBusinessObject, update;

    if (!extensionElements) {
      updatedBusinessObject = businessObject;

      const extensionElements = createExtensionElements(businessObject, bpmnFactory),
            camundaProperties = createCamundaProperties(extensionElements, bpmnFactory, { values: [ property ] });
      extensionElements.values.push(camundaProperties);
      property.$parent = camundaProperties;

      update = { extensionElements };
    } else if (!camundaProperties) {
      updatedBusinessObject = extensionElements;

      const camundaProperties = createCamundaProperties(extensionElements, bpmnFactory, { values: [ property ] });
      property.$parent = camundaProperties;

      update = { values: extensionElements.get('values').concat(camundaProperties) };
    } else {
      updatedBusinessObject = camundaProperties;
      property.$parent = camundaProperties;

      update = { values: camundaProperties.get('values').concat(property) };
    }

    modeling.updateModdleProperties(element, updatedBusinessObject, update);
  }

  return add;
}

function removeFactory(element, property, modeling) {
  return function(event) {
    event.stopPropagation();

    const businessObject = getBusinessObject(element);

    const camundaProperties = getCamundaProperties(businessObject);

    modeling.updateModdleProperties(element, camundaProperties, {
      values: camundaProperties.get('values').filter(value => value !== property)
    });
  };
}

function PropertyItem(props) {
  const {
    id,
    element,
    property,
    injector
  } = props;

  const parsed = parseIoProperty(property);

  return {
    id,
    label: `${parsed.name || ''} : ${parsed.dataType}`,
    entries: [
      {
        id: `${id}-name`,
        component: Name,
        property,
        element
      },
      {
        id: `${id}-type`,
        component: Type,
        property,
        element
      },
      {
        id: `${id}-description`,
        component: Description,
        property,
        element
      }
    ],
    autoFocusEntry: id + '-name',
    remove: removeFactory(element, property, injector.get('modeling'))
  };
}

function Name(props) {
  const {
    id,
    element,
    property
  } = props;

  const modeling = useService('modeling');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const setValue = (value) => {
    updateIoProperty(element, property, { name: value || '' }, modeling);
  };

  const getValue = () => {
    return parseIoProperty(property).name || '';
  };

  // return error if contains spaces
  const validate = (value) => {
    if (!value) {
      return translate('Parameter must have a name.');
    }

    if (/\s/.test(value)) {
      return translate('Name must not contain spaces.');
    }
  };

  return TextFieldEntry({
    element: property,
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
    property
  } = props;

  const modeling = useService('modeling');
  const translate = useService('translate');

  const setValue = (value) => {
    updateIoProperty(element, property, { dataType: value }, modeling);
  };

  const getValue = () => {
    return parseIoProperty(property).dataType || 'String';
  };

  return SelectEntry({
    element: property,
    id,
    label: translate('Type'),
    getOptions() {
      return [
        { value: 'String', label: translate('String') },
        { value: 'int', label: translate('int') },
        { value: 'boolean', label: translate('boolean') },
        { value: 'double', label: translate('double') },
        { value: 'Date', label: translate('Date') }
      ];
    },
    getValue,
    setValue
  });
}

function Description(props) {
  const {
    id,
    element,
    property
  } = props;

  const modeling = useService('modeling');
  const translate = useService('translate');
  const debounce = useService('debounceInput');

  const setValue = (value) => {
    updateIoProperty(element, property, { description: value || '' }, modeling);
  };

  const getValue = () => {
    return parseIoProperty(property).description || '';
  };

  return TextAreaEntry({
    element: property,
    id,
    label: translate('Description'),
    getValue,
    setValue,
    debounce
  });
}


// helper

/**
 * Get process business object from process element or participant.
 */
function getProcessBo(element) {
  const bo = getBusinessObject(element);

  if (is(element, 'bpmn:Participant')) {
    bo = bo.processRef;
  }

  return bo;
}

function getIOSpecificationProperties(type, processBo) {
  const camundaProperties = getCamundaProperties(processBo);

  if (!camundaProperties) {
    return [];
  }

  return camundaProperties.get('values')
    .filter(property => isIoProperty(property))
    .filter(property => parseIoProperty(property).type === type);
}
