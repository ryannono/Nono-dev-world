"use strict";
// ---------------- swap ---------------- //
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertionSort = void 0;
const comparator_1 = require("../functions/comparator");
const swap_1 = require("../functions/swap");
// ------------ insertionSort ------------ //
/**
 * We start at the second element in the array and compare it to the element before it. If the element
 * before it is greater than the current element, we swap them. We then move to the next element and
 * repeat the process
 * @param {T[]} array - The array to sort.
 * @param [unsortedStart=1] - The index of the first element in the unsorted part of the array.
 * @param comparator - A function that takes two arguments and returns a number. If the number is less
 * than 0, the first argument is sorted before the second. If the number is greater than 0, the second
 * argument is sorted before the first. If the number is 0, the two arguments are considered equal.
 * @returns The array that was passed in.
 */
function insertionSort(array, unsortedStart = 1, comparator = comparator_1.defaultComparator) {
    for (let length = array.length; unsortedStart < length; unsortedStart++) {
        let currElementIndex = unsortedStart;
        let sortedIndex = unsortedStart - 1;
        while (sortedIndex >= 0 &&
            comparator(array[sortedIndex], array[currElementIndex]) > 0) {
            (0, swap_1.swap)(array, sortedIndex, currElementIndex);
            currElementIndex = sortedIndex--;
        }
    }
    return array;
}
exports.insertionSort = insertionSort;
//# sourceMappingURL=insertion-sort.js.map