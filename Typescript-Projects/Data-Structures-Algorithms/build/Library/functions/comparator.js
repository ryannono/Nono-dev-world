"use strict";
//---------------Comparator Type------------//
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultComparator = void 0;
//-------------Default Comparator------------//
/**
 * It returns 1 if the first element is greater than the second, 0 if they're equal, and -1 if the
 * first element is less than the second
 * @param {T} element1 - The first element to compare.
 * @param {T} element2 - The element to compare against.
 * @returns A function that takes two arguments and returns a number.
 */
function defaultComparator(element1, element2) {
    if (element1 > element2)
        return 1;
    else if (element1 === element2)
        return 0;
    else
        return -1;
}
exports.defaultComparator = defaultComparator;
//# sourceMappingURL=comparator.js.map