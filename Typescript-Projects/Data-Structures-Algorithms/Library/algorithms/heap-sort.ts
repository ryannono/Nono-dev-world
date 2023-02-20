// -------------- imports -------------- //

import {ArrayMinHeap} from '../adts/arrayMinHeap';
import {swap} from '../functions/swap';

// ------------- Heap sort ------------- //

/**
 * Given an item's index in the heap, return the index of its parent.
 * @param {number} itemIndex - The index of the item in the heap.
 * @returns The index of the parent node of the node at the given index.
 */
function getParentIndex(itemIndex: number) {
  return Math.floor((itemIndex - 1) / 2);
}

/**
 * "Given an array and an index, return the index of the child with the largest value."
 *
 * The function takes two arguments:
 *
 * - `array`: The array to search.
 * - `itemIndex`: The index of the item to find the largest child of
 * @param {number[]} array - the array we're working with
 * @param {number} itemIndex - The index of the item we're currently looking at.
 * @returns The index of the child with the largest value.
 */
function getMaxChildIndex(array: number[], itemIndex: number) {
  const leftChildIndex = itemIndex * 2 + 1;
  const rightChildIndex = itemIndex * 2 + 2;
  const leftItem = array[leftChildIndex];
  const rightItem = array[rightChildIndex];

  if (typeof leftItem === 'number' && typeof rightItem === 'number') {
    return leftItem <= rightItem ? rightChildIndex : leftChildIndex;
  } else if (typeof leftItem === 'number') {
    return leftChildIndex;
  } else if (typeof rightItem === 'number') {
    return rightChildIndex;
  } else {
    return null;
  }
}

/**
 * While the parent index is greater than or equal to zero, if the current index is greater than the
 * parent index, swap the current index with the parent index and set the current index to the parent
 * index.
 * @param {number[]} array - the array to sort
 * @param {number} startIndex - The index of the element that we want to sift up.
 */
function siftUp(array: number[], startIndex: number) {
  let currIndex = startIndex;
  let parentIndex: number;

  while (
    (parentIndex = getParentIndex(currIndex)) >= 0 &&
    array[currIndex] > array[parentIndex]
  ) {
    currIndex = (swap(array, currIndex, parentIndex), parentIndex);
  }
}

/**
 * "While the current index has a child that is less than the current index, swap the current index
 * with the child index."
 * @param {number[]} array - The array to sort.
 * @param {number} startIndex - The index of the element we're currently sifting down.
 * @param {number} partitionLength - The length of the array that we're currently partitioning.
 */
function siftDown(
  array: number[],
  startIndex: number,
  partitionLength: number
) {
  let currIndex = startIndex;
  let maxChildIndex: number | null;

  while (
    (maxChildIndex = getMaxChildIndex(array, currIndex)) !== null &&
    maxChildIndex < partitionLength &&
    array[maxChildIndex] > array[currIndex]
  ) {
    currIndex = (swap(array, currIndex, maxChildIndex), maxChildIndex);
  }
}

/**
 * Starting at the second element, sift up each element until it's in the correct position.
 * @param {number[]} array - The array to be heapified.
 */
function heapify(array: number[]) {
  for (let i = 1, length = array.length; i < length; i++) {
    siftUp(array, i);
  }
}

/**
 * We swap the first element with the last element, then sift down the first element to its correct
 * position
 * @param {number[]} array - the array to sort
 * @param {number} partitionLength - The length of the array that we're partitioning.
 */
function moveMax(array: number[], partitionLength: number) {
  swap(array, 0, --partitionLength);
  siftDown(array, 0, partitionLength);
}

/**
 * "Heapify the array, then move the max element to the end of the array, and repeat until the array is
 * sorted."
 * @param {number[]} array - The array to sort.
 * @returns The array is being returned.
 */
export function heapSort(array: number[]) {
  let length = array.length;

  heapify(array);
  while (length) moveMax(array, length--);

  return array;
}

// --------- Heap sort Object Oriented --------- //

/**
 * "We create a min heap from the array, then remove the minimum element from the heap and add it to
 * the array until the heap is empty."
 * @param {number[]} array - The array to sort.
 * @returns The array is being sorted in place.
 * @complexity - O(nlog(n))
 */
export function heapSortOOP(array: number[]) {
  const heap = new ArrayMinHeap(array);
  return heap.sort(), heap.items();
}