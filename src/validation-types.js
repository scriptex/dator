export default {
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
};
