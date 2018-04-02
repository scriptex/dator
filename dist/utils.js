"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeClass = exports.addClass = exports.hasClass = exports.findParentBySelector = exports.collectionHas = void 0;

var collectionHas = function collectionHas(a, b) {
  for (var i = 0, len = a.length; i < len; i++) {
    if (a[i] == b) return true;
  }

  return false;
};

exports.collectionHas = collectionHas;

var findParentBySelector = function findParentBySelector(elm, selector) {
  var all = document.querySelectorAll(selector);
  var cur = elm;

  while (cur && !collectionHas(all, cur)) {
    cur = cur.parentNode;
  }

  return cur;
};

exports.findParentBySelector = findParentBySelector;

var hasClass = function hasClass(elm, cls) {
  return elm.classList.contains(cls);
};

exports.hasClass = hasClass;

var addClass = function addClass(elm, cls) {
  if (hasClass(elm, cls)) {
    return;
  }

  elm.classList.add(cls);
};

exports.addClass = addClass;

var removeClass = function removeClass(elm, cls) {
  if (!hasClass(ele, cls)) {
    return;
  }

  elm.classList.remove(cls);
};

exports.removeClass = removeClass;