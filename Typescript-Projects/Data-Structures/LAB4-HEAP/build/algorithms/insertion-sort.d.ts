/**
 * For each element in the array, starting from the second element, if the element is less than the
 * previous element, swap it with the previous element until it is greater than or equal to the
 * previous element.
 * @param {number[]} array - number[] - the array to sort
 * @returns The sorted array.
 * @ComplexityBestCase O(1) - array of length 1 or O(n) for a sorted array
 * @ComplexityAvgCase O(n**2) - need to go back and verify each element on each advancment
 * @ComplexityWorstCase O(n**2) - need to go back and verify each element on each advancment
 */
export declare function insertionSort(array: number[]): number[];
