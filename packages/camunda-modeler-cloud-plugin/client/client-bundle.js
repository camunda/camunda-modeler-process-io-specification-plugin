/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/bpmn-js/lib/util/ModelUtil.js"
/*!********************************************************!*\
  !*** ../../node_modules/bpmn-js/lib/util/ModelUtil.js ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getBusinessObject: () => (/* binding */ getBusinessObject),
/* harmony export */   getDi: () => (/* binding */ getDi),
/* harmony export */   is: () => (/* binding */ is),
/* harmony export */   isAny: () => (/* binding */ isAny)
/* harmony export */ });
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! min-dash */ "../../node_modules/min-dash/dist/index.js");


/**
 * @typedef { import('../model/Types').Element } Element
 * @typedef { import('../model/Types').ModdleElement } ModdleElement
 */

/**
 * Is an element of the given BPMN type?
 *
 * @param  {Element|ModdleElement} element
 * @param  {string} type
 *
 * @return {boolean}
 */
function is(element, type) {
  var bo = getBusinessObject(element);

  return bo && (typeof bo.$instanceOf === 'function') && bo.$instanceOf(type);
}


/**
 * Return true if element has any of the given types.
 *
 * @param {Element|ModdleElement} element
 * @param {string[]} types
 *
 * @return {boolean}
 */
function isAny(element, types) {
  return (0,min_dash__WEBPACK_IMPORTED_MODULE_0__.some)(types, function(t) {
    return is(element, t);
  });
}

/**
 * Return the business object for a given element.
 *
 * @param {Element|ModdleElement} element
 *
 * @return {ModdleElement}
 */
function getBusinessObject(element) {
  return (element && element.businessObject) || element;
}

/**
 * Return the di object for a given element.
 *
 * @param {Element} element
 *
 * @return {ModdleElement}
 */
function getDi(element) {
  return element && element.di;
}

/***/ },

/***/ "../../node_modules/camunda-modeler-plugin-helpers/helper.js"
/*!*******************************************************************!*\
  !*** ../../node_modules/camunda-modeler-plugin-helpers/helper.js ***!
  \*******************************************************************/
(module) {

function returnOrThrow(getter, minimalModelerVersion) {
  let result;
  try {
    result = getter();
  } catch (error) {}

  if (!result) {
    throw new Error(`Not compatible with Camunda Modeler < ${minimalModelerVersion}`);
  }

  return result;
}

module.exports = {
  returnOrThrow
};


/***/ },

/***/ "../../node_modules/camunda-modeler-plugin-helpers/index.js"
/*!******************************************************************!*\
  !*** ../../node_modules/camunda-modeler-plugin-helpers/index.js ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getModelerDirectory: () => (/* binding */ getModelerDirectory),
/* harmony export */   getPluginsDirectory: () => (/* binding */ getPluginsDirectory),
/* harmony export */   registerBpmnJSModdleExtension: () => (/* binding */ registerBpmnJSModdleExtension),
/* harmony export */   registerBpmnJSPlugin: () => (/* binding */ registerBpmnJSPlugin),
/* harmony export */   registerClientExtension: () => (/* binding */ registerClientExtension),
/* harmony export */   registerClientPlugin: () => (/* binding */ registerClientPlugin),
/* harmony export */   registerCloudBpmnJSModdleExtension: () => (/* binding */ registerCloudBpmnJSModdleExtension),
/* harmony export */   registerCloudBpmnJSPlugin: () => (/* binding */ registerCloudBpmnJSPlugin),
/* harmony export */   registerCloudDmnJSModdleExtension: () => (/* binding */ registerCloudDmnJSModdleExtension),
/* harmony export */   registerCloudDmnJSPlugin: () => (/* binding */ registerCloudDmnJSPlugin),
/* harmony export */   registerDmnJSModdleExtension: () => (/* binding */ registerDmnJSModdleExtension),
/* harmony export */   registerDmnJSPlugin: () => (/* binding */ registerDmnJSPlugin),
/* harmony export */   registerPlatformBpmnJSModdleExtension: () => (/* binding */ registerPlatformBpmnJSModdleExtension),
/* harmony export */   registerPlatformBpmnJSPlugin: () => (/* binding */ registerPlatformBpmnJSPlugin),
/* harmony export */   registerPlatformDmnJSModdleExtension: () => (/* binding */ registerPlatformDmnJSModdleExtension),
/* harmony export */   registerPlatformDmnJSPlugin: () => (/* binding */ registerPlatformDmnJSPlugin)
/* harmony export */ });
/**
 * Validate and register a client plugin.
 *
 * @param {Object} plugin
 * @param {String} type
 */
function registerClientPlugin(plugin, type) {
  var plugins = window.plugins || [];
  window.plugins = plugins;

  if (!plugin) {
    throw new Error('plugin not specified');
  }

  if (!type) {
    throw new Error('type not specified');
  }

  plugins.push({
    plugin: plugin,
    type: type
  });
}

/**
 * Validate and register a client plugin.
 *
 * @param {import('react').ComponentType} extension
 *
 * @example
 *
 * import MyExtensionComponent from './MyExtensionComponent';
 *
 * registerClientExtension(MyExtensionComponent);
 */
function registerClientExtension(component) {
  registerClientPlugin(component, 'client');
}

/**
 * Validate and register a bpmn-js plugin.
 *
 * @param {Object} module
 *
 * @example
 *
 * import {
 *   registerBpmnJSPlugin
 * } from 'camunda-modeler-plugin-helpers';
 *
 * const BpmnJSModule = {
 *   __init__: [ 'myService' ],
 *   myService: [ 'type', ... ]
 * };
 *
 * registerBpmnJSPlugin(BpmnJSModule);
 */
function registerBpmnJSPlugin(module) {
  registerClientPlugin(module, 'bpmn.modeler.additionalModules');
}

/**
 * Validate and register a platform specific bpmn-js plugin.
 *
 * @param {Object} module
 *
 * @example
 *
 * import {
 *   registerPlatformBpmnJSPlugin
 * } from 'camunda-modeler-plugin-helpers';
 *
 * const BpmnJSModule = {
 *   __init__: [ 'myService' ],
 *   myService: [ 'type', ... ]
 * };
 *
 * registerPlatformBpmnJSPlugin(BpmnJSModule);
 */
function registerPlatformBpmnJSPlugin(module) {
  registerClientPlugin(module, 'bpmn.platform.modeler.additionalModules');
}

