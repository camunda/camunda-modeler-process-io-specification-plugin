/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/client.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/client.js":
/*!**************************!*\
  !*** ./client/client.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var camunda_modeler_plugin_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! camunda-modeler-plugin-helpers */ "./node_modules/camunda-modeler-plugin-helpers/index.js");
/* harmony import */ var _properties_panel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./properties-panel */ "./client/properties-panel/index.js");




Object(camunda_modeler_plugin_helpers__WEBPACK_IMPORTED_MODULE_0__["registerPlatformBpmnJSPlugin"])(_properties_panel__WEBPACK_IMPORTED_MODULE_1__["default"]);


/***/ }),

/***/ "./client/properties-panel/extensions-helper.js":
/*!******************************************************!*\
  !*** ./client/properties-panel/extensions-helper.js ***!
  \******************************************************/
/*! exports provided: findExtensions, getExtensionElements, getCamundaProperties, createExtensionElements, createCamundaProperties, createElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findExtensions", function() { return findExtensions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getExtensionElements", function() { return getExtensionElements; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCamundaProperties", function() { return getCamundaProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createExtensionElements", function() { return createExtensionElements; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createCamundaProperties", function() { return createCamundaProperties; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony import */ var bpmn_js_lib_features_modeling_util_ModelingUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bpmn-js/lib/features/modeling/util/ModelingUtil */ "./node_modules/bpmn-js/lib/features/modeling/util/ModelingUtil.js");
/* harmony import */ var bpmn_js_lib_util_ModelUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bpmn-js/lib/util/ModelUtil */ "./node_modules/bpmn-js/lib/util/ModelUtil.js");



function findExtensions(element, types) {
  const extensionElements = getExtensionElements(element);

  if (!extensionElements) {
    return [];
  }

  return extensionElements.get('values').filter((value) => {
    return Object(bpmn_js_lib_features_modeling_util_ModelingUtil__WEBPACK_IMPORTED_MODULE_0__["isAny"])(value, [].concat(types));
  });
}

function getExtensionElements(element) {
  const businessObject = Object(bpmn_js_lib_util_ModelUtil__WEBPACK_IMPORTED_MODULE_1__["getBusinessObject"])(element);

  return businessObject.get('extensionElements');
}

function getCamundaProperties(element) {
  const bo = Object(bpmn_js_lib_util_ModelUtil__WEBPACK_IMPORTED_MODULE_1__["getBusinessObject"])(element);

  const properties = findExtensions(bo, 'camunda:Properties') || [];

  if (properties.length) {
    return properties[0];
  }

  return null;
}

function createExtensionElements(element, bpmnFactory) {
  const bo = Object(bpmn_js_lib_util_ModelUtil__WEBPACK_IMPORTED_MODULE_1__["getBusinessObject"])(element);

  return createElement('bpmn:ExtensionElements', { values: [] }, bo, bpmnFactory);
}

function createCamundaProperties(extensionElements, bpmnFactory, properties) {
  return createElement('camunda:Properties', properties, extensionElements, bpmnFactory);
}

function createElement(elementType, properties, parent, factory) {
  const element = factory.create(elementType, properties);
  element.$parent = parent;

  return element;
}


/***/ }),

/***/ "./client/properties-panel/index.js":
/*!******************************************!*\
  !*** ./client/properties-panel/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _process_io_extension_provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./process-io-extension-provider */ "./client/properties-panel/process-io-extension-provider.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  __init__: [ 'processIoExtensionProvider' ],
  processIoExtensionProvider: [ 'type', _process_io_extension_provider__WEBPACK_IMPORTED_MODULE_0__["default"] ]
});

/***/ }),

/***/ "./client/properties-panel/process-io-extension-provider.js":
/*!******************************************************************!*\
  !*** ./client/properties-panel/process-io-extension-provider.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ProcessIoExtensionProvider; });
/* harmony import */ var bpmn_js_lib_util_ModelUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bpmn-js/lib/util/ModelUtil */ "./node_modules/bpmn-js/lib/util/ModelUtil.js");
/* harmony import */ var _props_process_io_groups__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./props/process-io-groups */ "./client/properties-panel/props/process-io-groups.js");






