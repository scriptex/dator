(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Validator"] = factory();
	else
		root["Validator"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/utils.js
/**
 * Check if an element is part of an array
 *
 * @param  {Array}  array   Array to search in
 * @param  {Object} element Element
 *
 * @return {Boolean}
 */
var isInArray = function isInArray(array, element) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] == element) return true;
  }

  return false;
};
/**
 * Find parent element by selector
 *
 * @param  {Object} elm      DOM Element
 * @param  {String} selector Selectro
 *
 * @return {Object}          DOM Element
 */

var findParentBySelector = function findParentBySelector(elm, selector) {
  var all = document.querySelectorAll(selector);
  var cur = elm;

  while (cur && !isInArray(all, cur)) {
    cur = cur.parentNode;
  }

  return cur;
};
/**
 * Check if element has class
 *
 * @param  {Object} elm DOM Element
 * @param  {String} cls Classname
 *
 * @return {Boolean}
 */

var hasClass = function hasClass(elm, cls) {
  return elm.classList.contains(cls);
};
/**
 * Add class to an element
 *
 * @param  {Object} elm DOM Element
 * @param  {String} cls Classname
 *
 * @return {Void}
 */

var addClass = function addClass(elm, cls) {
  if (hasClass(elm, cls)) {
    return;
  }

  elm.classList.add(cls);
};
/**
 * Remove class from an element
 *
 * @param  {Object} elm DOM Element
 * @param  {String} cls Classname
 *
 * @return {Void}
 */

