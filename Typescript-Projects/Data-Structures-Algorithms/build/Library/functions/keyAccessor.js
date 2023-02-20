"use strict";
//------------Numeric accessor Type------------//
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultNumKeyAccessor = void 0;
//---------------Default accessor--------------//
/**
 * It takes an element and returns a number
 * @param {unknown} element - The element to be accessed.
 * @returns A function that takes an element and returns it as a number.
 */
function defaultNumKeyAccessor(element) {
    return element;
}
exports.defaultNumKeyAccessor = defaultNumKeyAccessor;
//# sourceMappingURL=keyAccessor.js.map