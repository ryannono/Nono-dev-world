// ----------------- Imports ----------------- //

import {Entry} from '../adts/priorityQueue';

// ---------------- Bucket Sort ---------------- //

/**
 * We create an array of arrays, then we push each element of the input array into the appropriate
 * bucket, then we concatenate each bucket into the input array
 * @param {number[]} array - The array to sort.
 * @param {number} maxKey - The maximum value in the array.
 * @returns sorted array
 */
function bucketSort(array: number[], maxVal: number) {
  const containerArray: number[][] = [];

  while (maxVal-- + 1) containerArray.push([]);

  while (array.length) {
    const currElement = array.pop()!;
    containerArray[currElement].push(currElement);
  }

  for (const bucket of containerArray) array.push(...bucket);

  return array;
}

/**
 * We create an array of arrays, then we push each element of the input array into the appropriate
 * bucket, then we concatenate all the buckets back into the input array
 * @param {Entry<number, unknown>[]} array - The array to sort.
 * @param {number} maxKey - The maximum key value in the array.
 * @returns The array is being returned.
 */
function bucketSortEntries(array: Entry<number, unknown>[], maxKey: number) {
  const containerArray: Entry<number, unknown>[][] = [];

  while (maxKey-- + 1) containerArray.push([]);

  while (array.length) {
    const currElement = array.pop()!;
    containerArray[currElement.key].push(currElement);
  }

  for (const bucket of containerArray) array.push(...bucket);

  return array;
}
