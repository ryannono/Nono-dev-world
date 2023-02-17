// -------------- MinHeap -------------- //

import {MinHeap} from '../adts/minHeap';

// ---------------- tests -------------- //

import {testArrays} from '../testArrays';

// ------------- Heap sort ------------- //

/**
 * We create a new MinHeap, insert each element of the array into the heap, and return the heap.
 * @param {number[]} array - The array to be sorted.
 * @returns A min heap
 */
function heapify(array: number[]) {
  const heap = new MinHeap<number>();
  array.forEach(element => heap.insert(element));
  return heap;
}

/**
 * "We heapify the array, then remove the minimum element from the heap until the heap is empty,
 * storing the removed elements in the array."
 * @param {number[]} array - The array to sort.
 * @returns The sorted array.
 */
function heapSort(array: number[]) {
  const heap = heapify(array);
  for (let i = 0; !heap.isEmpty(); i++) {
    array[i] = heap.removeMin()!;
  }
  return array;
}

// ------------------ main ----------------- //

/* Iterating over the testArrays array and logging the test number and the sorted array. */
testArrays.forEach((array, testNumber) => {
  console.log(`testing test input #${testNumber}`);
  console.log(heapSort(array), '\n');
});
