import {insertionSort} from '../../Library/algorithms/insertion-sort';

/** Creating a map with 3 keys and 3 arrays as values. */
export const testArrays = new Map([
  [1, [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]],
  [2, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
  [3, [1, 2, 4, 5, 3, 7, 8, 10, 11, 9, 6]],
]);

/* Iterating over the testArrays array and logging the test number and the sorted array. */
testArrays.forEach((array, testNumber) => {
  console.log(`testing test input #${testNumber}`);
  console.log(insertionSort(array), '\n');
});