/**
 * An extension that makes process IO mappings configurable via a new
 * properties tab.
 *
 * @param {didi.Injector} injector
 */
class ProcessIoExtensionProvider {
  constructor(propertiesPanel, injector) {
    this._injector = injector;
    propertiesPanel.registerProvider(this);
  }

  getGroups(element) {
    return groups => {
      if (!Object(bpmn_js_lib_util_ModelUtil__WEBPACK_IMPORTED_MODULE_0__["is"])(element, 'bpmn:Process') || Object(bpmn_js_lib_util_ModelUtil__WEBPACK_IMPORTED_MODULE_0__["is"])(element, 'bpmn:Participant') && !getProcessRef(element)) {
        return groups;
      }

      groups = groups.slice();

      groups.splice(1, 0,
        Object(_props_process_io_groups__WEBPACK_IMPORTED_MODULE_1__["createInputSpecificationGroup"])(element, this._injector),
        Object(_props_process_io_groups__WEBPACK_IMPORTED_MODULE_1__["createOutputSpecificationGroup"])(element, this._injector)
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
  const bo = Object(bpmn_js_lib_util_ModelUtil__WEBPACK_IMPORTED_MODULE_0__["getBusinessObject"])(element);

  return bo.processRef;
}


/***/ }),

/***/ "./client/properties-panel/process-io-helper.js":
/*!******************************************************!*\
  !*** ./client/properties-panel/process-io-helper.js ***!
  \******************************************************/
/*! exports provided: isIoProperty, parseIoPropertyValue, parseIoProperty, getIoPropertyProps, createIoProperty, updateIoProperty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIoProperty", function() { return isIoProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseIoPropertyValue", function() { return parseIoPropertyValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseIoProperty", function() { return parseIoProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIoPropertyProps", function() { return getIoPropertyProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createIoProperty", function() { return createIoProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateIoProperty", function() { return updateIoProperty; });
/**
 * Check whether camunda:property is a input or output property.
 *
 * @param {ModdleElement} prop
 *
 * @return {boolean}
 */
function isIoProperty(prop) {

  const {
    name
  } = prop;

  return /^(input|output):/.test(name);
}

function parseIoPropertyValue(value) {
  try {
    return JSON.parse(value);
  } catch (e) {
    return {};
  }
}

/**
 * Parse <camunda:property name="{input|output}:$variableName" value="$type;$description" />.
 *
 * @param {ModdleElement} prop
 *
 * @return {Object}
 */
function parseIoProperty(prop) {

  const [
    _0,
    type,
    name
  ] = /^(input|output):(.*)/.exec(prop.name);

  const [
    _1,
    dataType,
    description
  ] = /^([^;]+);(.*)/s.exec(prop.value);

  return {
    name,
    type,
    dataType,
    description
  };
}

function getIoPropertyProps(options) {

  var {
    name,
    type,
    dataType,
    description
  } = options;

  var propertyName = `${type}:${name}`;

  var propertyValue = `${dataType};${description}`;

  return {
    name: propertyName,
    value: propertyValue
  };
}

function createIoProperty(factory, options) {
  return factory.create('camunda:Property', getIoPropertyProps(options));
}

/**
 * Craft the UPDATE command to set a property value.
 */
function updateIoProperty(element, property, newProps, modeling) {
  const currentProps = parseIoProperty(property);

  const props = getIoPropertyProps({
    ...currentProps,
    ...newProps
  });

  return modeling.updateModdleProperties(element, property, props);
}


/***/ }),

/***/ "./client/properties-panel/props/process-io-groups.js":
/*!************************************************************!*\
  !*** ./client/properties-panel/props/process-io-groups.js ***!
  \************************************************************/
