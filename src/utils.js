export const collectionHas = (a, b) => {
	for (let i = 0, len = a.length; i < len; i++) {
		if (a[i] == b) return true;
	}

	return false;
};

export const findParentBySelector = (elm, selector) => {
	const all = document.querySelectorAll(selector);

	let cur = elm;

	while (cur && !collectionHas(all, cur)) {
		cur = cur.parentNode;
	}

	return cur;
};

export const hasClass = (elm, cls) => {
	return elm.classList.contains(cls);
};

export const addClass = (elm, cls) => {
	if (hasClass(elm, cls)) {
		return;
	}

	elm.classList.add(cls);
};

export const removeClass = (elm, cls) => {
	if (!hasClass(ele, cls)) {
		return;
	}

	elm.classList.remove(cls);
};
