// ---------------- swap ---------------- //

import {swap} from '../functions/swap';

// ---------------- tests ---------------- //

import {testArrays} from '../testArrays';

// ------------ insertionSort ------------ //

/**
 * For each element in the array, starting from the second element, if the element is less than the
 * previous element, swap it with the previous element until it is greater than or equal to the
 * previous element.
 * @param {number[]} array - number[] - the array to sort
 * @returns The sorted array.
 * @ComplexityBestCase O(1) - array of length 1
 * @ComplexityAvgCase O(n**2) - need to go back and verify each element on each advancment
 * @ComplexityWordtCase O(n**2) - need to go back and verify each element on each advancment
 */
function insertionSort(array: number[]) {
  if (array.length < 2) return array;

  for (
    let positionIndex = 1, length = array.length;
    positionIndex < length;
    positionIndex++
  ) {
    const currElement = array[positionIndex];
    const prevElement = array[positionIndex - 1];

    let swapCount = 0;
    if (currElement < prevElement) {
      for (
        let sortedIndex = positionIndex - 1;
        sortedIndex >= 0;
        sortedIndex--
      ) {
        const currElementIndex = positionIndex - swapCount;
        const sortedElement = array[sortedIndex];

        if (currElement > sortedElement) break;
        swap(array, sortedIndex, currElementIndex);
        swapCount++;
      }
    }
  }

  return array;
}

// ------------------ main ----------------- //

/* Iterating over the testArrays array and logging the test number and the sorted array. */
testArrays.forEach((array, testNumber) => {
  console.log(`testing test input #${testNumber}`);
  console.log(insertionSort(array), '\n');
});
