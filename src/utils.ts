export const isInArray = <T>(array: Array<T>, element: T): boolean => {
	for (const item of array) {
		if (item == element) return true;
	}

	return false;
};

export const findParentBySelector = <T extends Element>(elm: T, selector: string) => {
	const all = Array.from(document.querySelectorAll(selector));

	let cur = elm;

	while (cur && !isInArray(all, cur)) {
		cur = cur.parentNode as T;
	}

	return cur;
};

export const hasClass = (elm: Element | null, cls: string): boolean => (!elm ? false : elm.classList.contains(cls));

export const addClass = (elm: Element | null, cls: string): void => {
	if (!elm) {
		return;
	}

	if (hasClass(elm, cls)) {
		return;
	}

	elm.classList.add(cls);
};

export const removeClass = (elm: Element | null, cls: string): void => {
	if (!elm) {
		return;
	}

	if (!hasClass(elm, cls)) {
		return;
	}

	elm.classList.remove(cls);
};
