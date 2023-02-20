// ----------------- Imports ----------------- //

import {Comparator, defaultComparator} from '../functions/comparator';
import {NumKeyAccessor, defaultNumKeyAccessor} from '../functions/keyAccessor';
import {insertionSort} from './insertion-sort';
import {mergeSort} from './merge-sort';

// ---------------- Bucket Sort ---------------- //

/**
 * We create an array of buckets, each bucket is an array of elements. We then iterate through the
 * array and place each element into the bucket corresponding to its key. We then sort each bucket and
 * concatenate the buckets together
 * @param {T[]} array - The array to be sorted.
 * @param {number} [minKey] - The minimum key value in the array.
 * @param {number} [maxKey] - The maximum key value in the array.
 * @param keyAccessor - A function that takes in an element and returns a number.
 * @param comparator - A function that compares two elements and returns a number.
 * @returns The sorted array.
 */
function bucketSort<T>(
  array: T[],
  minKey?: number,
  maxKey?: number,
  keyAccessor: NumKeyAccessor<T> = defaultNumKeyAccessor,
  comparator: Comparator<T> = defaultComparator
) {
  if (!array.length) return array;

  const getFlooredKey = (element: T) => Math.floor(keyAccessor(element));

  /* If the user does not specify the max and min key,
  we find the max and min key by iterating through the array. */
  if (typeof maxKey === 'undefined' || typeof minKey === 'undefined') {
    let tempMax, tempMin;
    tempMax = tempMin = array[0];

    for (const element of array) {
      if (comparator(element, tempMax) > 0) tempMax = element;
      if (comparator(element, tempMin) < 0) tempMin = element;
    }

    maxKey = getFlooredKey(tempMax);
    minKey = getFlooredKey(tempMin);
  } else {
    minKey = Math.floor(minKey);
    maxKey = Math.floor(maxKey);
  }

  let keyRange = maxKey - minKey + 1;
  const offset = -minKey;
  const containerArray: T[][] = [];

  /* Creating an array of empty arrays. */
  while (keyRange--) containerArray.push([]);

  /* Iterating through the array and placing each element into the bucket corresponding to its key. */
  while (array.length) {
    const currElement = array.pop()!;
    containerArray[getFlooredKey(currElement) + offset].push(currElement);
  }

  /* Sorting the buckets. */
  for (const bucket of containerArray) {
    if (bucket.length < 20) insertionSort(bucket, 0, comparator);
    else mergeSort(bucket);
    array.push(...bucket);
  }

  return array;
}