/*! exports provided: createInputSpecificationGroup, createOutputSpecificationGroup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createInputSpecificationGroup", function() { return createInputSpecificationGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createOutputSpecificationGroup", function() { return createOutputSpecificationGroup; });
/* harmony import */ var bpmn_js_properties_panel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bpmn-js-properties-panel */ "./node_modules/camunda-modeler-plugin-helpers/vendor/bpmn-js-properties-panel.js");
/* harmony import */ var bpmn_js_properties_panel__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bpmn_js_properties_panel__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var bpmn_js_lib_util_ModelUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bpmn-js/lib/util/ModelUtil */ "./node_modules/bpmn-js/lib/util/ModelUtil.js");
/* harmony import */ var _bpmn_io_properties_panel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @bpmn-io/properties-panel */ "./node_modules/camunda-modeler-plugin-helpers/vendor/@bpmn-io/properties-panel/index.js");
/* harmony import */ var _bpmn_io_properties_panel__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_bpmn_io_properties_panel__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _process_io_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../process-io-helper */ "./client/properties-panel/process-io-helper.js");
/* harmony import */ var _extensions_helper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../extensions-helper */ "./client/properties-panel/extensions-helper.js");
/* harmony import */ var ids__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ids */ "./node_modules/ids/dist/index.esm.js");













const ids = new ids__WEBPACK_IMPORTED_MODULE_5__["default"]([ 16, 36, 1 ]);

