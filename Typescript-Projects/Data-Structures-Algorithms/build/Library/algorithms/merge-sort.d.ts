import { llQueue } from '../adts/linkedListqueue';
import { Comparator } from '../functions/comparator';
/**
 * We split the array in half, sort the halves, and then merge the sorted halves
 * @param {T[]} array - the array to sort
 * @param [leftIndex=0] - the index of the first element in the left half of the array
 * @param rightIndex - the index of the last element in the array
 * @param comparator - a function that takes two values and returns a number.
 * @returns The sorted array
 * @ComplexityBestCase O(1) - queue of size 1 otherwise O(nlog(n))
 * @ComplexityAvgCase O(nlog(n)) - spliting to a single element depends on how many times the
 * initial queue is divisible by 2 so log2(n). We have to do the spliting for every element so
 * the splitting will be nlog(n). The merging is O(n). nlog(n) > n so the function is O(nlogn(n))
 * @ComplexityWorstCase O(nlog(n)) - there's no input that will make the program run any slower
 */
export declare function mergeSort<T>(array: T[], leftIndex?: number, rightIndex?: number, comparator?: Comparator<T>): T[];
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
