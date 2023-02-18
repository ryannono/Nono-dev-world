// ---------------- heapSort ---------------- //

import {heapSort} from './algorithms/heapSort';
import {mergeSort} from './algorithms/merge-sort';
import {quickSort} from './algorithms/quick-sort';
import {arrayToQueue, queueToArray} from './adts/queue';

// ---------------- heapSort ---------------- //

/** Creating a map with 3 keys and 3 arrays as values. */
export const testArrays = new Map([
  [1, [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]],
  [2, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
  [3, [1, 3, 5, 7, 9, 10, 8, 6, 4, 2]],
]);

// ------------------ main ----------------- //

/* Iterating over the testArrays array and logging the test number and the sorted array. */
testArrays.forEach((array, testNumber) => {
  console.log(`testing test input #${testNumber}`);
  console.log(mergeSort(array), '\n');
});
