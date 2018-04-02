"use strict";

var utils = _interopRequireWildcard(require("./utils"));

var _validationTypes = _interopRequireDefault(require("./validation-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Validator =
/*#__PURE__*/
function () {
  function Validator() {
    var form = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.querySelector('form');
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var customTypes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Validator);

    this.form = form;
    this.settings = _objectSpread({
      validClass: 'is--valid',
      errorClass: 'is--invalid',
      classHolder: '.form__row',
      validatedClass: 'is--validated',
      beforeValidate: null,
      onSubmit: null,
      afterValidate: null,
      validationTypes: _objectSpread({
        validationTypes: _validationTypes.default
      }, customTypes)
    }, settings);
    this.formElements = this.form.elements;
    this.hasJQuery = 'jQuery' in window;
    this.submitHandler = this.submit.bind(this);
    this.elementChangeHandler = this.elementChange.bind(this);
    this.init();
    return this;
  }

  _createClass(Validator, [{
    key: "init",
    value: function init() {
      this.form.setAttribute('novalidate', true);
      this.bind();
    }
  }, {
    key: "getEventName",
    value: function getEventName(type) {
      switch (type) {
        case 'text':
        case 'tel':
        case 'email':
        case 'number':
        case 'password':
        case 'textarea':
        case 'search':
          return 'input';
          break;

        default:
          return 'change';
      }
    }
  }, {
    key: "bind",
    value: function bind() {
      var _this = this;

      this.form.addEventListener('submit', this.submitHandler, false);
      this.formElements.forEach(function (element) {
        var elementType = element.type;
        var eventName = getEventName(elementType);

        if (_this.hasJQuery) {
          jQuery(element).on(eventName, _this.elementChangeHandler).on('validate', _this.elementChangeHandler);
        } else {
          element.addEventListener(eventName, _this.elementChangeHandler, false);
        }
      });
      return this;
    }
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

      utils.addClass(this.form, this.settings.validatedClass);

      if (!isValid) {
        event.preventDefault();
        utils.removeClass(this.form, this.settings.validClass);
      } else {
        utils.addClass(this.form, this.settings.validClass);

        if ('onSubmit' in this.settings && typeof this.settings.onSubmit === 'function') {
          this.settings.onSubmit(event);
        }
      }

      if ('afterValidate' in this.settings && typeof this.settings.afterValidate === 'function') {
        this.settings.afterValidate();
      }

      return this;
    }
  }, {
    key: "elementChange",
    value: function elementChange(event) {
      this.validateElement(event.target);
      return this;
    }
  }, {
    key: "validateElement",
    value: function validateElement(element) {
      var elementName = element.nodeName.toUpperCase();
      var elementType = element.type.toUpperCase();
      var isValid = true;

      switch (true) {
        case elementName === 'TEXTAREA' || elementName === 'INPUT' && (elementType === 'TEXT' || elementType === 'EMAIL' || elementType === 'PASSWORD' || elementType === 'TEL' || elementType === 'NUMBER' || elementType === 'SEARCH'):
          isValid = this.fieldValidation(element);
          break;

        case elementName === 'INPUT' && elementType === 'CHECKBOX':
          isValid = this.checkboxValidation(element);
          break;

        case elementName === 'INPUT' && elementType === 'RADIO':
          isValid = this.radioValidation(element);
          break;

        case elementName === 'SELECT':
          isValid = this.selectValidation(element);
          break;

        default:
          console.error("Can't validate this element!", element);
      }

      if (isValid) {
        this.setElementValidClass(element);

        if (this.hasJQuery) {
          jQuery(element).data('validator', {
            valid: true
          });
          jQuery(element).trigger('validate:change', true);
        } else {
          element.validator = {
            valid: true
          };
        }
      } else {
        this.setElementErrorClass(element);

        if (this.hasJQuery) {
          jQuery(element).data('validator', {
            valid: false
          });
          jQuery(element).trigger('validate:change', false);
        } else {
          element.validator = {
            valid: true
          };
        }
      }

      return isValid;
    }
  }, {
    key: "selectValidation",
    value: function selectValidation(element) {
      return !!element.value;
    }
  }, {
    key: "radioValidation",
    value: function radioValidation(element) {
      var elementName = element.name;
      var siblings = (this.form || document).querySelectorAll('[name="' + elementName + '"]');
      var isValid = false;

      for (var i = 0; i < siblings.length; i++) {
        if (siblings[i].getAttribute('required') !== null && siblings[i].checked) {
          isValid = true;
        }
      }

      return isValid;
    }
  }, {
    key: "checkboxValidation",
    value: function checkboxValidation(element) {
      return element.checked;
    }
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
        var options = null;
        var validator = validationType[i];
        var validatorValid = false;

        if (validator.match(/\(([^)]+)\)/)) {
          options = validator.match(/\(([^)]+)\)/)[1].split(', ');
          validator = validator.replace(validator.match(/\(([^)]+)\)/)[0], '');
        }

        validatorValid = this.validate(element.value, validator, options);

        if (!validatorValid) {
          isValid = false;
        }

        if (element.value === element.getAttribute('placeholder')) {
          isValid = false;
        }
      }

      return isValid;
    }
  }, {
    key: "setElementValidClass",
    value: function setElementValidClass(element) {
      var parent = this.getClassHolder(element);

      if (parent) {
        utils.addClass(parent, this.settings.validClass);
        utils.removeClass(parent, this.settings.errorClass);
      }

      return this;
    }
  }, {
    key: "setElementErrorClass",
    value: function setElementErrorClass(element) {
      var parent = this.getClassHolder(element);

      if (parent) {
        utils.addClass(parent, this.settings.errorClass);
        utils.removeClass(parent, this.settings.validClass);
      }

      return this;
    }
  }, {
    key: "getClassHolder",
    value: function getClassHolder(element) {
      var parentSelector = element.getAttribute('data-class-holder') || this.settings.classHolder;
      return utils.findParentBySelector(element, parentSelector);
    }
  }, {
    key: "validate",
    value: function validate(value, validator, options) {
      var validatorMatch = value.match(_validationTypes.default[validator]);
      var optionsMatch = true;

      if (options) {
        switch (validator) {
          case 'regex':
            if (!new RegExp(options[0]).test(value)) optionsMatch = false;
            break;

          case 'integer':
          case 'float':
            if (value < parseFloat(options[0]) || value > parseFloat(options[1])) optionsMatch = false;
            break;

          case 'presence':
            if (value.length < parseFloat(options[0]) || value.length > parseFloat(options[1])) optionsMatch = false;
            break;
            break;
        }
      }

      return validatorMatch && optionsMatch;
    }
  }]);

  return Validator;
}();