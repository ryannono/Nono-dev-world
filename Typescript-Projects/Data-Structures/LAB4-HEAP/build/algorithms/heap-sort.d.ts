/**
 * "Heapify the array, then move the max element to the end of the array, and repeat until the array is
 * sorted."
 * @param {number[]} array - The array to sort.
 * @returns The array is being returned.
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
