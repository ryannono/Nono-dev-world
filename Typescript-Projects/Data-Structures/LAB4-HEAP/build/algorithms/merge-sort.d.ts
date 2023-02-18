import { llQueue } from '../adts/queue';
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
export declare function mergeSort(array: number[], leftIndex?: number, rightIndex?: number): number[];
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
export declare function mergeSortQueue(queue: llQueue<number>): llQueue<number>;