var removeClass = function removeClass(elm, cls) {
  if (!hasClass(elm, cls)) {
    return;
  }

  elm.classList.remove(cls);
};
// CONCATENATED MODULE: ./src/validation-types.js
/* harmony default export */ var validation_types = ({
  // First Name, Last Name, City
  name: /^[a-zA-Z \-']{3,}$/,
  // Zip Code
  zip: /^\d{5}$/,
  // Select fields, Company Name, Subject, Message, etc
  presence: /.+/,
  // Email address
  email: /^[0-9a-zA-Z]+([0-9a-zA-Z]*[-._+])*[0-9a-zA-Z]+@[0-9a-zA-Z]+([-.][0-9a-zA-Z]+)*([0-9a-zA-Z]*[.])[a-zA-Z]{2,6}$/,
  // Phone Number - XXX-XXX-XXXX, XXXXXXXXXX, XXX.XXX.XXXX or XXX XXX XXXX formats
  phone: /^\d{3}[- .]?\d{3}[- .]?\d{4}$/,
  // Address
  address: /[a-zA-Z0-9 \-]{5,}/,
  // Integer Number
  integer: /^[+-]?\d+$/,
  // Float Number
  float: /^[+-]?(\d+(.\d+)?)/,
  // Credit Card Number
  'credit-card': /^\d{4} \d{4} \d{4} \d{4}$/,
  // Credit Card CVC code
  cvc: /^\d{3,5}$/
});
// CONCATENATED MODULE: ./src/validator.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Internal dependencies
 */



var validator_Validator =
/*#__PURE__*/
function () {
  /**
   * Validator constructor
   *
   * @param  {Object} form        DOM Element
   * @param  {Object} settings    Validator settings
   * @param  {Object} customTypes Validation types
   *
   * @return {Object}				Validator instance
   */
  function Validator() {
    var form = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.querySelector('form');
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var customTypes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Validator);

    this.form = form;
    this.settings = _objectSpread({
      validClass: 'is--valid',
      errorClass: 'is--invalid',
      validatedClass: 'is--validated',
      watch: true,
      classHolder: null,
      beforeValidate: null,
      onSubmit: null,
      afterValidate: null,
      validationTypes: _objectSpread({}, validation_types, customTypes)
    }, settings);
    this.formElements = _toConsumableArray(this.form.elements);
    this.hasJQuery = 'jQuery' in window;
    this.submitHandler = this.submit.bind(this);
    this.elementChangeHandler = this.elementChange.bind(this);
    this.init();
    return this;
  }
  /**
   * Initialize it
   *
   * @return {Object}
   */


  _createClass(Validator, [{
    key: "init",
    value: function init() {
      this.form.setAttribute('novalidate', true);
      this.bind();
      return this;
    }
    /**
     * Get event name
     *
     * @param  {String} type Field type
     *
     * @return {String}
     */

  }, {
    key: "getEventName",
    value: function getEventName(type) {
      switch (type) {
        case 'color':
        case 'date':
        case 'datetime-local':
        case 'email':
        case 'month':
        case 'number':
        case 'password':
        case 'search':
        case 'tel':
        case 'text':
        case 'textarea':
        case 'time':
        case 'url':
        case 'week':
          return 'input';
          break;

        default:
          return 'change';
      }
    }
    /**
     * Attach event listeners
     *
     * @return {Object}
     */

  }, {
    key: "bind",
    value: function bind() {
      var _this = this;

      this.form.addEventListener('submit', this.submitHandler, false);

      if (!this.settings.watch) {
        return this;
      }

      this.formElements.forEach(function (element) {
        var elementType = element.type;

        var eventName = _this.getEventName(elementType);

        if (_this.hasJQuery) {
          jQuery(element).on(eventName, _this.elementChangeHandler).on('validate', _this.elementChangeHandler);
        } else {
          element.addEventListener(eventName, _this.elementChangeHandler, false);
        }
      });
      return this;
    }
    /**
     * Detach event listeners
     *
     * @return {Object}
     */

  }, {
    key: "unbind",
    value: function unbind() {
      var _this2 = this;

      this.form.removeEventListener('submit', this.submitHandler, false);
      this.formElements.forEach(function (element) {
        var elementType = element.type;

        var eventName = _this2.getEventName(elementType);

        if (_this2.hasJQuery) {
          jQuery(element).off(eventName, _this2.elementChangeHandler).off('validate', _this2.elementChangeHandler);
        } else {
          element.removeEventListener(eventName, _this2.elementChangeHandler, false);
        }
      });
      return this;
    }
    /**
     * Submit handler
     *
     * @param  {Object} event
     *
     * @return {Object}
     */

  }, {
    key: "submit",
    value: function submit(event) {
      var elements = this.formElements;
      var elementsLen = elements.length;
      var isValid = true;

      if ('beforeValidate' in this.settings && typeof this.settings.beforeValidate === 'function') {
        this.settings.beforeValidate();
      }

      for (var i = 0; i < elementsLen; i++) {
        if (elements[i].getAttribute('required') !== null) {
          if (!this.validateElement(elements[i])) {
            isValid = false;
          }
        }
      }

      addClass(this.form, this.settings.validatedClass);

      if (!isValid) {
        event.preventDefault();
        removeClass(this.form, this.settings.validClass);
      } else {
        addClass(this.form, this.settings.validClass);

        if ('onSubmit' in this.settings && typeof this.settings.onSubmit === 'function') {
          this.settings.onSubmit(event);
        }
      }

      if ('afterValidate' in this.settings && typeof this.settings.afterValidate === 'function') {
        this.settings.afterValidate();
      }

      return this;
    }
    /**
     * Element change listener
     *
     * @param  {Object} event
     *
     * @return {Object}
     */

  }, {
    key: "elementChange",
    value: function elementChange(event) {
      this.validateElement(event.target);
      return this;
    }
    /**
     * Get form element's validity
     *
     * @param  {Object} element DOM Element
     *
     * @return {Boolean}
     */

  }, {
    key: "getElementValidity",
    value: function getElementValidity(element) {
      var name = element.nodeName.toUpperCase();
      var type = element.type.toUpperCase();
      var isValid = true;

      switch (true) {
        case name === 'TEXTAREA' || name === 'INPUT' && (type === 'TEXT' || type === 'EMAIL' || type === 'PASSWORD' || type === 'TEL' || type === 'NUMBER' || type === 'SEARCH'):
          isValid = this.fieldValidation(element);
          break;

        case name === 'INPUT' && type === 'CHECKBOX':
          isValid = this.checkboxValidation(element);
          break;

        case name === 'INPUT' && type === 'RADIO':
          isValid = this.radioValidation(element);
          break;

        case name === 'SELECT':
          isValid = this.selectValidation(element);
          break;

        default:
          console.error("Can't validate this element!", element);
      }

      return isValid;
    }
    /**
     * Validate a form element
     *
     * @param  {Objct} element DOM Element
     *
     * @return {Boolean}]
     */

  }, {
    key: "validateElement",
    value: function validateElement(element) {
      var isValid = this.getElementValidity(element);

      if (isValid) {
        this.setElementValidClass(element);
      } else {
        this.setElementErrorClass(element);
      }

      if (this.hasJQuery) {
        jQuery(element).data('validator', {
          valid: isValid
        });
        jQuery(element).trigger('validate:change', isValid);
      } else {
        element.validator = {
          valid: isValid
        };
      }

      return isValid;
    }
    /**
     * Validate a select field
     *
     * @param  {Object} element DOM Element
     *
     * @return {Boolean}
     */

  }, {
    key: "selectValidation",
    value: function selectValidation(element) {
      return !!element.value;
    }
    /**
     * Validate a radio buttons group
     *
     * @param  {Object} element DOM Element
     *
     * @return {Boolean}
     */

  }, {
    key: "radioValidation",
    value: function radioValidation(element) {
      var name = element.name;
      var siblings = (this.form || document).querySelectorAll('[name="' + name + '"]');
      var isValid = false;

      for (var i = 0; i < siblings.length; i++) {
        if (siblings[i].getAttribute('required') !== null && siblings[i].checked) {
          isValid = true;
        }
      }

      return isValid;
    }
    /**
     * Validate a checkbox
     *
     * @param  {Object} element DOM Element
     *
     * @return {Boolean}
     */

  }, {
    key: "checkboxValidation",
    value: function checkboxValidation(element) {
      return element.checked;
    }
    /**
     * Validate a text field
     *
     * @param  {Object} element DOM Element
     *
     * @return {Boolean}
     */

  }, {
    key: "fieldValidation",
    value: function fieldValidation(element) {
      var isValid = true;
      var validationType = element.getAttribute('data-validate');

      if (!validationType) {
        return isValid;
      }

      validationType = validationType.replace(/^\['|'\]$/g, '').split(/',\s?'/);

      for (var i = 0; i < validationType.length; i++) {
        var validator = validationType[i];

        if (validator.match(/\(([^)]+)\)/)) {
          validator = validator.replace(validator.match(/\(([^)]+)\)/)[0], '');
        }

        var validatorValid = this.validate(element.value, validator);

        if (!validatorValid) {
          isValid = false;
        }

        if (element.value === element.getAttribute('placeholder')) {
          isValid = false;
        }
      }

      return isValid;
    }
    /**
     * Sets valid class to element
     *
     * @param  {Object} element DOM Element
     *
     * @return {Object}
     */

  }, {
    key: "setElementValidClass",
    value: function setElementValidClass(element) {
      var parent = this.getClassHolder(element);
      addClass(parent, this.settings.validClass);
      removeClass(parent, this.settings.errorClass);
      return this;
    }
    /**
     * Sets error class to element
     *
     * @param  {Object} element DOM Element
     *
     * @return {Object}
     */

  }, {
    key: "setElementErrorClass",
    value: function setElementErrorClass(element) {
      var parent = this.getClassHolder(element);
      addClass(parent, this.settings.errorClass);
      removeClass(parent, this.settings.validClass);
      return this;
    }
    /**
     * Get the element on which a classname should be applied
     *
     * @param  {Object} element DOM Element
     *
     * @return {Object}
     */

  }, {
    key: "getClassHolder",
    value: function getClassHolder(element) {
      var parent = this.settings.classHolder;

      if (!!parent) {
        return findParentBySelector(element, parent);
      }

      return element;
    }
    /**
     * Actual validation
     *
     * @param  {String} value     Value
     * @param  {String} validator Validation type
     *
     * @return {Boolean}
     */

  }, {
    key: "validate",
    value: function validate(value, validator) {
      return value.match(this.settings.validationTypes[validator]);
    }
  }]);

  return Validator;
}();


// CONCATENATED MODULE: ./src/index.js

/* harmony default export */ var src = __webpack_exports__["default"] = (validator_Validator);

/***/ })
/******/ ])["default"];
});