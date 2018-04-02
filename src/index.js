(function() {
	var validatorUtils = (function() {
		function collectionHas(a, b) {
			for (var i = 0, len = a.length; i < len; i++) {
				if (a[i] == b) return true;
			}

			return false;
		}

		function findParentBySelector(elm, selector) {
			var all = document.querySelectorAll(selector);
			var cur = elm;

			while (cur && !collectionHas(all, cur)) {
				//keep going up until you find a match
				cur = cur.parentNode; //go up
			}

			return cur; //will return null if not found
		}

		function hasClass(ele, cls) {
			return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
		}

		function addClass(ele, cls) {
			if (!hasClass(ele, cls)) ele.className += ' ' + cls;
		}

		function removeClass(ele, cls) {
			if (hasClass(ele, cls)) {
				var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
				ele.className = ele.className.replace(reg, ' ');
			}
		}

		return {
			findParentBySelector: findParentBySelector,
			hasClass: hasClass,
			addClass: addClass,
			removeClass: removeClass
		};
	})();

	window.Validator = (function() {
		var validationTypes = {
			name: /^[a-zA-Z \-']{3,}$/, // First Name, Last Name, City
			zip: /^\d{5}$/, // Zip Code
			presence: /.+/, // Select fields, Company Name, Subject, Message, etc
			email: /^[0-9a-zA-Z]+([0-9a-zA-Z]*[-._+])*[0-9a-zA-Z]+@[0-9a-zA-Z]+([-.][0-9a-zA-Z]+)*([0-9a-zA-Z]*[.])[a-zA-Z]{2,6}$/, // Email address
			phone: /^\d{3}[- .]?\d{3}[- .]?\d{4}$/, // Phone Number - XXX-XXX-XXXX, XXXXXXXXXX, XXX.XXX.XXXX or XXX XXX XXXX formats
			address: /[a-zA-Z0-9 \-]{5,}/, // Address
			integer: /^[+-]?\d+$/, // Integer Number
			float: /^[+-]?(\d+(.\d+)?)/, // Float Number
			'credit-card': /^\d{4} \d{4} \d{4} \d{4}$/, // Credit Card Number
			cvc: /^\d{3,5}$/ // Credit Card CVC code
		};

		function Validator(form, settings) {
			this.form = form;
			this.settings = settings;
			this.formElements = this.form.elements;
			this.hasJQuery = 'jQuery' in window;
			this.submitHandler = this.submit.bind(this);
			this.elementChangeHandler = this.elementChange.bind(this);
			this.init();
		}

		Validator.prototype.init = function() {
			this.form.setAttribute('novalidate', true);
			this.bind();
		};

		Validator.prototype.bind = function() {
			this.form.addEventListener('submit', this.submitHandler, false);

			for (var i = 0; i < this.formElements.length; i++) {
				var element = this.formElements[i];
				var elementType = element.type;
				var eventName = null;

				switch (elementType) {
					case 'text':
					case 'tel':
					case 'email':
					case 'number':
					case 'password':
					case 'textarea':
					case 'search':
						eventName = 'input';
						break;
					default:
						eventName = 'change';
				}

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
			}
		};

		Validator.prototype.submit = function(event) {
			var formValid = true;

			if ('beforeValidate' in this.settings) {
				this.settings.beforeValidate();
			}

			for (var i = 0; i < this.formElements.length; i++) {
				if (this.formElements[i].getAttribute('required') !== null) {
					if (!this.validateElement(this.formElements[i])) {
						formValid = false;
					}
				}
			}

			validatorUtils.addClass(this.form, 'form-validated');

			if (!formValid) {
				event.preventDefault();

				validatorUtils.removeClass(this.form, 'valid');
			} else {
				validatorUtils.addClass(this.form, 'valid');

				if ('onSubmit' in this.settings) {
					this.settings.onSubmit(event);
				}
			}

			if ('afterValidate' in this.settings) {
				this.settings.afterValidate();
			}
		};

		Validator.prototype.elementChange = function(event) {
			var element = event.target;

			this.validateElement(element);
		};

		Validator.prototype.validateElement = function(element) {
			var elementName = element.nodeName.toUpperCase();
			var elementType = element.type.toUpperCase();
			var isValid = true;

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
					console.log("Can't validate this element!", element);
					alert("Can't validate this element! Check the console.");
			}

			if (isValid) {
				this.setElementValidClass(element);

				if (this.hasJQuery) {
					jQuery(element).data('validator', { valid: true });
					jQuery(element).trigger('validate:change', true);
				} else {
					element.validator = { valid: true };
				}
			} else {
				this.setElementErrorClass(element);

				if (this.hasJQuery) {
					jQuery(element).data('validator', { valid: false });
					jQuery(element).trigger('validate:change', false);
				} else {
					element.validator = { valid: true };
				}
			}

			return isValid;
		};

		Validator.prototype.selectValidation = function(element) {
			return !!element.value;
		};

		Validator.prototype.radioValidation = function(element) {
			var elementName = element.name;
			var siblings = (this.form || document).querySelectorAll(
				'[name="' + elementName + '"]'
			);
			var isValid = false;

			for (var i = 0; i < siblings.length; i++) {
				if (
					siblings[i].getAttribute('required') !== null &&
					siblings[i].checked
				) {
					isValid = true;
				}
			}

			return isValid;
		};

		Validator.prototype.checkboxValidation = function(element) {
			return element.checked;
		};

		Validator.prototype.fieldValidation = function(element) {
			var isValid = true;
			var validationType = element.getAttribute('data-validate');

			if (validationType) {
				validationType = validationType
					.replace(/^\['|'\]$/g, '')
					.split(/',\s?'/);

				for (var i = 0; i < validationType.length; i++) {
					var validator = validationType[i];
					var options = null;
					var validatorValid = false;

					if (validator.match(/\(([^)]+)\)/)) {
						options = validator.match(/\(([^)]+)\)/)[1].split(', ');
						validator = validator.replace(
							validator.match(/\(([^)]+)\)/)[0],
							''
						);
					}

					validatorValid = this.validate(
						element.value,
						validator,
						options
					);

					if (!validatorValid) {
						isValid = false;
					}

					if (element.value === element.getAttribute('placeholder')) {
						isValid = false;
					}
				}
			}

			return isValid;
		};

		Validator.prototype.setElementValidClass = function(element) {
			var parent = this.getClassHolder(element);

			if (parent) {
				validatorUtils.addClass(parent, this.settings.validClass);
				validatorUtils.removeClass(parent, this.settings.errorClass);
			}
		};

		Validator.prototype.setElementErrorClass = function(element) {
			var parent = this.getClassHolder(element);

			if (parent) {
				validatorUtils.addClass(parent, this.settings.errorClass);
				validatorUtils.removeClass(parent, this.settings.validClass);
			}
		};

		Validator.prototype.getClassHolder = function(element) {
			var parentSelector =
				element.getAttribute('data-class-holder') ||
				this.settings.classHolder;

			return validatorUtils.findParentBySelector(element, parentSelector);
		};

		Validator.prototype.validate = function(value, validator, options) {
			var validatorMatch = value.match(validationTypes[validator]);
			var optionsMatch = true;

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
		};

		return Validator;
	})();
})();
