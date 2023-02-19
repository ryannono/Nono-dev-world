/**
 * We start with a pivot, and then we move all the elements that are greater than the pivot to the
 * right of the pivot, and all the elements that are less than the pivot to the left of the pivot
 * @param {number[]} array - the array to be sorted
 * @param leftIndex - the leftmost index of the array
 * @param rightIndex - the index of the last element in the array
 * @returns The sorted array.
 * @ComplexityBestCase O(1) - array of length 1 otherwise O(nlog(n))
 * @ComplexityAvgCase O(nlog(n)) - pivot will be relatively balanced to the array therefore the elements
 * therefore the sorting speed is (how many elements are present)*(how many times each subarray can be split in ~2)
 * or O(nlog(n))
 * @ComplexityWorstCase O(n**2) - when the pivot is extremely unbalanced relative to the array.
 * Ex. smallest or greatest element
 */
export declare function quickSort(array: number[], leftIndex?: number, rightIndex?: number): number[];