/**
 * Validate and register a cloud specific bpmn-js plugin.
 *
 * @param {Object} module
 *
 * @example
 *
 * import {
 *   registerCloudBpmnJSPlugin
 * } from 'camunda-modeler-plugin-helpers';
 *
 * const BpmnJSModule = {
 *   __init__: [ 'myService' ],
 *   myService: [ 'type', ... ]
 * };
 *
 * registerCloudBpmnJSPlugin(BpmnJSModule);
 */
function registerCloudBpmnJSPlugin(module) {
  registerClientPlugin(module, 'bpmn.cloud.modeler.additionalModules');
}

/**
 * Validate and register a bpmn-moddle extension plugin.
 *
 * @param {Object} descriptor
 *
 * @example
 * import {
 *   registerBpmnJSModdleExtension
 * } from 'camunda-modeler-plugin-helpers';
 *
 * var moddleDescriptor = {
 *   name: 'my descriptor',
 *   uri: 'http://example.my.company.localhost/schema/my-descriptor/1.0',
 *   prefix: 'mydesc',
 *
 *   ...
 * };
 *
 * registerBpmnJSModdleExtension(moddleDescriptor);
 */
function registerBpmnJSModdleExtension(descriptor) {
  registerClientPlugin(descriptor, 'bpmn.modeler.moddleExtension');
}

/**
 * Validate and register a platform specific bpmn-moddle extension plugin.
 *
 * @param {Object} descriptor
 *
 * @example
 * import {
 *   registerPlatformBpmnJSModdleExtension
 * } from 'camunda-modeler-plugin-helpers';
 *
 * var moddleDescriptor = {
 *   name: 'my descriptor',
 *   uri: 'http://example.my.company.localhost/schema/my-descriptor/1.0',
 *   prefix: 'mydesc',
 *
 *   ...
 * };
 *
 * registerPlatformBpmnJSModdleExtension(moddleDescriptor);
 */
function registerPlatformBpmnJSModdleExtension(descriptor) {
  registerClientPlugin(descriptor, 'bpmn.platform.modeler.moddleExtension');
}

/**
 * Validate and register a cloud specific bpmn-moddle extension plugin.
 *
 * @param {Object} descriptor
 *
 * @example
 * import {
 *   registerCloudBpmnJSModdleExtension
 * } from 'camunda-modeler-plugin-helpers';
 *
 * var moddleDescriptor = {
 *   name: 'my descriptor',
 *   uri: 'http://example.my.company.localhost/schema/my-descriptor/1.0',
 *   prefix: 'mydesc',
 *
 *   ...
 * };
 *
 * registerCloudBpmnJSModdleExtension(moddleDescriptor);
 */
function registerCloudBpmnJSModdleExtension(descriptor) {
  registerClientPlugin(descriptor, 'bpmn.cloud.modeler.moddleExtension');
}

/**
 * Validate and register a dmn-moddle extension plugin.
 *
 * @param {Object} descriptor
 *
 * @example
 * import {
 *   registerDmnJSModdleExtension
 * } from 'camunda-modeler-plugin-helpers';
 *
 * var moddleDescriptor = {
 *   name: 'my descriptor',
 *   uri: 'http://example.my.company.localhost/schema/my-descriptor/1.0',
 *   prefix: 'mydesc',
 *
 *   ...
 * };
 *
 * registerDmnJSModdleExtension(moddleDescriptor);
 */
function registerDmnJSModdleExtension(descriptor) {
  registerClientPlugin(descriptor, 'dmn.modeler.moddleExtension');
}

/**
 * Validate and register a cloud specific dmn-moddle extension plugin.
 *
 * @param {Object} descriptor
 *
 * @example
 * import {
 *   registerCloudDmnJSModdleExtension
 * } from 'camunda-modeler-plugin-helpers';
 *
 * var moddleDescriptor = {
 *   name: 'my descriptor',
 *   uri: 'http://example.my.company.localhost/schema/my-descriptor/1.0',
 *   prefix: 'mydesc',
 *
 *   ...
 * };
 *
 * registerCloudDmnJSModdleExtension(moddleDescriptor);
 */
function registerCloudDmnJSModdleExtension(descriptor) {
  registerClientPlugin(descriptor, 'dmn.cloud.modeler.moddleExtension');
}

/**
 * Validate and register a platform specific dmn-moddle extension plugin.
 *
 * @param {Object} descriptor
 *
 * @example
 * import {
 *   registerPlatformDmnJSModdleExtension
 * } from 'camunda-modeler-plugin-helpers';
 *
 * var moddleDescriptor = {
 *   name: 'my descriptor',
 *   uri: 'http://example.my.company.localhost/schema/my-descriptor/1.0',
 *   prefix: 'mydesc',
 *
 *   ...
 * };
 *
 * registerPlatformDmnJSModdleExtension(moddleDescriptor);
 */
function registerPlatformDmnJSModdleExtension(descriptor) {
  registerClientPlugin(descriptor, 'dmn.platform.modeler.moddleExtension');
}

/**
 * Validate and register a dmn-js plugin.
 *
 * @param {Object} module
 *
 * @example
 *
 * import {
 *   registerDmnJSPlugin
 * } from 'camunda-modeler-plugin-helpers';
 *
 * const DmnJSModule = {
 *   __init__: [ 'myService' ],
 *   myService: [ 'type', ... ]
 * };
 *
 * registerDmnJSPlugin(DmnJSModule, [ 'drd', 'literalExpression' ]);
 * registerDmnJSPlugin(DmnJSModule, 'drd')
 */
function registerDmnJSPlugin(module, components) {

  if (!Array.isArray(components)) {
    components = [ components ]
  }

  components.forEach(c => registerClientPlugin(module, `dmn.modeler.${c}.additionalModules`));
}

/**
 * Validate and register a cloud specific dmn-js plugin.
 *
 * @param {Object} module
 *
 * @example
 *
 * import {
 *   registerCloudDmnJSPlugin
 * } from 'camunda-modeler-plugin-helpers';
 *
 * const DmnJSModule = {
 *   __init__: [ 'myService' ],
 *   myService: [ 'type', ... ]
 * };
 *
 * registerCloudDmnJSPlugin(DmnJSModule, [ 'drd', 'literalExpression' ]);
 * registerCloudDmnJSPlugin(DmnJSModule, 'drd')
 */
