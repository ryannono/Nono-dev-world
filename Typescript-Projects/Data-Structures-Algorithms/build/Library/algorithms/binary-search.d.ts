import { Comparator } from '../functions/comparator';
/**
 * "While the lower bound index is less than or equal to the upper bound index, find the middle index
 * of the lower and upper bound indices, and if the value at the middle index is greater than the
 * search value, set the upper bound index to the middle index minus one, else if the value at the
 * middle index is less than the search value, set the lower bound index to the middle index plus one,
 * else break out of the loop."
 *
 * The first thing to notice is that the function is generic, meaning that it can be used with any type
 * of array. The second thing to notice is that the function takes a comparator function as an optional
 * parameter. The comparator function is used to compare the search value with the value at the current
 * index. The default comparator function is a simple function that returns the difference between the
 * two values
 * @param {T[]} sortedArray - The array to search through.
 * @param {T} searchValue - The value we're searching for.
 * @param comparator - A function that takes two values and returns a number. If the number is greater
 * than 0, the first value is greater than the second. If the number is less than 0, the first value is
 * less than the second. If the number is 0, the two values are equal.
 * @param [lowerBoundIndex=0] - The index of the lower bound of the search.
 * @param upperBoundIndex - The index of the last element in the array.
 * @returns The index of the searchValue in the sortedArray.
 */
export declare function binarySearch<T>(sortedArray: T[], searchValue: T, comparator?: Comparator<T>, lowerBoundIndex?: number, upperBoundIndex?: number): number;
