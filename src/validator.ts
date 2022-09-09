import * as utils from './utils';
import { validationTypes } from './validation-types';

export interface ValidatorOptions {
	validClass: string;
	errorClass: string;
	validatedClass: string;
	watch: boolean;
	classHolder: string | null;
	onSubmit: null | ((event: Event) => unknown);
	afterValidate: null | (() => unknown);
	beforeValidate: null | (() => unknown);
	validationTypes: Record<string, RegExp>;
}

export class Validator {
	form: HTMLFormElement | null = null;
	settings: ValidatorOptions;
	hasJQuery: boolean = false;
	formElements: Array<HTMLFormElement | never> = [];

	constructor(form = document.querySelector('form'), settings = {}, customTypes = {}) {
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
		this.formElements = (this.form?.elements || []) as Array<HTMLFormElement | never>;
		this.hasJQuery = 'jQuery' in window;

		this.elementChange = this.elementChange.bind(this);
		this.validateElement = this.validateElement.bind(this);

		this.init();

		return this;
	}

	private init() {
		this.form?.setAttribute('novalidate', 'novalidate');

		this.bind();

		return this;
	}

	private getEventName(type: string) {
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
			default:
				return 'change';
		}
	}

	private bind() {
		this.form?.addEventListener('submit', this.submit, false);

		if (!this.settings.watch) {
			return this;
		}

		Array.from(this.formElements).forEach((element: HTMLFormElement) => {
			const elementType = element.type;
			const eventName = this.getEventName(elementType);

			if (this.hasJQuery) {
				jQuery(element).on(eventName, this.elementChange).on('validate', this.elementChange);
			} else {
				element.addEventListener(eventName, this.elementChange, false);
			}
		});

		return this;
	}

	public unbind(): Validator {
		this.form?.removeEventListener('submit', this.submit, false);

		Array.from(this.formElements).forEach(element => {
			const elementType = element.type;
			const eventName = this.getEventName(elementType);

			if (this.hasJQuery) {
				// @ts-ignore
				jQuery(element).off(eventName, this.elementChange).off('validate', this.elementChange);
			} else {
				element.removeEventListener(eventName, this.elementChange, false);
			}
		});

		return this;
	}

	private submit(event: Event): Validator {
		const elements = this.formElements;
		const elementsLen = elements.length;

		let isValid = true;

		if ('beforeValidate' in this.settings && typeof this.settings.beforeValidate === 'function') {
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

			if ('onSubmit' in this.settings && typeof this.settings.onSubmit === 'function') {
				this.settings.onSubmit(event);
			}
		}

		if ('afterValidate' in this.settings && typeof this.settings.afterValidate === 'function') {
			this.settings.afterValidate();
		}

		return this;
	}

	private elementChange(event: Event): Validator {
		this.validateElement(event.target as HTMLFormElement | null);

		return this;
	}

	private getElementValidity(element: HTMLFormElement): boolean {
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

	private validateElement(element: HTMLFormElement | null): boolean {
		if (!element) {
			return true;
		}

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

	private selectValidation(element: HTMLFormElement): boolean {
		return !!element.value;
	}

	private radioValidation(element: HTMLFormElement): boolean {
		const { name } = element;
		const siblings = Array.from(this.form?.querySelectorAll('[name="' + name + '"]') || []) as HTMLFormElement[];

		let isValid = false;

		for (let i = 0; i < siblings.length; i++) {
			if (siblings[i].getAttribute('required') !== null && siblings[i].checked) {
				isValid = true;
			}
		}

		return isValid;
	}

	private checkboxValidation(element: HTMLFormElement): boolean {
		return element.checked;
	}

	private fieldValidation(element: HTMLFormElement): boolean {
		let isValid = true;
		let validationType: string | string[] | null = element.getAttribute('data-validate');

		if (!validationType) {
			return isValid;
		}

		validationType = validationType.replace(/^\['|'\]$/g, '').split(/',\s?'/);

		for (let i = 0; i < validationType.length; i++) {
			let validator = validationType[i];

			if (validator.match(/\(([^)]+)\)/)) {
				validator = validator.replace(validator.match(/\(([^)]+)\)/)?.[0] || '', '');
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

	private setElementValidClass(element: HTMLFormElement): Validator {
		const parent = this.getClassHolder(element);

		utils.addClass(parent, this.settings.validClass);
		utils.removeClass(parent, this.settings.errorClass);

		return this;
	}

	private setElementErrorClass(element: HTMLFormElement): Validator {
		const parent = this.getClassHolder(element);

		utils.addClass(parent, this.settings.errorClass);
		utils.removeClass(parent, this.settings.validClass);

		return this;
	}

	private getClassHolder(element: HTMLFormElement): HTMLFormElement | Element {
		const parent = this.settings.classHolder;

		if (parent) {
			return utils.findParentBySelector(element, parent);
		}

		return element;
	}

	private validate(value: string, validator: string): RegExpMatchArray | null {
		return value.match(this.settings.validationTypes[validator]);
	}
}
