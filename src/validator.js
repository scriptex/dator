/**
 * Internal dependencies
 */
import * as utils from './utils.js';
import validationTypes from './validation-types.js';

export default class Validator {
	/**
	 * Validator constructor
	 *
	 * @param  {Object} form        DOM Element
	 * @param  {Object} settings    Validator settings
	 * @param  {Object} customTypes Validation types
	 *
	 * @return {Object}				Validator instance
	 */
	constructor(
		form = document.querySelector('form'),
		settings = {},
		customTypes = {}
	) {
		this.form = form;
		this.settings = {
			validClass: 'is--valid',
			errorClass: 'is--invalid',
			validatedClass: 'is--validated',
			watch: true,
			classHolder: null,
			beforeValidate: null,
			onSubmit: null,
			afterValidate: null,
			validationTypes: {
				...validationTypes,
				...customTypes
			},
			...settings
		};
		this.formElements = [...this.form.elements];
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
	init() {
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
	getEventName(type) {
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
	bind() {
		this.form.addEventListener('submit', this.submitHandler, false);

		if (!this.settings.watch) {
			return this;
		}

		this.formElements.forEach(element => {
			const elementType = element.type;
			const eventName = this.getEventName(elementType);

			if (this.hasJQuery) {
				jQuery(element)
					.on(eventName, this.elementChangeHandler)
					.on('validate', this.elementChangeHandler);
			} else {
				element.addEventListener(
					eventName,
					this.elementChangeHandler,
					false
				);
			}
		});

		return this;
	}

	/**
	 * Detach event listeners
	 *
	 * @return {Object}
	 */
	unbind() {
		this.form.removeEventListener('submit', this.submitHandler, false);

		this.formElements.forEach(element => {
			const elementType = element.type;
			const eventName = this.getEventName(elementType);

			if (this.hasJQuery) {
				jQuery(element)
					.off(eventName, this.elementChangeHandler)
					.off('validate', this.elementChangeHandler);
			} else {
				element.removeEventListener(
					eventName,
					this.elementChangeHandler,
					false
				);
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
	submit(event) {
		const elements = this.formElements;
		const elementsLen = elements.length;

		let isValid = true;

		if (
			'beforeValidate' in this.settings &&
			typeof this.settings.beforeValidate === 'function'
		) {
			this.settings.beforeValidate();
		}

		for (let i = 0; i < elementsLen; i++) {
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

			if (
				'onSubmit' in this.settings &&
				typeof this.settings.onSubmit === 'function'
			) {
				this.settings.onSubmit(event);
			}
		}

		if (
			'afterValidate' in this.settings &&
			typeof this.settings.afterValidate === 'function'
		) {
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
	elementChange(event) {
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
	getElementValidity(element) {
		const name = element.nodeName.toUpperCase();
		const type = element.type.toUpperCase();

		let isValid = true;

		switch (true) {
			case name === 'TEXTAREA' ||
				(name === 'INPUT' &&
					(type === 'TEXT' ||
						type === 'EMAIL' ||
						type === 'PASSWORD' ||
						type === 'TEL' ||
						type === 'NUMBER' ||
						type === 'SEARCH')):
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
	validateElement(element) {
		const isValid = this.getElementValidity(element);

		if (isValid) {
			this.setElementValidClass(element);
		} else {
			this.setElementErrorClass(element);
		}

		if (this.hasJQuery) {
			jQuery(element).data('validator', { valid: isValid });
			jQuery(element).trigger('validate:change', isValid);
		} else {
			element.validator = { valid: isValid };
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
	selectValidation(element) {
		return !!element.value;
	}

	/**
	 * Validate a radio buttons group
	 *
	 * @param  {Object} element DOM Element
	 *
	 * @return {Boolean}
	 */
	radioValidation(element) {
		const { name } = element;
		const siblings = (this.form || document).querySelectorAll(
			'[name="' + name + '"]'
		);

		let isValid = false;

		for (let i = 0; i < siblings.length; i++) {
			if (
				siblings[i].getAttribute('required') !== null &&
				siblings[i].checked
			) {
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
	checkboxValidation(element) {
		return element.checked;
	}

	/**
	 * Validate a text field
	 *
	 * @param  {Object} element DOM Element
	 *
	 * @return {Boolean}
	 */
	fieldValidation(element) {
		let isValid = true;
		let validationType = element.getAttribute('data-validate');

		if (!validationType) {
			return isValid;
		}

		validationType = validationType
			.replace(/^\['|'\]$/g, '')
			.split(/',\s?'/);

		for (let i = 0; i < validationType.length; i++) {
			let validator = validationType[i];

			if (validator.match(/\(([^)]+)\)/)) {
				validator = validator.replace(
					validator.match(/\(([^)]+)\)/)[0],
					''
				);
			}

			const validatorValid = this.validate(element.value, validator);

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
	setElementValidClass(element) {
		const parent = this.getClassHolder(element);

		utils.addClass(parent, this.settings.validClass);
		utils.removeClass(parent, this.settings.errorClass);

		return this;
	}

	/**
	 * Sets error class to element
	 *
	 * @param  {Object} element DOM Element
	 *
	 * @return {Object}
	 */
	setElementErrorClass(element) {
		const parent = this.getClassHolder(element);

		utils.addClass(parent, this.settings.errorClass);
		utils.removeClass(parent, this.settings.validClass);

		return this;
	}

	/**
	 * Get the element on which a classname should be applied
	 *
	 * @param  {Object} element DOM Element
	 *
	 * @return {Object}
	 */
	getClassHolder(element) {
		const parent = this.settings.classHolder;

		if (!!parent) {
			return utils.findParentBySelector(element, parent);
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
	validate(value, validator) {
		return value.match(this.settings.validationTypes[validator]);
	}
}
