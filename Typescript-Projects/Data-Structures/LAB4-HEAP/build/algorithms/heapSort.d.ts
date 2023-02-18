/**
 * Heapify the array, then remove the min element from the heap until the heap is empty
 * @param {number[]} array - The array to sort.
 * @returns The sorted array.
 */
export declare function heapSort(array: number[]): number[];
/**
 * "We create a min heap from the array, then remove the minimum element from the heap and add it to
 * the array until the heap is empty."
 * @param {number[]} array - The array to sort.
 * @returns The array is being sorted in place.
 * @complexity - O(nlog(n))
 */
export declare function heapSortOOP(array: number[]): number[];