function registerCloudDmnJSPlugin(module, components) {

  if (!Array.isArray(components)) {
    components = [ components ]
  }

  components.forEach(c => registerClientPlugin(module, `dmn.cloud.modeler.${c}.additionalModules`));
}

/**
 * Validate and register a platform specific dmn-js plugin.
 *
 * @param {Object} module
 *
 * @example
 *
 * import {
 *   registerPlatformDmnJSPlugin
 * } from 'camunda-modeler-plugin-helpers';
 *
 * const DmnJSModule = {
 *   __init__: [ 'myService' ],
 *   myService: [ 'type', ... ]
 * };
 *
 * registerPlatformDmnJSPlugin(DmnJSModule, [ 'drd', 'literalExpression' ]);
 * registerPlatformDmnJSPlugin(DmnJSModule, 'drd')
 */
function registerPlatformDmnJSPlugin(module, components) {

  if (!Array.isArray(components)) {
    components = [ components ]
  }

  components.forEach(c => registerClientPlugin(module, `dmn.platform.modeler.${c}.additionalModules`));
}

/**
 * Return the modeler directory, as a string.
 *
 * @deprecated Will be removed in future Camunda Modeler versions without replacement.
 *
 * @return {String}
 */
function getModelerDirectory() {
  return window.getModelerDirectory();
}

/**
 * Return the modeler plugin directory, as a string.
 *
 * @deprecated Will be removed in future Camunda Modeler versions without replacement.
 *
 * @return {String}
 */
function getPluginsDirectory() {
  return window.getPluginsDirectory();
}

/***/ },

/***/ "../../node_modules/camunda-modeler-plugin-helpers/vendor/@bpmn-io/properties-panel/index.js"
/*!***************************************************************************************************!*\
  !*** ../../node_modules/camunda-modeler-plugin-helpers/vendor/@bpmn-io/properties-panel/index.js ***!
  \***************************************************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

const { returnOrThrow } = __webpack_require__(/*! ../../../helper.js */ "../../node_modules/camunda-modeler-plugin-helpers/helper.js");

module.exports = returnOrThrow(() => window.vendor?.propertiesPanel?.common, '5.0.0');


/***/ },

/***/ "../../node_modules/camunda-modeler-plugin-helpers/vendor/bpmn-js-properties-panel.js"
/*!********************************************************************************************!*\
  !*** ../../node_modules/camunda-modeler-plugin-helpers/vendor/bpmn-js-properties-panel.js ***!
  \********************************************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

const { returnOrThrow } = __webpack_require__(/*! ../helper.js */ "../../node_modules/camunda-modeler-plugin-helpers/helper.js");

module.exports = returnOrThrow(() => window.vendor?.propertiesPanel?.bpmn, '5.0.0');


/***/ },

/***/ "../zeebe-io-properties-panel-extension/dist/index.js"
/*!************************************************************!*\
  !*** ../zeebe-io-properties-panel-extension/dist/index.js ***!
  \************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ index),
/* harmony export */   externalParametersModdle: () => (/* binding */ zeebeExternalParameters)
/* harmony export */ });
/* harmony import */ var bpmn_js_properties_panel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bpmn-js-properties-panel */ "../../node_modules/camunda-modeler-plugin-helpers/vendor/bpmn-js-properties-panel.js");
/* harmony import */ var bpmn_js_lib_util_ModelUtil_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bpmn-js/lib/util/ModelUtil.js */ "../../node_modules/bpmn-js/lib/util/ModelUtil.js");
/* harmony import */ var _bpmn_io_properties_panel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @bpmn-io/properties-panel */ "../../node_modules/camunda-modeler-plugin-helpers/vendor/@bpmn-io/properties-panel/index.js");
/* harmony import */ var ids__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ids */ "../../node_modules/ids/dist/index.js");




function findExtensions(element, types) {
  const extensionElements = getExtensionElements(element);
  if (!extensionElements) {
    return [];
  }
  return extensionElements.get('values').filter(value => {
    return (0,bpmn_js_lib_util_ModelUtil_js__WEBPACK_IMPORTED_MODULE_1__.isAny)(value, [].concat(types));
  });
}
function getExtensionElements(element) {
  return (0,bpmn_js_lib_util_ModelUtil_js__WEBPACK_IMPORTED_MODULE_1__.getBusinessObject)(element).get('extensionElements');
}
function createExtensionElements(element, bpmnFactory) {
  const bo = (0,bpmn_js_lib_util_ModelUtil_js__WEBPACK_IMPORTED_MODULE_1__.getBusinessObject)(element);
  return createElement('bpmn:ExtensionElements', {
    values: []
  }, bo, bpmnFactory);
}
function createElement(elementType, properties, parent, factory) {
  const element = factory.create(elementType, properties);
  element.$parent = parent;
  return element;
}

// zeebe:ExternalParameters helpers

function getExternalParameters(element) {
  const bo = (0,bpmn_js_lib_util_ModelUtil_js__WEBPACK_IMPORTED_MODULE_1__.getBusinessObject)(element);
  const matches = findExtensions(bo, 'specext:ExternalParameters');
  return matches.length ? matches[0] : null;
}
function getExternalInputSpecifications(element) {
  return getExternalParameters(element)?.inputSpecification || [];
}
function createExternalParameters(extensionElements, bpmnFactory) {
  return createElement('specext:ExternalParameters', {
    inputSpecification: []
  }, extensionElements, bpmnFactory);
}
function createExternalInputSpecification(bpmnFactory, properties) {
  const {
    name,
    description = '',
    type = 'string',
    required = true,
    schema = ''
  } = properties;
  return createElement('specext:InputSpecification', {
    name,
    description,
    type,
    required,
    schema
  }, null, bpmnFactory);
}
const ids = new ids__WEBPACK_IMPORTED_MODULE_3__.Ids([16, 36, 1]);

// tool inputs (zeebe:ExternalParameters) ////////

