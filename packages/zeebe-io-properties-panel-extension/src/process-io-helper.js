import { getBusinessObject, is, isAny } from 'bpmn-js/lib/util/ModelUtil.js';


export function canHaveIoSpecification(element) {
  return !!getIoSpecificationParent(element);
}

/**
 * Return element that holds the <ccon:IoSpecification /> element.
 *
 * @param {Element} element
 *
 * @return {ModdleElement | undefined}
 */
export function getIoSpecificationParent(element) {

  if (isAny(element, [
    'bpmn:Process',
    'bpmn:Activity',
    'bpmn:StartEvent'
  ])) {
    return getBusinessObject(element);
  }

  if (is(element, 'bpmn:Participant')) {
    return getProcessRef(element);
  }

  return undefined;
}

/**
 * Return process ref for a <bpmn:Participant> shape.
 *
 * @param {Element} element
 *
 * @return {ModdleElement | undefined}
 */
function getProcessRef(element) {
  return getBusinessObject(element).processRef;
}

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

export function getIoSpecification(element) {
  const bo = getIoSpecificationParent(element);

  const ioSpecifications = findExtensions(bo, 'ccon:IoSpecification') || [];

  if (ioSpecifications.length) {
    return ioSpecifications[0];
  }

  return null;
}

export function getInputSpecifications(element) {
  return getIoSpecification(element)?.inputs || [];
}

export function getOutputSpecifications(element) {
  return getIoSpecification(element)?.outputs || [];
}

export function createExtensionElements(element, bpmnFactory) {
  const bo = getBusinessObject(element);

  return createElement('bpmn:ExtensionElements', { values: [] }, bo, bpmnFactory);
}

export function createIoSpecification(extensionElements, bpmnFactory) {
  return createElement('ccon:IoSpecification', { inputs: [], outputs: [] }, extensionElements, bpmnFactory);
}

export function createInputSpecification(ioSpecification, bpmnFactory, properties) {
  return createElement('ccon:InputSpecification', properties, ioSpecification, bpmnFactory);
}

export function createOutputSpecification(ioSpecification, bpmnFactory, properties) {
  return createElement('ccon:OutputSpecification', properties, ioSpecification, bpmnFactory);
}

export function createElement(elementType, properties, parent, factory) {
  const element = factory.create(elementType, properties);
  element.$parent = parent;

  return element;
}
