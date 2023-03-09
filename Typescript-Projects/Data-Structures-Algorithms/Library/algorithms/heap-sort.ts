// -------------- imports -------------- //

import {swap} from '../functions/swap';
import {Comparator, defaultComparator} from '../functions/comparator';

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
 * "Given an array, an index, and a comparator, return the index of the child with the largest value."
 *
 * The function is recursive, but it's not recursive in the way that you might expect. It's not
 * recursive in the way that a function like `getMaxChildIndex` is recursive:
 * @param {T[]} array - The array to sort.
 * @param {number} itemIndex - The index of the item we're looking at.
 * @param comparator - A function that takes two items and returns a number. If the number is less than
 * 0, the first item is less than the second. If the number is greater than 0, the first item is
 * greater than the second. If the number is 0, the two items are equal.
 * @returns The index of the child with the largest value.
 */
function getMaxChildIndex<T>(
  array: T[],
  itemIndex: number,
  comparator: Comparator<T>
) {
  const leftChildIndex = itemIndex * 2 + 1;
  const rightChildIndex = itemIndex * 2 + 2;
  const leftItem = array[leftChildIndex];
  const rightItem = array[rightChildIndex];

  if (leftItem !== undefined && rightItem !== undefined) {
    return comparator(leftItem, rightItem) < 0
      ? rightChildIndex
      : leftChildIndex;
  } else if (leftItem !== undefined) {
    return leftChildIndex;
  } else if (rightItem !== undefined) {
    return rightChildIndex;
  } else {
    return null;
  }
}

/**
 * While the current index has a parent and the current index is greater than its parent, swap the
 * current index with its parent and update the current index to be its parent.
 * @param {T[]} array - The array to sift up.
 * @param {number} startIndex - The index of the element that we want to sift up.
 * @param comparator - A function that takes two elements and returns a number. If the number is
 * greater than 0, the first element is greater than the second. If the number is less than 0, the
 * first element is less than the second. If the number is 0, the two elements are equal.
 */
function siftUp<T>(array: T[], startIndex: number, comparator: Comparator<T>) {
  let currIndex = startIndex;
  let parentIndex: number;

  while (
    (parentIndex = getParentIndex(currIndex)) >= 0 &&
    comparator(array[currIndex], array[parentIndex]) > 0
  ) {
    currIndex = (swap(array, currIndex, parentIndex), parentIndex);
  }
}

/**
 * "While the current index has a child who's value greater than the current index's element's
 * value, swap the current index with the child and update the current index to the child's index."
 *
 * @param {T[]} array - The array to sort.
 * @param {number} startIndex - The index of the element to start sifting down from.
 * @param {number} partitionLength - The length of the partition that we're currently sifting down.
 * @param comparator - A function that takes two values and returns a number. If the number is less
 * than 0, the first value is less than the second. If the number is greater than 0, the first value is
 * greater than the second. If the number is 0, the two values are equal.
 */
function siftDown<T>(
  array: T[],
  startIndex: number,
  partitionLength: number,
  comparator: Comparator<T>
) {
  let currIndex = startIndex;
  let maxChildIndex: number | null;

  while (
    (maxChildIndex = getMaxChildIndex(array, currIndex, comparator)) !== null &&
    maxChildIndex < partitionLength &&
    comparator(array[maxChildIndex], array[currIndex]) > 0
  ) {
    currIndex = (swap(array, currIndex, maxChildIndex), maxChildIndex);
  }
}

/**
 * Starting at the second element, sift up each element until it's in the correct position.
 * @param {T[]} array - The array to be heapified.
 * @param comparator - A function that compares two elements and returns a number.
 */
function heapify<T>(array: T[], comparator: Comparator<T>) {
  for (let i = 1, length = array.length; i < length; i++) {
    siftUp(array, i, comparator);
  }
}

/**
 * Swap the last element with the first element, then sift down the first element to its correct
 * position.
 * @param {T[]} array - The array to extract the maximum from.
 * @param {number} partitionLength - The length of the array to be partitioned.
 * @param comparator - A function that compares two elements and returns a number.
 * @returns The index of the element that was swapped with the first element.
 */
function extractMax<T>(
  array: T[],
  partitionLength: number,
  comparator: Comparator<T>
) {
  swap(array, 0, --partitionLength);
  siftDown(array, 0, partitionLength, comparator);
  return partitionLength;
}

/**
 * "If the array is not already a max heap, heapify it, then extract the max element until the array is
 * sorted."
 * @param {T[]} array - The array to sort.
 * @param [inMaxHeap=false] - If you already have a max heap, you can pass in true to skip the heapify
 * step.
 * @param comparator - A function that takes two arguments and returns a number. If the number is less
 * than 0, the first argument is considered smaller than the second. If the number is greater than 0,
 * the first argument is considered larger than the second. If the number is 0, the two arguments are
 * considered equal.
 * @returns The array is being returned.
 */
export function heapSort<T>(
  array: T[],
  inMaxHeap = false,
  comparator: Comparator<T> = defaultComparator
) {
  let length = array.length;

  if (!inMaxHeap) heapify(array, comparator);
  while (extractMax(array, length--, comparator));
  return array;
}
