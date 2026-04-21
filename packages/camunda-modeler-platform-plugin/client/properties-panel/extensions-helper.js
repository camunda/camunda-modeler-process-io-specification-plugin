import { isAny } from 'bpmn-js/lib/features/modeling/util/ModelingUtil';
import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';

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
  const businessObject = getBusinessObject(element);

  return businessObject.get('extensionElements');
}

export function getCamundaProperties(element) {
  const bo = getBusinessObject(element);

  const properties = findExtensions(bo, 'camunda:Properties') || [];

  if (properties.length) {
    return properties[0];
  }

  return null;
}

export function createExtensionElements(element, bpmnFactory) {
  const bo = getBusinessObject(element);

  return createElement('bpmn:ExtensionElements', { values: [] }, bo, bpmnFactory);
}

export function createCamundaProperties(extensionElements, bpmnFactory, properties) {
  return createElement('camunda:Properties', properties, extensionElements, bpmnFactory);
}

export function createElement(elementType, properties, parent, factory) {
  const element = factory.create(elementType, properties);
  element.$parent = parent;

  return element;
}
