import * as utils from './utils.js';
import validationTypes from './validation-types.js';

export default class Validator {
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
			watch: false,
			classHolder: null,
			beforeValidate: null,
			onSubmit: null,
			afterValidate: null,
			validationTypes: {
				validationTypes,
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

	init() {
		this.form.setAttribute('novalidate', true);

		this.bind();
	}

	getEventName(type) {
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

	elementChange(event) {
		this.validateElement(event.target);

		return this;
	}

	validateElement(element) {
		const elementName = element.nodeName.toUpperCase();
		const elementType = element.type.toUpperCase();

		let isValid = true;

		switch (true) {
			case elementName === 'TEXTAREA' ||
				(elementName === 'INPUT' &&
					(elementType === 'TEXT' ||
						elementType === 'EMAIL' ||
						elementType === 'PASSWORD' ||
						elementType === 'TEL' ||
						elementType === 'NUMBER' ||
						elementType === 'SEARCH')):
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

	selectValidation(element) {
		return !!element.value;
	}

	radioValidation(element) {
		const elementName = element.name;
		const siblings = (this.form || document).querySelectorAll(
			'[name="' + elementName + '"]'
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

	checkboxValidation(element) {
		return element.checked;
	}

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
			let options = null;
			let validator = validationType[i];
			let validatorValid = false;

			if (validator.match(/\(([^)]+)\)/)) {
				options = validator.match(/\(([^)]+)\)/)[1].split(', ');
				validator = validator.replace(
					validator.match(/\(([^)]+)\)/)[0],
					''
				);
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

	setElementValidClass(element) {
		const parent = this.getClassHolder(element);

		if (parent) {
			utils.addClass(parent, this.settings.validClass);
			utils.removeClass(parent, this.settings.errorClass);
		}

		return this;
	}

	setElementErrorClass(element) {
		const parent = this.getClassHolder(element);

		if (parent) {
			utils.addClass(parent, this.settings.errorClass);
			utils.removeClass(parent, this.settings.validClass);
		}

		return this;
	}

	getClassHolder(element) {
		const parentSelector =
			element.getAttribute('data-class-holder') ||
			this.settings.classHolder;

		if (!!parentSelector) {
			return utils.findParentBySelector(element, parentSelector);
		}

		return element;
	}

	validate(value, validator, options) {
		const validatorMatch = value.match(validationTypes[validator]);

		let optionsMatch = true;

		if (options) {
			switch (validator) {
				case 'regex':
					if (!new RegExp(options[0]).test(value))
						optionsMatch = false;
					break;
				case 'integer':
				case 'float':
					if (
						value < parseFloat(options[0]) ||
						value > parseFloat(options[1])
					)
						optionsMatch = false;
					break;
				case 'presence':
					if (
						value.length < parseFloat(options[0]) ||
						value.length > parseFloat(options[1])
					)
						optionsMatch = false;
					break;
					break;
			}
		}

		return validatorMatch && optionsMatch;
	}
}