function createInputSpecificationGroup(element, injector) {
  const translate = injector.get('translate');

  const processBo = getProcessBo(element);

  const properties = getIOSpecificationProperties('input', processBo);

  const inputSpecificationGroup = {
    id: 'input-specification-group',
    label: translate('Input specification'),
    component: _bpmn_io_properties_panel__WEBPACK_IMPORTED_MODULE_2__["ListGroup"],
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

function createOutputSpecificationGroup(element, injector) {
  const translate = injector.get('translate');

  const processBo = getProcessBo(element);

  const properties = getIOSpecificationProperties('output', processBo);

  const outputSpecificationGroup = {
    id: 'output-specification-group',
    label: translate('Output specification'),
    component: _bpmn_io_properties_panel__WEBPACK_IMPORTED_MODULE_2__["ListGroup"],
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

    const property = Object(_process_io_helper__WEBPACK_IMPORTED_MODULE_3__["createIoProperty"])(bpmnFactory, {
      type: propertyType,
      name: `var_${ids.next()}`,
      dataType: 'String',
      description: ''
    });

    const businessObject = Object(bpmn_js_lib_util_ModelUtil__WEBPACK_IMPORTED_MODULE_1__["getBusinessObject"])(element);

    const extensionElements = Object(_extensions_helper__WEBPACK_IMPORTED_MODULE_4__["getExtensionElements"])(element),
          camundaProperties = Object(_extensions_helper__WEBPACK_IMPORTED_MODULE_4__["getCamundaProperties"])(businessObject);

    let updatedBusinessObject, update;

    if (!extensionElements) {
      updatedBusinessObject = businessObject;

      const extensionElements = Object(_extensions_helper__WEBPACK_IMPORTED_MODULE_4__["createExtensionElements"])(businessObject, bpmnFactory),
            camundaProperties = Object(_extensions_helper__WEBPACK_IMPORTED_MODULE_4__["createCamundaProperties"])(extensionElements, bpmnFactory, { values: [ property ] });
      extensionElements.values.push(camundaProperties);
      property.$parent = camundaProperties;

      update = { extensionElements };
    } else if (!camundaProperties) {
      updatedBusinessObject = extensionElements;

      const camundaProperties = Object(_extensions_helper__WEBPACK_IMPORTED_MODULE_4__["createCamundaProperties"])(extensionElements, bpmnFactory, { values: [ property ] });
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

    const businessObject = Object(bpmn_js_lib_util_ModelUtil__WEBPACK_IMPORTED_MODULE_1__["getBusinessObject"])(element);

    const camundaProperties = Object(_extensions_helper__WEBPACK_IMPORTED_MODULE_4__["getCamundaProperties"])(businessObject);

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

  const parsed = Object(_process_io_helper__WEBPACK_IMPORTED_MODULE_3__["parseIoProperty"])(property);

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

  const modeling = Object(bpmn_js_properties_panel__WEBPACK_IMPORTED_MODULE_0__["useService"])('modeling');
  const translate = Object(bpmn_js_properties_panel__WEBPACK_IMPORTED_MODULE_0__["useService"])('translate');
  const debounce = Object(bpmn_js_properties_panel__WEBPACK_IMPORTED_MODULE_0__["useService"])('debounceInput');

  const setValue = (value) => {
    Object(_process_io_helper__WEBPACK_IMPORTED_MODULE_3__["updateIoProperty"])(element, property, { name: value || '' }, modeling);
  };

  const getValue = () => {
    return Object(_process_io_helper__WEBPACK_IMPORTED_MODULE_3__["parseIoProperty"])(property).name || '';
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

  return Object(_bpmn_io_properties_panel__WEBPACK_IMPORTED_MODULE_2__["TextFieldEntry"])({
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

  const modeling = Object(bpmn_js_properties_panel__WEBPACK_IMPORTED_MODULE_0__["useService"])('modeling');
  const translate = Object(bpmn_js_properties_panel__WEBPACK_IMPORTED_MODULE_0__["useService"])('translate');

  const setValue = (value) => {
    Object(_process_io_helper__WEBPACK_IMPORTED_MODULE_3__["updateIoProperty"])(element, property, { dataType: value }, modeling);
  };

  const getValue = () => {
    return Object(_process_io_helper__WEBPACK_IMPORTED_MODULE_3__["parseIoProperty"])(property).dataType || 'String';
  };

  return Object(_bpmn_io_properties_panel__WEBPACK_IMPORTED_MODULE_2__["SelectEntry"])({
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

  const modeling = Object(bpmn_js_properties_panel__WEBPACK_IMPORTED_MODULE_0__["useService"])('modeling');
  const translate = Object(bpmn_js_properties_panel__WEBPACK_IMPORTED_MODULE_0__["useService"])('translate');
  const debounce = Object(bpmn_js_properties_panel__WEBPACK_IMPORTED_MODULE_0__["useService"])('debounceInput');

  const setValue = (value) => {
    Object(_process_io_helper__WEBPACK_IMPORTED_MODULE_3__["updateIoProperty"])(element, property, { description: value || '' }, modeling);
  };

  const getValue = () => {
    return Object(_process_io_helper__WEBPACK_IMPORTED_MODULE_3__["parseIoProperty"])(property).description || '';
  };

  return Object(_bpmn_io_properties_panel__WEBPACK_IMPORTED_MODULE_2__["TextAreaEntry"])({
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
  const bo = Object(bpmn_js_lib_util_ModelUtil__WEBPACK_IMPORTED_MODULE_1__["getBusinessObject"])(element);

  if (Object(bpmn_js_lib_util_ModelUtil__WEBPACK_IMPORTED_MODULE_1__["is"])(element, 'bpmn:Participant')) {
    bo = bo.processRef;
  }

  return bo;
}

function getIOSpecificationProperties(type, processBo) {
  const camundaProperties = Object(_extensions_helper__WEBPACK_IMPORTED_MODULE_4__["getCamundaProperties"])(processBo);

  if (!camundaProperties) {
    return [];
  }

  return camundaProperties.get('values')
    .filter(property => Object(_process_io_helper__WEBPACK_IMPORTED_MODULE_3__["isIoProperty"])(property))
    .filter(property => Object(_process_io_helper__WEBPACK_IMPORTED_MODULE_3__["parseIoProperty"])(property).type === type);
}


/***/ }),

/***/ "./node_modules/bpmn-js/lib/features/modeling/util/ModelingUtil.js":
/*!*************************************************************************!*\
  !*** ./node_modules/bpmn-js/lib/features/modeling/util/ModelingUtil.js ***!
  \*************************************************************************/
/*! exports provided: isAny, getParent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAny", function() { return isAny; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParent", function() { return getParent; });
/* harmony import */ var min_dash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! min-dash */ "./node_modules/min-dash/dist/index.esm.js");
/* harmony import */ var _util_ModelUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../util/ModelUtil */ "./node_modules/bpmn-js/lib/util/ModelUtil.js");





/**
 * Return true if element has any of the given types.
 *
 * @param {djs.model.Base} element
 * @param {Array<string>} types
 *
 * @return {boolean}
 */
function isAny(element, types) {
  return Object(min_dash__WEBPACK_IMPORTED_MODULE_0__["some"])(types, function(t) {
    return Object(_util_ModelUtil__WEBPACK_IMPORTED_MODULE_1__["is"])(element, t);
  });
}


/**
 * Return the parent of the element with any of the given types.
 *
 * @param {djs.model.Base} element
 * @param {string|Array<string>} anyType
 *
 * @return {djs.model.Base}
 */
function getParent(element, anyType) {

  if (typeof anyType === 'string') {
    anyType = [ anyType ];
  }

  while ((element = element.parent)) {
    if (isAny(element, anyType)) {
      return element;
    }
  }

  return null;
}

/***/ }),

/***/ "./node_modules/bpmn-js/lib/util/ModelUtil.js":
/*!****************************************************!*\
  !*** ./node_modules/bpmn-js/lib/util/ModelUtil.js ***!
  \****************************************************/
/*! exports provided: is, getBusinessObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "is", function() { return is; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBusinessObject", function() { return getBusinessObject; });
/**
 * Is an element of the given BPMN type?
 *
 * @param  {djs.model.Base|ModdleElement} element
 * @param  {string} type
 *
 * @return {boolean}
 */
function is(element, type) {
  var bo = getBusinessObject(element);

  return bo && (typeof bo.$instanceOf === 'function') && bo.$instanceOf(type);
}


/**
 * Return the business object for a given element.
 *
 * @param  {djs.model.Base|ModdleElement} element
 *
 * @return {ModdleElement}
 */
function getBusinessObject(element) {
  return (element && element.businessObject) || element;
}

/***/ }),

/***/ "./node_modules/camunda-modeler-plugin-helpers/helper.js":
/*!***************************************************************!*\
  !*** ./node_modules/camunda-modeler-plugin-helpers/helper.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports.returnOrThrow = function(getter, minimalModelerVersion) {
  let result;
  try {
    result = getter();
  } catch (error) {}

  if (!result) {
    throw new Error(`Not compatible with Camunda Modeler < ${minimalModelerVersion}`);
  }

  return result;
}


/***/ }),

/***/ "./node_modules/camunda-modeler-plugin-helpers/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/camunda-modeler-plugin-helpers/index.js ***!
  \**************************************************************/
/*! exports provided: registerClientPlugin, registerClientExtension, registerBpmnJSPlugin, registerPlatformBpmnJSPlugin, registerCloudBpmnJSPlugin, registerBpmnJSModdleExtension, registerPlatformBpmnJSModdleExtension, registerCloudBpmnJSModdleExtension, registerDmnJSModdleExtension, registerDmnJSPlugin, getModelerDirectory, getPluginsDirectory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerClientPlugin", function() { return registerClientPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerClientExtension", function() { return registerClientExtension; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerBpmnJSPlugin", function() { return registerBpmnJSPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerPlatformBpmnJSPlugin", function() { return registerPlatformBpmnJSPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerCloudBpmnJSPlugin", function() { return registerCloudBpmnJSPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerBpmnJSModdleExtension", function() { return registerBpmnJSModdleExtension; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerPlatformBpmnJSModdleExtension", function() { return registerPlatformBpmnJSModdleExtension; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerCloudBpmnJSModdleExtension", function() { return registerCloudBpmnJSModdleExtension; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerDmnJSModdleExtension", function() { return registerDmnJSModdleExtension; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerDmnJSPlugin", function() { return registerDmnJSPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getModelerDirectory", function() { return getModelerDirectory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPluginsDirectory", function() { return getPluginsDirectory; });
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

/***/ }),

