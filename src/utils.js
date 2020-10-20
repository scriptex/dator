/**
 * Check if an element is part of an array
 *
 * @param  {Array}  array   Array to search in
 * @param  {Object} element Element
 *
 * @return {Boolean}
 */
export const isInArray = (array, element) => {
	for (let i = 0, len = array.length; i < len; i++) {
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
export const findParentBySelector = (elm, selector) => {
	const all = document.querySelectorAll(selector);

	let cur = elm;

	// @ts-ignore
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
export const hasClass = (elm, cls) => {
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
export const addClass = (elm, cls) => {
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
export const removeClass = (elm, cls) => {
	if (!hasClass(elm, cls)) {
		return;
	}

	elm.classList.remove(cls);
};
