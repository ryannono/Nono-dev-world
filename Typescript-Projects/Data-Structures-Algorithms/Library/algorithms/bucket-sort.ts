// ----------------- Imports ----------------- //

import {quickSort} from './quick-sort';
import {Comparator, defaultComparator} from '../functions/comparator';
import {NumKeyAccessor, defaultNumKeyAccessor} from '../functions/keyAccessor';

// ---------------- Bucket Sort ---------------- //

/**
 * We create an array of arrays, where each array is a bucket. We then iterate through the input array
 * and push each element into the bucket that corresponds to its key. Finally, we iterate through the
 * buckets and sort each bucket using quick sort
 * @param {T[]} array - The array to sort.
 * @param {number} maxKey - The maximum value of the key.
 * @param keyAccessor - A function that takes in an element and returns a number. This number is used
 * to determine which bucket the element should be placed in.
 * @param comparator - A function that takes two elements and returns a number. If the number is less
 * than 0, the first element is less than the second. If the number is greater than 0, the first
 * element is greater than the second. If the number is 0, the two elements are equal.
 * @returns The sorted array.
 */
function bucketSort<T>(
  array: T[],
  maxKey: number,
  keyAccessor: NumKeyAccessor<T> = defaultNumKeyAccessor,
  comparator: Comparator<T> = defaultComparator
) {
  const containerArray: T[][] = [];

  while (maxKey-- + 1) containerArray.push([]);

  while (array.length) {
    const currElement = array.pop()!;
    containerArray[keyAccessor(currElement)].push(currElement);
  }

  for (const bucket of containerArray) {
    quickSort(bucket, 0, bucket.length - 1, comparator);
    array.push(...bucket);
  }

  return array;
}
