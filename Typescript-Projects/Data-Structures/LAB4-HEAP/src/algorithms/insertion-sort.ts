// ---------------- swap ---------------- //

import {swap} from '../functions/swap';

// ------------ insertionSort ------------ //

/**
 * We start at the second element in the array and compare it to the element before it. If the element
 * before it is greater than the current element, we swap them. We then move on to the next element and
 * repeat the process
 * @param {number[]} array - The array to be sorted
 * @returns The sorted array.
 * @ComplexityBestCase O(1) - array of length 1 or O(n) for a sorted array
 * @ComplexityAvgCase O(n**2) - need to go back and verify each element on each advancment
 * @ComplexityWorstCase O(n**2) - need to go back and verify each element on each advancment
 */
export function insertionSort(array: number[]) {
  for (
    let unsortedStart = 1, length = array.length;
    unsortedStart < length;
    unsortedStart++
  ) {
    let currElementIndex = unsortedStart;
    let sortedIndex = unsortedStart - 1;

    while (sortedIndex >= 0 && array[sortedIndex] > array[currElementIndex]) {
      swap(array, sortedIndex, currElementIndex);
      currElementIndex = sortedIndex--;
    }
  }

  return array;
}