/***/ "./node_modules/camunda-modeler-plugin-helpers/vendor/@bpmn-io/properties-panel/index.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/camunda-modeler-plugin-helpers/vendor/@bpmn-io/properties-panel/index.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { returnOrThrow } = __webpack_require__(/*! ../../../helper */ "./node_modules/camunda-modeler-plugin-helpers/helper.js");

module.exports = returnOrThrow(() => window.vendor.propertiesPanel.common, '5.0.0');


/***/ }),

/***/ "./node_modules/camunda-modeler-plugin-helpers/vendor/bpmn-js-properties-panel.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/camunda-modeler-plugin-helpers/vendor/bpmn-js-properties-panel.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { returnOrThrow } = __webpack_require__(/*! ../helper */ "./node_modules/camunda-modeler-plugin-helpers/helper.js");

module.exports = returnOrThrow(() => window.vendor.propertiesPanel.bpmn, '5.0.0');


/***/ }),

/***/ "./node_modules/ids/dist/index.esm.js":
/*!********************************************!*\
  !*** ./node_modules/ids/dist/index.esm.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var hat_1 = createCommonjsModule(function (module) {
var hat = module.exports = function (bits, base) {
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
});

/**
 * Create a new id generator / cache instance.
 *
 * You may optionally provide a seed that is used internally.
 *
 * @param {Seed} seed
 */

