// ------------------ Queue ------------------ //

import {llQueue} from '../adts/queue';

// ------------- MergeSort Array ------------- //

/**
 * It's merging two sorted arrays into one sorted array
 * @param {number[]} array - The original array.
 * @param {number} leftIndex1 - The left index of the first array.
 * @param {number} rightIndex1 - The last index of the first array.
 * @param {number} leftIndex2 - The left index of the second array.
 * @param {number} rightIndex2 - The last index of the second array.
 * @returns The array is being returned.
 * @complexity O(n) - iterates over every element in the queues
 */
function merge(
  array: number[],
  leftIndex1: number,
  rightIndex1: number,
  leftIndex2: number,
  rightIndex2: number
) {
  const array3: number[] = [];
  let start1 = leftIndex1;
  let start2 = leftIndex2;
  let fullLength = rightIndex2 + 1 - leftIndex1;

  // while there are items to merge into the new array
  // if array2 is empty or the start item of array1 is
  // smaller than array2's push array1's start item
  // otherwise (array1 is empty or array2s item is smaller
  // than array 1's) push array2s item
  while (fullLength--) {
    if (
      start1 <= rightIndex1 &&
      (start2 > rightIndex2 || array[start2] >= array[start1])
    ) {
      array3.push(array[start1++]);
    } else {
      array3.push(array[start2++]);
    }
  }

  /* It's copying the elements of the new array into the original array. */
  for (let i = leftIndex1, length = rightIndex2 + 1; i < length; i++) {
    array[i] = array3[i - leftIndex1];
  }

  return array;
}

/**
 * We recursively split the array in half until we have arrays of length 1, then we merge them back
 * together in sorted order
 * @param {number[]} array - the array to sort
 * @param [leftIndex=0] - the left index of the array
 * @param rightIndex - the last index of the array
 * @returns The sorted array.
 * @ComplexityBestCase O(1) - queue of size 1 otherwise O(nlog(n))
 * @ComplexityAvgCase O(nlog(n)) - spliting to a single element depends on how many times the
 * initial queue is divisible by 2 so log2(n). We have to do the spliting for every element so
 * the splitting will be nlog(n). The merging is O(n). nlog(n) > n so the function is O(nlogn(n))
 * @ComplexityWorstCase O(nlog(n)) - there's no input that will make the program run any slower
 */
export function mergeSort(
  array: number[],
  leftIndex = 0,
  rightIndex = array.length - 1
): number[] {
  if (leftIndex >= rightIndex) return array;

  const half = Math.floor((leftIndex + rightIndex) / 2);

  mergeSort(array, leftIndex, half);
  mergeSort(array, half + 1, rightIndex);

  /* if the array that was split is already sorted return the array
  so we can merge it with another array and skip merging
  it's two already sorted halves with themselves */
  if (array[half] <= array[half + 1]) return array;

  return merge(array, leftIndex, half, half + 1, rightIndex);
}

// --------------- Sort Queue ---------------- //

/**
 * "While there are still items in the queues, add the smaller of the two front items to the new
 * queue."
 *
 * The first thing we do is create a new queue, queue3, which will hold the merged queue. We also
 * create a variable, fullLength, which will hold the total number of items in both queues
 * @param queue1 - a queue of numbers
 * @param queue2 - a queue of numbers
 * @returns A new queue with the elements of the two queues sorted.
 * @complexity O(n) - iterates over every element in the queues
 */
function mergeQueues(queue1: llQueue<number>, queue2: llQueue<number>) {
  const queue3 = new llQueue<number>();
  let fullLength = queue1.size() + queue2.size();

  while (fullLength--) {
    if (
      queue1.size() &&
      (queue2.isEmpty() || queue2.front()! > queue1.front()!)
    ) {
      queue3.enqueue(queue1.dequeue()!);
    } else {
      queue3.enqueue(queue2.dequeue()!);
    }
  }

  return queue3;
}

/**
 * We split the queue in half, recursively sort each half, and then merge the two sorted halves
 * @param queue - the queue to be sorted
 * @returns A sorted queue.
 * @ComplexityBestCase O(1) - queue of size 1 otherwise O(nlog(n))
 * @ComplexityAvgCase O(nlog(n)) - spliting to a single element depends on how many times the
 * initial queue is divisible by 2 so log2(n). We have to do the spliting for every element so
 * the splitting will be nlog(n). The merging is O(n). nlog(n) > n so the function is O(nlogn(n))
 * @ComplexityWorstCase O(nlog(n)) - there's no input that will make the program run any slower
 */
export function mergeSortQueue(queue: llQueue<number>): llQueue<number> {
  if (queue.size() < 2) return queue;

  const queue2 = new llQueue<number>();
  let half = Math.floor(queue.size() / 2);

  while (half--) {
    queue2.enqueue(queue.dequeue()!);
  }

  return mergeQueues(mergeSortQueue(queue), mergeSortQueue(queue2));
}
