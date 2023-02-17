"use strict";
// -------------- MinHeap -------------- //
Object.defineProperty(exports, "__esModule", { value: true });
exports.heapSort = void 0;
const minHeap_1 = require("../adts/minHeap");
// ------------- Heap sort ------------- //
/**
 * We create a new MinHeap, insert each element of the array into the heap, and return the heap.
 * @param {number[]} array - The array to be sorted.
 * @returns A min heap
 * @complexity - O(nlog(n))
 */
function heapify(array) {
    const heap = new minHeap_1.MinHeap();
    array.forEach(element => heap.insert(element));
    return heap;
}
/**
 * "We heapify the array, then remove the minimum element from the heap until the heap is empty,
 * storing the removed elements in the array."
 * @param {number[]} array - The array to sort.
 * @returns The sorted array.
 * @complexity - O(nlog(n))
 */
function heapSort(array) {
    const heap = heapify(array);
    for (let i = 0; !heap.isEmpty(); i++) {
        array[i] = heap.removeMin();
    }
    return array;
}
exports.heapSort = heapSort;
//# sourceMappingURL=heapSort.js.map