function Ids(seed) {
  if (!(this instanceof Ids)) {
    return new Ids(seed);
  }

  seed = seed || [128, 36, 1];
  this._seed = seed.length ? hat_1.rack(seed[0], seed[1], seed[2]) : seed;
}
/**
 * Generate a next id.
 *
 * @param {Object} [element] element to bind the id to
 *
 * @return {String} id
 */

Ids.prototype.next = function (element) {
  return this._seed(element || true);
};
/**
 * Generate a next id with a given prefix.
 *
 * @param {Object} [element] element to bind the id to
 *
 * @return {String} id
 */


Ids.prototype.nextPrefixed = function (prefix, element) {
  var id;

  do {
    id = prefix + this.next(true);
  } while (this.assigned(id)); // claim {prefix}{random}


  this.claim(id, element); // return

  return id;
};
/**
 * Manually claim an existing id.
 *
 * @param {String} id
 * @param {String} [element] element the id is claimed by
 */


Ids.prototype.claim = function (id, element) {
  this._seed.set(id, element || true);
};
/**
 * Returns true if the given id has already been assigned.
 *
 * @param  {String} id
 * @return {Boolean}
 */


Ids.prototype.assigned = function (id) {
  return this._seed.get(id) || false;
};
/**
 * Unclaim an id.
 *
 * @param  {String} id the id to unclaim
 */


Ids.prototype.unclaim = function (id) {
  delete this._seed.hats[id];
};
/**
 * Clear all claimed ids.
 */


Ids.prototype.clear = function () {
  var hats = this._seed.hats,
      id;

  for (id in hats) {
    this.unclaim(id);
  }
};

/* harmony default export */ __webpack_exports__["default"] = (Ids);
//# sourceMappingURL=index.esm.js.map


/***/ }),

/***/ "./node_modules/min-dash/dist/index.esm.js":
/*!*************************************************!*\
  !*** ./node_modules/min-dash/dist/index.esm.js ***!
  \*************************************************/
