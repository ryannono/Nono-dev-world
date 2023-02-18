"use strict";
// -------------- imports -------------- //
Object.defineProperty(exports, "__esModule", { value: true });
exports.heapSortOOP = exports.heapSort = void 0;
const minHeap_1 = require("../adts/minHeap");
const swap_1 = require("../functions/swap");
// ------------- Heap sort ------------- //
/**
 * Given an item's index in the heap, return the index of its parent.
 * @param {number} itemIndex - The index of the item in the heap.
 * @returns The index of the parent node of the node at the given index.
 */
function getParentIndex(itemIndex) {
    return Math.floor((itemIndex - 1) / 2);
}
/**
 * "Given an array and an index, return the index of the smaller of the two children of the item at the
 * given index."
 * @param {number[]} array - the array we're working with
 * @param {number} itemIndex - The index of the item we're looking at.
 * @returns The index of the smallest child of the item at the given index.
 */
function getMinChildIndex(array, itemIndex) {
    const leftChildIndex = itemIndex * 2 + 1;
    const rightChildIndex = itemIndex * 2 + 2;
    const leftItem = array[leftChildIndex];
    const rightItem = array[rightChildIndex];
    if (typeof leftItem === 'number' && typeof rightItem === 'number') {
        return leftItem <= rightItem ? leftChildIndex : rightChildIndex;
    }
    else if (typeof leftItem === 'number') {
        return leftChildIndex;
    }
    else if (typeof rightItem === 'number') {
        return rightChildIndex;
    }
    else {
        return null;
    }
}
/**
 * While the parent index is valid, swap the current index with the parent index if the current index
 * is less than the parent index.
 * @param {number[]} array - the array we're sifting up in
 * @param {number} startIndex - The index of the element that we want to sift up.
 */
function siftUp(array, startIndex) {
    let currIndex = startIndex;
    let parentIndex;
    while ((parentIndex = getParentIndex(currIndex)) >= 0) {
        if (array[currIndex] > array[parentIndex])
            break;
        (0, swap_1.swap)(array, currIndex, parentIndex);
        currIndex = parentIndex;
    }
}
/**
 * "While there is a child, if the child is greater than the parent, swap them and update the current
 * index to the child's index."
 * @param {number[]} array - the array we're sorting
 * @param {number} startIndex - The index of the element we want to sift down.
 */
function siftDown(array, startIndex) {
    let currIndex = startIndex;
    let minChildIndex;
    while ((minChildIndex = getMinChildIndex(array, currIndex))) {
        if (array[minChildIndex] > array[currIndex])
            break;
        (0, swap_1.swap)(array, currIndex, minChildIndex);
        currIndex = minChildIndex;
    }
}
/**
 * Starting at the second element, sift up each element until it's in the correct position.
 * @param {number[]} array - The array to be heapified.
 */
function heapify(array) {
    for (let i = 1, length = array.length; i < length; i++) {
        siftUp(array, i);
    }
}
/**
 * We swap the first and last elements of the array, pop the last element off the array, and then sift
 * down the first element
 * @param {number[]} array - the array to remove the minimum from
 * @returns The minimum value in the array.
 */
function removeMin(array) {
    const min = array[0];
    const length = array.length;
    if (!array.length)
        return;
    (0, swap_1.swap)(array, 0, length - 1);
    array.pop();
    siftDown(array, 0);
    return min;
}
/**
 * Heapify the array, then remove the min element from the heap until the heap is empty
 * @param {number[]} array - The array to sort.
 * @returns The sorted array.
 */
function heapSort(array) {
    const sortedArray = [];
    let length = array.length;
    heapify(array);
    while (length--) {
        sortedArray.push(removeMin(array));
    }
    return sortedArray;
}
exports.heapSort = heapSort;
// --------- Heap sort Object Oriented --------- //
/**
 * "We create a min heap from the array, then remove the minimum element from the heap and add it to
 * the array until the heap is empty."
 * @param {number[]} array - The array to sort.
 * @returns The array is being sorted in place.
 * @complexity - O(nlog(n))
 */
function heapSortOOP(array) {
    const heap = new minHeap_1.MinHeap(array);
    heap.sort();
    return heap.items();
}
exports.heapSortOOP = heapSortOOP;
//# sourceMappingURL=heapSort.js.map