function createToolInputsGroup(element, injector) {
  const translate = injector.get('translate');
  const inputSpecifications = getExternalInputSpecifications(element);
  return {
    id: 'tool-inputs-group',
    label: translate('Tool inputs'),
    tooltip: translate('Specify tool input parameters for MCP or Agent Connector.'),
    component: _bpmn_io_properties_panel__WEBPACK_IMPORTED_MODULE_2__.ListGroup,
    add: addExternalInputSpecificationFactory(element, injector),
    items: inputSpecifications.map(function (param, index) {
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
    const businessObject = (0,bpmn_js_lib_util_ModelUtil_js__WEBPACK_IMPORTED_MODULE_1__.getBusinessObject)(element);
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
  return function (event) {
    event.stopPropagation();
    const externalParameters = getExternalParameters(element);
    modeling.updateModdleProperties(element, externalParameters, {
      inputSpecification: externalParameters.get('inputSpecification').filter(v => v !== item)
    });
  };
}
function ToolInputSpecificationItem(props) {
  const {
    id,
    element,
    item,
    injector
  } = props;
  return {
    id,
    label: `${item.name || ''} : ${item.type || 'string'}`,
    entries: [{
      id: `${id}-name`,
      component: Name,
      item,
      element
    }, {
      id: `${id}-type`,
      component: Type,
      item,
      element
    }, {
      id: `${id}-description`,
      component: Description,
      item,
      element
    }, {
      id: `${id}-required`,
      component: Required,
      item,
      element
    }, {
      id: `${id}-schema`,
      component: Schema,
      item,
      element
    }],
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
  const modeling = (0,bpmn_js_properties_panel__WEBPACK_IMPORTED_MODULE_0__.useService)('modeling');
  const translate = (0,bpmn_js_properties_panel__WEBPACK_IMPORTED_MODULE_0__.useService)('translate');
  const debounce = (0,bpmn_js_properties_panel__WEBPACK_IMPORTED_MODULE_0__.useService)('debounceInput');
  const setValue = value => {
    updateItemProperty(element, item, {
      name: value || ''
    }, modeling);
  };
  const getValue = () => {
    return item.name || '';
  };

  // return error if contains spaces
  const validate = value => {
    if (!value) {
      return translate('Must have a name.');
    }
    if (/\s/.test(value)) {
      return translate('Name must not contain spaces.');
    }
  };
  return (0,_bpmn_io_properties_panel__WEBPACK_IMPORTED_MODULE_2__.TextFieldEntry)({
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
  const modeling = (0,bpmn_js_properties_panel__WEBPACK_IMPORTED_MODULE_0__.useService)('modeling');
  const translate = (0,bpmn_js_properties_panel__WEBPACK_IMPORTED_MODULE_0__.useService)('translate');
  const debounce = (0,bpmn_js_properties_panel__WEBPACK_IMPORTED_MODULE_0__.useService)('debounceInput');
  const setValue = value => {
    updateItemProperty(element, item, {
      type: value
    }, modeling);
  };
  const getValue = () => {
    return item.type || 'string';
  };

  // return error if contains spaces
  const validate = value => {
    if (!value) {
      return translate('Must have a type.');
    }
  };
  return (0,_bpmn_io_properties_panel__WEBPACK_IMPORTED_MODULE_2__.TextFieldEntry)({
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
  const modeling = (0,bpmn_js_properties_panel__WEBPACK_IMPORTED_MODULE_0__.useService)('modeling');
  const translate = (0,bpmn_js_properties_panel__WEBPACK_IMPORTED_MODULE_0__.useService)('translate');
  const debounce = (0,bpmn_js_properties_panel__WEBPACK_IMPORTED_MODULE_0__.useService)('debounceInput');
  const setValue = value => {
    updateItemProperty(element, item, {
      description: value || ''
    }, modeling);
  };
  const getValue = () => {
    return item.description || '';
  };
  return (0,_bpmn_io_properties_panel__WEBPACK_IMPORTED_MODULE_2__.TextAreaEntry)({
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
  const modeling = (0,bpmn_js_properties_panel__WEBPACK_IMPORTED_MODULE_0__.useService)('modeling');
  const translate = (0,bpmn_js_properties_panel__WEBPACK_IMPORTED_MODULE_0__.useService)('translate');
  const debounce = (0,bpmn_js_properties_panel__WEBPACK_IMPORTED_MODULE_0__.useService)('debounceInput');
  const setValue = value => {
    updateItemProperty(element, item, {
      schema: value || ''
    }, modeling);
  };
  const getValue = () => {
    return item.schema || '';
  };
  return (0,_bpmn_io_properties_panel__WEBPACK_IMPORTED_MODULE_2__.TextAreaEntry)({
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
  const modeling = (0,bpmn_js_properties_panel__WEBPACK_IMPORTED_MODULE_0__.useService)('modeling');
  const translate = (0,bpmn_js_properties_panel__WEBPACK_IMPORTED_MODULE_0__.useService)('translate');
  const debounce = (0,bpmn_js_properties_panel__WEBPACK_IMPORTED_MODULE_0__.useService)('debounceInput');
  const setValue = value => {
    updateItemProperty(element, item, {
      required: value
    }, modeling);
  };
  const getValue = () => {
    return item.required;
  };
  return (0,_bpmn_io_properties_panel__WEBPACK_IMPORTED_MODULE_2__.CheckboxEntry)({
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

// ensure we load after element templates
const EVEN_LOWER_PRIORITY = 299;

/**
 * An extension that makes process IO mappings configurable via a new
 * properties tab.
 *
 * @param {import('didi').Injector} injector
 */
class ProcessIoExtensionProvider {
  constructor(propertiesPanel, injector) {
    this._injector = injector;
    propertiesPanel.registerProvider(EVEN_LOWER_PRIORITY, this);
  }
  getGroups(element) {
    return groups => {
      const result = groups.slice();

      // "Tool inputs" group for start events and AHSP children
      if (isToolInputTarget(element)) {
        const insertIndex = findInsertIndex(result);
        result.splice(insertIndex, 0, createToolInputsGroup(element, this._injector));
      }
      return result;
    };
  }
}
function isToolInputTarget(element) {
  const bo = (0,bpmn_js_lib_util_ModelUtil_js__WEBPACK_IMPORTED_MODULE_1__.getBusinessObject)(element);
  if ((0,bpmn_js_lib_util_ModelUtil_js__WEBPACK_IMPORTED_MODULE_1__.is)(element, 'bpmn:StartEvent') && (0,bpmn_js_lib_util_ModelUtil_js__WEBPACK_IMPORTED_MODULE_1__.is)(bo.$parent, 'bpmn:Process')) {
    return true;
  }
  if ((0,bpmn_js_lib_util_ModelUtil_js__WEBPACK_IMPORTED_MODULE_1__.is)(element, 'bpmn:FlowNode') && (0,bpmn_js_lib_util_ModelUtil_js__WEBPACK_IMPORTED_MODULE_1__.is)(bo.$parent, 'bpmn:AdHocSubProcess')) {
    return true;
  }
  return false;
}
function findInsertIndex(groups) {
  let afterGroups = ['general', 'documentation', 'general', 'ElementTemplates__Template'];
  let beforeGroups = ['inputs', 'outputs', 'ElementTemplates__CustomProperties-output'];
  let insertBefore = null;
  let insertAfter = 0;
  for (let i = groups.length - 1; i >= 0; i--) {
    const group = groups[i];

    // select last before group in list
    if (beforeGroups.includes(group.id)) {
      insertBefore = i;
    }

    // find first after group in list
    if (afterGroups.includes(group.id)) {
      insertAfter = i;
      break;
    }
  }
  if (insertBefore === null) {
    return insertAfter + 1;
  }
  return insertBefore;
}
ProcessIoExtensionProvider.$inject = ['propertiesPanel', 'injector'];
var zeebeExternalParameters = {
  name: 'ZeebeExternalParametersExtension',
  prefix: 'specext',
  uri: 'http://camunda.org/schema/spec-extension/1.0',
  xml: {
    tagAlias: 'lowerCase'
  },
  associations: [],
  types: [{
    name: 'ExternalParameters',
    superClass: ['Element'],
    properties: [{
      name: 'inputSpecification',
      type: 'InputSpecification',
      isMany: true,
      xml: {
        serialize: 'asElement'
      }
    }]
  }, {
    name: 'InputSpecification',
    superClass: ['Element'],
    properties: [{
      name: 'name',
      isAttr: true,
      type: 'String'
    }, {
      name: 'description',
      isAttr: true,
      type: 'String'
    }, {
      name: 'type',
      isAttr: true,
      type: 'String'
    }, {
      name: 'required',
      isAttr: true,
      type: 'Boolean'
    }, {
      name: 'schema',
      isAttr: true,
      type: 'String'
    }]
  }],
  enumerations: []
};
var index = {
  __init__: ['propertiesPanelIoExtensionProvider'],
  propertiesPanelIoExtensionProvider: ['type', ProcessIoExtensionProvider]
};


/***/ },

/***/ "../../node_modules/ids/dist/index.js"
/*!********************************************!*\
  !*** ../../node_modules/ids/dist/index.js ***!
  \********************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ids: () => (/* binding */ Ids)
/* harmony export */ });
function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var hat$1 = {exports: {}};

var hasRequiredHat;

function requireHat () {
	if (hasRequiredHat) return hat$1.exports;
	hasRequiredHat = 1;
	var hat = hat$1.exports = function (bits, base) {
	    if (!base) base = 16;
	    if (bits === undefined) bits = 128;
	    if (bits <= 0) return '0';
	    
	    var digits = Math.log(Math.pow(2, bits)) / Math.log(base);
	    for (var i = 2; digits === Infinity; i *= 2) {
	        digits = Math.log(Math.pow(2, bits / i)) / Math.log(base) * i;
	    }
	    
	    var rem = digits - Math.floor(digits);
	    
	    var res = '';
	    
	    for (var i = 0; i < Math.floor(digits); i++) {
	        var x = Math.floor(Math.random() * base).toString(base);
	        res = x + res;
	    }
	    
	    if (rem) {
	        var b = Math.pow(base, rem);
	        var x = Math.floor(Math.random() * b).toString(base);
	        res = x + res;
	    }
	    
	    var parsed = parseInt(res, base);
	    if (parsed !== Infinity && parsed >= Math.pow(2, bits)) {
	        return hat(bits, base)
	    }
	    else return res;
	};

	hat.rack = function (bits, base, expandBy) {
	    var fn = function (data) {
	        var iters = 0;
	        do {
	            if (iters ++ > 10) {
	                if (expandBy) bits += expandBy;
	                else throw new Error('too many ID collisions, use more bits')
	            }
	            
	            var id = hat(bits, base);
	        } while (Object.hasOwnProperty.call(hats, id));
	        
	        hats[id] = data;
	        return id;
	    };
	    var hats = fn.hats = {};
	    
	    fn.get = function (id) {
	        return fn.hats[id];
	    };
	    
	    fn.set = function (id, value) {
	        fn.hats[id] = value;
	        return fn;
	    };
	    
	    fn.bits = bits || 128;
	    fn.base = base || 16;
	    return fn;
	};
	return hat$1.exports;
}

var hatExports = requireHat();
var hat = /*@__PURE__*/getDefaultExportFromCjs(hatExports);

/**
 * @typedef { [ number, number ] | [ number, number, number ] } Seed
 */

/**
 * Create a new id generator / cache instance.
 *
 * You may optionally provide a seed that is used internally.
 *
 * @param {Seed} [seed]
 */
function Ids(seed) {

  if (!(this instanceof Ids)) {
    return new Ids(seed);
  }

  seed = seed || [ 128, 36, 1 ];
  this._seed = seed.length ? hat.rack(seed[0], seed[1], seed[2]) : seed;
}

/**
 * Generate a next id.
 *
 * @param {Object} [element] element to bind the id to
 *
 * @return {string} id
 */
Ids.prototype.next = function(element) {
  return this._seed(element || true);
};

/**
 * Generate a next id with a given prefix.
 *
 * @param {Object} [element] element to bind the id to
 *
 * @return {string} id
 */
Ids.prototype.nextPrefixed = function(prefix, element) {
  var id;

  do {
    id = prefix + this.next(true);
  } while (this.assigned(id));

  // claim {prefix}{random}
  this.claim(id, element);

  // return
  return id;
};

/**
 * Manually claim an existing id.
 *
 * @param {string} id
 * @param {any} [element] element the id is claimed by
 */
Ids.prototype.claim = function(id, element) {
  this._seed.set(id, element || true);
};

/**
 * Returns true if the given id has already been assigned.
 *
 * @param  {string} id
 * @return {boolean}
 */
Ids.prototype.assigned = function(id) {
  return this._seed.get(id) || false;
};

/**
 * Unclaim an id.
 *
 * @param  {string} id the id to unclaim
 */
Ids.prototype.unclaim = function(id) {
  delete this._seed.hats[id];
};


/**
 * Clear all claimed ids.
 */
Ids.prototype.clear = function() {

  var hats = this._seed.hats,
      id;

  for (id in hats) {
    this.unclaim(id);
  }
};




/***/ },

/***/ "../../node_modules/min-dash/dist/index.js"
/*!*************************************************!*\
  !*** ../../node_modules/min-dash/dist/index.js ***!
  \*************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   assign: () => (/* binding */ assign),
/* harmony export */   bind: () => (/* binding */ bind),
/* harmony export */   debounce: () => (/* binding */ debounce),
/* harmony export */   ensureArray: () => (/* binding */ ensureArray),
/* harmony export */   every: () => (/* binding */ every),
/* harmony export */   filter: () => (/* binding */ filter),
/* harmony export */   find: () => (/* binding */ find),
/* harmony export */   findIndex: () => (/* binding */ findIndex),
/* harmony export */   flatten: () => (/* binding */ flatten),
/* harmony export */   forEach: () => (/* binding */ forEach),
/* harmony export */   get: () => (/* binding */ get),
/* harmony export */   groupBy: () => (/* binding */ groupBy),
/* harmony export */   has: () => (/* binding */ has),
/* harmony export */   isArray: () => (/* binding */ isArray),
/* harmony export */   isDefined: () => (/* binding */ isDefined),
/* harmony export */   isFunction: () => (/* binding */ isFunction),
/* harmony export */   isNil: () => (/* binding */ isNil),
/* harmony export */   isNumber: () => (/* binding */ isNumber),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   isString: () => (/* binding */ isString),
/* harmony export */   isUndefined: () => (/* binding */ isUndefined),
/* harmony export */   keys: () => (/* binding */ keys),
/* harmony export */   map: () => (/* binding */ map),
/* harmony export */   matchPattern: () => (/* binding */ matchPattern),
/* harmony export */   merge: () => (/* binding */ merge),
/* harmony export */   omit: () => (/* binding */ omit),
/* harmony export */   pick: () => (/* binding */ pick),
/* harmony export */   reduce: () => (/* binding */ reduce),
/* harmony export */   set: () => (/* binding */ set),
/* harmony export */   size: () => (/* binding */ size),
/* harmony export */   some: () => (/* binding */ some),
/* harmony export */   sortBy: () => (/* binding */ sortBy),
/* harmony export */   throttle: () => (/* binding */ throttle),
/* harmony export */   unionBy: () => (/* binding */ unionBy),
/* harmony export */   uniqueBy: () => (/* binding */ uniqueBy),
/* harmony export */   values: () => (/* binding */ values),
/* harmony export */   without: () => (/* binding */ without)
/* harmony export */ });
/**
 * Flatten array, one level deep.
 *
 * @template T
 *
 * @param {T[][] | T[] | null} [arr]
 *
 * @return {T[]}
 */
function flatten(arr) {
  return Array.prototype.concat.apply([], arr);
}

const nativeToString = Object.prototype.toString;
const nativeHasOwnProperty = Object.prototype.hasOwnProperty;

function isUndefined(obj) {
  return obj === undefined;
}

function isDefined(obj) {
  return obj !== undefined;
}

function isNil(obj) {
  return obj == null;
}

function isArray(obj) {
  return nativeToString.call(obj) === '[object Array]';
}

function isObject(obj) {
  return nativeToString.call(obj) === '[object Object]';
}

function isNumber(obj) {
  return nativeToString.call(obj) === '[object Number]';
}

/**
 * @param {any} obj
 *
 * @return {boolean}
 */
function isFunction(obj) {
  const tag = nativeToString.call(obj);

  return (
    tag === '[object Function]' ||
    tag === '[object AsyncFunction]' ||
    tag === '[object GeneratorFunction]' ||
    tag === '[object AsyncGeneratorFunction]' ||
    tag === '[object Proxy]'
  );
}

function isString(obj) {
  return nativeToString.call(obj) === '[object String]';
}


/**
 * Ensure collection is an array.
 *
 * @param {Object} obj
 */
function ensureArray(obj) {

  if (isArray(obj)) {
    return;
  }

  throw new Error('must supply array');
}

/**
 * Return true, if target owns a property with the given key.
 *
 * @param {Object} target
 * @param {String} key
 *
 * @return {Boolean}
 */
function has(target, key) {
  return !isNil(target) && nativeHasOwnProperty.call(target, key);
}

/**
 * @template T
 * @typedef { (
 *   ((e: T) => boolean) |
 *   ((e: T, idx: number) => boolean) |
 *   ((e: T, key: string) => boolean) |
 *   string |
 *   number
 * ) } Matcher
 */

/**
 * @template T
 * @template U
 *
 * @typedef { (
 *   ((e: T) => U) | string | number
 * ) } Extractor
 */


/**
 * @template T
 * @typedef { (val: T, key: any) => boolean } MatchFn
 */

/**
 * @template T
 * @typedef { T[] } ArrayCollection
 */

/**
 * @template T
 * @typedef { { [key: string]: T } } StringKeyValueCollection
 */

/**
 * @template T
 * @typedef { { [key: number]: T } } NumberKeyValueCollection
 */

/**
 * @template T
 * @typedef { StringKeyValueCollection<T> | NumberKeyValueCollection<T> } KeyValueCollection
 */

/**
 * @template T
 * @typedef { KeyValueCollection<T> | ArrayCollection<T> } Collection
 */

/**
 * Find element in collection.
 *
 * @template T
 * @param {Collection<T>} collection
 * @param {Matcher<T>} matcher
 *
 * @return {Object}
 */
function find(collection, matcher) {

  const matchFn = toMatcher(matcher);

  let match;

  forEach(collection, function(val, key) {
    if (matchFn(val, key)) {
      match = val;

      return false;
    }
  });

  return match;

}


/**
 * Find element index in collection.
 *
 * @template T
 * @param {Collection<T>} collection
 * @param {Matcher<T>} matcher
 *
 * @return {number | string | undefined}
 */
function findIndex(collection, matcher) {

  const matchFn = toMatcher(matcher);

  let idx = isArray(collection) ? -1 : undefined;

  forEach(collection, function(val, key) {
    if (matchFn(val, key)) {
      idx = key;

      return false;
    }
  });

  return idx;
}


/**
 * Filter elements in collection.
 *
 * @template T
 * @param {Collection<T>} collection
 * @param {Matcher<T>} matcher
 *
 * @return {T[]} result
 */
function filter(collection, matcher) {

  const matchFn = toMatcher(matcher);

  let result = [];

  forEach(collection, function(val, key) {
    if (matchFn(val, key)) {
      result.push(val);
    }
  });

  return result;
}


/**
 * Iterate over collection; returning something
 * (non-undefined) will stop iteration.
 *
 * @template T
 * @param {Collection<T>} collection
 * @param { ((item: T, idx: number) => (boolean|void)) | ((item: T, key: string) => (boolean|void)) } iterator
 *
 * @return {T} return result that stopped the iteration
 */
function forEach(collection, iterator) {

  let val,
      result;

  if (isUndefined(collection)) {
    return;
  }

  const convertKey = isArray(collection) ? toNum : identity;

  for (let key in collection) {

    if (has(collection, key)) {
      val = collection[key];

      result = iterator(val, convertKey(key));

      if (result === false) {
        return val;
      }
    }
  }
}

/**
 * Return collection without element.
 *
 * @template T
 * @param {ArrayCollection<T>} arr
 * @param {Matcher<T>} matcher
 *
 * @return {T[]}
 */
function without(arr, matcher) {

  if (isUndefined(arr)) {
    return [];
  }

  ensureArray(arr);

  const matchFn = toMatcher(matcher);

  return arr.filter(function(el, idx) {
    return !matchFn(el, idx);
  });

}


/**
 * Reduce collection, returning a single result.
 *
 * @template T
 * @template V
 *
 * @param {Collection<T>} collection
 * @param {(result: V, entry: T, index: any) => V} iterator
 * @param {V} result
 *
 * @return {V} result returned from last iterator
 */
function reduce(collection, iterator, result) {

  forEach(collection, function(value, idx) {
    result = iterator(result, value, idx);
  });

  return result;
}


/**
 * Return true if every element in the collection
 * matches the criteria.
 *
 * @param  {Object|Array} collection
 * @param  {Function} matcher
 *
 * @return {Boolean}
 */
function every(collection, matcher) {

  return !!reduce(collection, function(matches, val, key) {
    return matches && matcher(val, key);
  }, true);
}


/**
 * Return true if some elements in the collection
 * match the criteria.
 *
 * @param  {Object|Array} collection
 * @param  {Function} matcher
 *
 * @return {Boolean}
 */
function some(collection, matcher) {

  return !!find(collection, matcher);
}


/**
 * Transform a collection into another collection
 * by piping each member through the given fn.
 *
 * @param  {Object|Array}   collection
 * @param  {Function} fn
 *
 * @return {Array} transformed collection
 */
function map(collection, fn) {

  let result = [];

  forEach(collection, function(val, key) {
    result.push(fn(val, key));
  });

  return result;
}


/**
 * Get the collections keys.
 *
 * @param  {Object|Array} collection
 *
 * @return {Array}
 */
function keys(collection) {
  return collection && Object.keys(collection) || [];
}


/**
 * Shorthand for `keys(o).length`.
 *
 * @param  {Object|Array} collection
 *
 * @return {Number}
 */
function size(collection) {
  return keys(collection).length;
}


/**
 * Get the values in the collection.
 *
 * @param  {Object|Array} collection
 *
 * @return {Array}
 */
function values(collection) {
  return map(collection, (val) => val);
}


/**
 * Group collection members by attribute.
 *
 * @param {Object|Array} collection
 * @param {Extractor} extractor
 *
 * @return {Object} map with { attrValue => [ a, b, c ] }
 */
function groupBy(collection, extractor, grouped = {}) {

  extractor = toExtractor(extractor);

  forEach(collection, function(val) {
    let discriminator = extractor(val) || '_';

    let group = grouped[discriminator];

    if (!group) {
      group = grouped[discriminator] = [];
    }

    group.push(val);
  });

  return grouped;
}


function uniqueBy(extractor, ...collections) {

  extractor = toExtractor(extractor);

  let grouped = {};

  forEach(collections, (c) => groupBy(c, extractor, grouped));

  let result = map(grouped, function(val, key) {
    return val[0];
  });

  return result;
}


const unionBy = uniqueBy;



/**
 * Sort collection by criteria.
 *
 * @template T
 *
 * @param {Collection<T>} collection
 * @param {Extractor<T, number | string>} extractor
 *
 * @return {Array}
 */
function sortBy(collection, extractor) {

  extractor = toExtractor(extractor);

  let sorted = [];

  forEach(collection, function(value, key) {
    let disc = extractor(value, key);

    let entry = {
      d: disc,
      v: value
    };

    for (var idx = 0; idx < sorted.length; idx++) {
      let { d } = sorted[idx];

      if (disc < d) {
        sorted.splice(idx, 0, entry);
        return;
      }
    }

    // not inserted, append (!)
    sorted.push(entry);
  });

  return map(sorted, (e) => e.v);
}


/**
 * Create an object pattern matcher.
 *
 * @example
 *
 * ```javascript
 * const matcher = matchPattern({ id: 1 });
 *
 * let element = find(elements, matcher);
 * ```
 *
 * @template T
 *
 * @param {T} pattern
 *
 * @return { (el: any) =>  boolean } matcherFn
 */
function matchPattern(pattern) {

  return function(el) {

    return every(pattern, function(val, key) {
      return el[key] === val;
    });

  };
}


/**
 * @param {string | ((e: any) => any) } extractor
 *
 * @return { (e: any) => any }
 */
function toExtractor(extractor) {

  /**
   * @satisfies { (e: any) => any }
   */
  return isFunction(extractor) ? extractor : (e) => {

    // @ts-ignore: just works
    return e[extractor];
  };
}


/**
 * @template T
 * @param {Matcher<T>} matcher
 *
 * @return {MatchFn<T>}
 */
function toMatcher(matcher) {
  return isFunction(matcher) ? matcher : (e) => {
    return e === matcher;
  };
}


function identity(arg) {
  return arg;
}

function toNum(arg) {
  return Number(arg);
}

/**
 * @typedef { {
 *   (...args: any[]): any;
 *   flush: () => void;
 *   cancel: () => void;
 * } } DebouncedFunction
 */

/**
 * Debounce fn, calling it only once if the given time
 * elapsed between calls.
 *
 * Lodash-style the function exposes methods to `#clear`
 * and `#flush` to control internal behavior.
 *
 * @param  {Function} fn
 * @param  {Number} timeout
 *
 * @return {DebouncedFunction} debounced function
 */
function debounce(fn, timeout) {

  let timer;

  let lastArgs;
  let lastThis;

  let lastNow;

  function fire(force) {

    let now = Date.now();

    let scheduledDiff = force ? 0 : (lastNow + timeout) - now;

    if (scheduledDiff > 0) {
      return schedule(scheduledDiff);
    }

    fn.apply(lastThis, lastArgs);

    clear();
  }

  function schedule(timeout) {
    timer = setTimeout(fire, timeout);
  }

  function clear() {
    if (timer) {
      clearTimeout(timer);
    }

    timer = lastNow = lastArgs = lastThis = undefined;
  }

  function flush() {
    if (timer) {
      fire(true);
    }

    clear();
  }

  /**
   * @type { DebouncedFunction }
   */
  function callback(...args) {
    lastNow = Date.now();

    lastArgs = args;
    lastThis = this;

    // ensure an execution is scheduled
    if (!timer) {
      schedule(timeout);
    }
  }

  callback.flush = flush;
  callback.cancel = clear;

  return callback;
}

/**
 * Throttle fn, calling at most once
 * in the given interval.
 *
 * @param  {Function} fn
 * @param  {Number} interval
 *
 * @return {Function} throttled function
 */
function throttle(fn, interval) {
  let throttling = false;

  return function(...args) {

    if (throttling) {
      return;
    }

    fn(...args);
    throttling = true;

    setTimeout(() => {
      throttling = false;
    }, interval);
  };
}

/**
 * Bind function against target <this>.
 *
 * @param  {Function} fn
 * @param  {Object}   target
 *
 * @return {Function} bound function
 */
function bind(fn, target) {
  return fn.bind(target);
}

/**
 * Convenience wrapper for `Object.assign`.
 *
 * @param {Object} target
 * @param {...Object} others
 *
 * @return {Object} the target
 */
function assign(target, ...others) {
  return Object.assign(target, ...others);
}

/**
 * Sets a nested property of a given object to the specified value.
 *
 * This mutates the object and returns it.
 *
 * @template T
 *
 * @param {T} target The target of the set operation.
 * @param {(string|number)[]} path The path to the nested value.
 * @param {any} value The value to set.
 *
 * @return {T}
 */
function set(target, path, value) {

  let currentTarget = target;

  forEach(path, function(key, idx) {

    if (typeof key !== 'number' && typeof key !== 'string') {
      throw new Error('illegal key type: ' + typeof key + '. Key should be of type number or string.');
    }

    if (key === 'constructor') {
      throw new Error('illegal key: constructor');
    }

    if (key === '__proto__') {
      throw new Error('illegal key: __proto__');
    }

    let nextKey = path[idx + 1];
    let nextTarget = currentTarget[key];

    if (isDefined(nextKey) && isNil(nextTarget)) {
      nextTarget = currentTarget[key] = isNaN(+nextKey) ? {} : [];
    }

    if (isUndefined(nextKey)) {
      if (isUndefined(value)) {
        delete currentTarget[key];
      } else {
        currentTarget[key] = value;
      }
    } else {
      currentTarget = nextTarget;
    }
  });

  return target;
}


/**
 * Gets a nested property of a given object.
 *
 * @param {Object} target The target of the get operation.
 * @param {(string|number)[]} path The path to the nested value.
 * @param {any} [defaultValue] The value to return if no value exists.
 *
 * @return {any}
 */
function get(target, path, defaultValue) {

  let currentTarget = target;

  forEach(path, function(key) {

    // accessing nil property yields <undefined>
    if (isNil(currentTarget)) {
      currentTarget = undefined;

      return false;
    }

    currentTarget = currentTarget[key];
  });

  return isUndefined(currentTarget) ? defaultValue : currentTarget;
}

/**
 * Pick properties from the given target.
 *
 * @template T
 * @template {any[]} V
 *
 * @param {T} target
 * @param {V} properties
 *
 * @return Pick<T, V>
 */
function pick(target, properties) {

  let result = {};

  let obj = Object(target);

  forEach(properties, function(prop) {

    if (prop in obj) {
      result[prop] = target[prop];
    }
  });

  return result;
}

/**
 * Pick all target properties, excluding the given ones.
 *
 * @template T
 * @template {any[]} V
 *
 * @param {T} target
 * @param {V} properties
 *
 * @return {Omit<T, V>} target
 */
function omit(target, properties) {

  let result = {};

  let obj = Object(target);

  forEach(obj, function(prop, key) {

    if (properties.indexOf(key) === -1) {
      result[key] = prop;
    }
  });

  return result;
}

/**
 * Recursively merge `...sources` into given target.
 *
 * Does support merging objects; does not support merging arrays.
 *
 * @param {Object} target
 * @param {...Object} sources
 *
 * @return {Object} the target
 */
function merge(target, ...sources) {

  if (!sources.length) {
    return target;
  }

  forEach(sources, function(source) {

    // skip non-obj sources, i.e. null
    if (!source || !isObject(source)) {
      return;
    }

    forEach(source, function(sourceVal, key) {

      if (key === '__proto__') {
        return;
      }

      let targetVal = target[key];

      if (isObject(sourceVal)) {

        if (!isObject(targetVal)) {

          // override target[key] with object
          targetVal = {};
        }

        target[key] = merge(targetVal, sourceVal);
      } else {
        target[key] = sourceVal;
      }

    });
  });

  return target;
}




/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!**************************!*\
  !*** ./client/client.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var camunda_modeler_plugin_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! camunda-modeler-plugin-helpers */ "../../node_modules/camunda-modeler-plugin-helpers/index.js");
/* harmony import */ var zeebe_io_properties_panel_extension__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zeebe-io-properties-panel-extension */ "../zeebe-io-properties-panel-extension/dist/index.js");


(0,camunda_modeler_plugin_helpers__WEBPACK_IMPORTED_MODULE_0__.registerCloudBpmnJSPlugin)(zeebe_io_properties_panel_extension__WEBPACK_IMPORTED_MODULE_1__["default"]);
(0,camunda_modeler_plugin_helpers__WEBPACK_IMPORTED_MODULE_0__.registerCloudBpmnJSModdleExtension)(zeebe_io_properties_panel_extension__WEBPACK_IMPORTED_MODULE_1__.externalParametersModdle);
})();

/******/ })()
;
//# sourceMappingURL=client-bundle.js.map