/*! exports provided: assign, bind, debounce, ensureArray, every, filter, find, findIndex, flatten, forEach, get, groupBy, has, isArray, isDefined, isFunction, isNil, isNumber, isObject, isString, isUndefined, keys, map, matchPattern, merge, omit, pick, reduce, set, size, some, sortBy, throttle, unionBy, uniqueBy, values, without */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assign", function() { return assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bind", function() { return bind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return debounce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ensureArray", function() { return ensureArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "every", function() { return every; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filter", function() { return filter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "find", function() { return find; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findIndex", function() { return findIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flatten", function() { return flatten; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "forEach", function() { return forEach; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "groupBy", function() { return groupBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "has", function() { return has; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return isArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isDefined", function() { return isDefined; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNil", function() { return isNil; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumber", function() { return isNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return isString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isUndefined", function() { return isUndefined; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keys", function() { return keys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "matchPattern", function() { return matchPattern; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return merge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "omit", function() { return omit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pick", function() { return pick; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reduce", function() { return reduce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "size", function() { return size; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "some", function() { return some; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortBy", function() { return sortBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throttle", function() { return throttle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unionBy", function() { return unionBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uniqueBy", function() { return uniqueBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "values", function() { return values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "without", function() { return without; });
/**
 * Flatten array, one level deep.
 *
 * @param {Array<?>} arr
 *
 * @return {Array<?>}
 */
function flatten(arr) {
  return Array.prototype.concat.apply([], arr);
}

var nativeToString = Object.prototype.toString;
var nativeHasOwnProperty = Object.prototype.hasOwnProperty;
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
function isFunction(obj) {
  var tag = nativeToString.call(obj);
  return tag === '[object Function]' || tag === '[object AsyncFunction]' || tag === '[object GeneratorFunction]' || tag === '[object AsyncGeneratorFunction]' || tag === '[object Proxy]';
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
  return nativeHasOwnProperty.call(target, key);
}

/**
 * Find element in collection.
 *
 * @param  {Array|Object} collection
 * @param  {Function|Object} matcher
 *
 * @return {Object}
 */

function find(collection, matcher) {
  matcher = toMatcher(matcher);
  var match;
  forEach(collection, function (val, key) {
    if (matcher(val, key)) {
      match = val;
      return false;
    }
  });
  return match;
}
/**
 * Find element index in collection.
 *
 * @param  {Array|Object} collection
 * @param  {Function} matcher
 *
 * @return {Object}
 */

function findIndex(collection, matcher) {
  matcher = toMatcher(matcher);
  var idx = isArray(collection) ? -1 : undefined;
  forEach(collection, function (val, key) {
    if (matcher(val, key)) {
      idx = key;
      return false;
    }
  });
  return idx;
}
/**
 * Find element in collection.
 *
 * @param  {Array|Object} collection
 * @param  {Function} matcher
 *
 * @return {Array} result
 */

function filter(collection, matcher) {
  var result = [];
  forEach(collection, function (val, key) {
    if (matcher(val, key)) {
      result.push(val);
    }
  });
  return result;
}
/**
 * Iterate over collection; returning something
 * (non-undefined) will stop iteration.
 *
 * @param  {Array|Object} collection
 * @param  {Function} iterator
 *
 * @return {Object} return result that stopped the iteration
 */

function forEach(collection, iterator) {
  var val, result;

  if (isUndefined(collection)) {
    return;
  }

  var convertKey = isArray(collection) ? toNum : identity;

  for (var key in collection) {
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
 * @param  {Array} arr
 * @param  {Function} matcher
 *
 * @return {Array}
 */

function without(arr, matcher) {
  if (isUndefined(arr)) {
    return [];
  }

  ensureArray(arr);
  matcher = toMatcher(matcher);
  return arr.filter(function (el, idx) {
    return !matcher(el, idx);
  });
}
/**
 * Reduce collection, returning a single result.
 *
 * @param  {Object|Array} collection
 * @param  {Function} iterator
 * @param  {Any} result
 *
 * @return {Any} result returned from last iterator
 */

function reduce(collection, iterator, result) {
  forEach(collection, function (value, idx) {
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
  return !!reduce(collection, function (matches, val, key) {
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
  var result = [];
  forEach(collection, function (val, key) {
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
  return map(collection, function (val) {
    return val;
  });
}
/**
 * Group collection members by attribute.
 *
 * @param  {Object|Array} collection
 * @param  {Function} extractor
 *
 * @return {Object} map with { attrValue => [ a, b, c ] }
 */

function groupBy(collection, extractor) {
  var grouped = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  extractor = toExtractor(extractor);
  forEach(collection, function (val) {
    var discriminator = extractor(val) || '_';
    var group = grouped[discriminator];

    if (!group) {
      group = grouped[discriminator] = [];
    }

    group.push(val);
  });
  return grouped;
}
function uniqueBy(extractor) {
  extractor = toExtractor(extractor);
  var grouped = {};

  for (var _len = arguments.length, collections = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    collections[_key - 1] = arguments[_key];
  }

  forEach(collections, function (c) {
    return groupBy(c, extractor, grouped);
  });
  var result = map(grouped, function (val, key) {
    return val[0];
  });
  return result;
}
var unionBy = uniqueBy;
/**
 * Sort collection by criteria.
 *
 * @param  {Object|Array} collection
 * @param  {String|Function} extractor
 *
 * @return {Array}
 */

function sortBy(collection, extractor) {
  extractor = toExtractor(extractor);
  var sorted = [];
  forEach(collection, function (value, key) {
    var disc = extractor(value, key);
    var entry = {
      d: disc,
      v: value
    };

    for (var idx = 0; idx < sorted.length; idx++) {
      var d = sorted[idx].d;

      if (disc < d) {
        sorted.splice(idx, 0, entry);
        return;
      }
    } // not inserted, append (!)


    sorted.push(entry);
  });
  return map(sorted, function (e) {
    return e.v;
  });
}
/**
 * Create an object pattern matcher.
 *
 * @example
 *
 * const matcher = matchPattern({ id: 1 });
 *
 * let element = find(elements, matcher);
 *
 * @param  {Object} pattern
 *
 * @return {Function} matcherFn
 */

function matchPattern(pattern) {
  return function (el) {
    return every(pattern, function (val, key) {
      return el[key] === val;
    });
  };
}

function toExtractor(extractor) {
  return isFunction(extractor) ? extractor : function (e) {
    return e[extractor];
  };
}

function toMatcher(matcher) {
  return isFunction(matcher) ? matcher : function (e) {
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
 * Debounce fn, calling it only once if the given time
 * elapsed between calls.
 *
 * Lodash-style the function exposes methods to `#clear`
 * and `#flush` to control internal behavior.
 *
 * @param  {Function} fn
 * @param  {Number} timeout
 *
 * @return {Function} debounced function
 */
function debounce(fn, timeout) {
  var timer;
  var lastArgs;
  var lastThis;
  var lastNow;

  function fire(force) {
    var now = Date.now();
    var scheduledDiff = force ? 0 : lastNow + timeout - now;

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

  function callback() {
    lastNow = Date.now();

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    lastArgs = args;
    lastThis = this; // ensure an execution is scheduled

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
  var throttling = false;
  return function () {
    if (throttling) {
      return;
    }

    fn.apply(void 0, arguments);
    throttling = true;
    setTimeout(function () {
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

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/**
 * Convenience wrapper for `Object.assign`.
 *
 * @param {Object} target
 * @param {...Object} others
 *
 * @return {Object} the target
 */

function assign(target) {
  for (var _len = arguments.length, others = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    others[_key - 1] = arguments[_key];
  }

  return _extends.apply(void 0, [target].concat(others));
}
/**
 * Sets a nested property of a given object to the specified value.
 *
 * This mutates the object and returns it.
 *
 * @param {Object} target The target of the set operation.
 * @param {(string|number)[]} path The path to the nested value.
 * @param {any} value The value to set.
 */

function set(target, path, value) {
  var currentTarget = target;
  forEach(path, function (key, idx) {
    if (typeof key !== 'number' && typeof key !== 'string') {
      throw new Error('illegal key type: ' + _typeof(key) + '. Key should be of type number or string.');
    }

    if (key === 'constructor') {
      throw new Error('illegal key: constructor');
    }

    if (key === '__proto__') {
      throw new Error('illegal key: __proto__');
    }

    var nextKey = path[idx + 1];
    var nextTarget = currentTarget[key];

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
 */

function get(target, path, defaultValue) {
  var currentTarget = target;
  forEach(path, function (key) {
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
 * Pick given properties from the target object.
 *
 * @param {Object} target
 * @param {Array} properties
 *
 * @return {Object} target
 */

function pick(target, properties) {
  var result = {};
  var obj = Object(target);
  forEach(properties, function (prop) {
    if (prop in obj) {
      result[prop] = target[prop];
    }
  });
  return result;
}
/**
 * Pick all target properties, excluding the given ones.
 *
 * @param {Object} target
 * @param {Array} properties
 *
 * @return {Object} target
 */

function omit(target, properties) {
  var result = {};
  var obj = Object(target);
  forEach(obj, function (prop, key) {
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

function merge(target) {
  for (var _len2 = arguments.length, sources = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    sources[_key2 - 1] = arguments[_key2];
  }

  if (!sources.length) {
    return target;
  }

  forEach(sources, function (source) {
    // skip non-obj sources, i.e. null
    if (!source || !isObject(source)) {
      return;
    }

    forEach(source, function (sourceVal, key) {
      if (key === '__proto__') {
        return;
      }

      var targetVal = target[key];

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




/***/ })

/******/ });
//# sourceMappingURL=client-bundle.js.map