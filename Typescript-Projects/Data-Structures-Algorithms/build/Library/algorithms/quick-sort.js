"use strict";
// ---------------- swap ---------------- //
Object.defineProperty(exports, "__esModule", { value: true });
exports.quickSort = void 0;
const swap_1 = require("../functions/swap");
const comparator_1 = require("../functions/comparator");
// -------------- quickSort ------------- //
/**
 * It moves all the elements smaller than the pivot to the left of the pivot, and returns the index of
 * the pivot
 * @param {T[]} array - The array to be sorted.
 * @param {number} leftIndex - The index of the first element in the array.
 * @param {number} rightIndex - The index of the pivot.
 * @param comparator - A function that takes two elements and returns a number.
 * @returns The index of the pivot.
 * @complexity O(n) - iterate over all items in n range
 */
function partition(array, leftIndex, rightIndex, comparator) {
    /* Setting the index of the highest index holding an element smaller than the pivot. */
    let smallerThanPivotIndex = leftIndex - 1;
    /* Moving all the elements smaller than the pivot to the left of the pivot. */
    for (let i = leftIndex, pivot = array[rightIndex]; i < rightIndex; i++) {
        if (comparator(array[i], pivot) < 0) {
            (0, swap_1.swap)(array, i, ++smallerThanPivotIndex);
        }
    }
    /* Moving the pivot to the index after all the elements smaller than it. */
    (0, swap_1.swap)(array, rightIndex, smallerThanPivotIndex + 1);
    /* Returning the index of the pivot. */
    return smallerThanPivotIndex + 1;
}
/**
 * We start with a pivot, and then we move all the elements that are greater than the pivot to the
 * right of the pivot, and all the elements that are less than the pivot to the left of the pivot
 * @param {number[]} array - the array to be sorted
 * @param leftIndex - the leftmost index of the array
 * @param rightIndex - the index of the last element in the array
 * @returns The sorted array.
 * @ComplexityBestCase O(1) - array of length 1 otherwise O(nlog(n))
 * @ComplexityAvgCase O(nlog(n)) - pivot will be relatively balanced to the array therefore the elements
 * therefore the sorting speed is (how many elements are present)*(how many times each subarray can be split in ~2)
 * or O(nlog(n))
 * @ComplexityWorstCase O(n**2) - when the pivot is extremely unbalanced relative to the array.
 * Ex. smallest or greatest element
 */
function quickSort(array, leftIndex = 0, rightIndex = array.length - 1, comparator = comparator_1.defaultComparator) {
    if (leftIndex >= rightIndex)
        return array;
    const pivotIndex = partition(array, leftIndex, rightIndex, comparator);
    quickSort(array, leftIndex, pivotIndex - 1);
    quickSort(array, pivotIndex + 1, rightIndex);
    return array;
}
exports.quickSort = quickSort;
//# sourceMappingURL=quick-sort.js.map