import { getBusinessObject, isAny } from 'bpmn-js/lib/util/ModelUtil.js';


export function findExtensions(element, types) {
  const extensionElements = getExtensionElements(element);

  if (!extensionElements) {
    return [];
  }

  return extensionElements.get('values').filter((value) => {
    return isAny(value, [].concat(types));
  });
}

export function getExtensionElements(element) {
  return getBusinessObject(element).get('extensionElements');
}

export function createExtensionElements(element, bpmnFactory) {
  const bo = getBusinessObject(element);

  return createElement('bpmn:ExtensionElements', { values: [] }, bo, bpmnFactory);
}

export function createElement(elementType, properties, parent, factory) {
  const element = factory.create(elementType, properties);
  element.$parent = parent;

  return element;
}

// zeebe:ExternalParameters helpers

export function getExternalParameters(element) {
  const bo = getBusinessObject(element);
  const matches = findExtensions(bo, 'specext:ExternalParameters');
  return matches.length ? matches[0] : null;
}

export function getExternalInputSpecifications(element) {
  return getExternalParameters(element)?.inputSpecification || [];
}

export function createExternalParameters(extensionElements, bpmnFactory) {
  return createElement(
    'specext:ExternalParameters',
    { inputSpecification: [] },
    extensionElements,
    bpmnFactory
  );
}

export function createExternalInputSpecification(bpmnFactory, properties) {
  const { name, description = '', type = 'string', required = true, schema = '' } = properties;
  return createElement(
    'specext:InputSpecification',
    { name, description, type, required, schema },
    null,
    bpmnFactory
  );
}
