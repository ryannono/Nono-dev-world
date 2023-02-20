import { Comparator } from '../functions/comparator';
/**
 * We start at the second element in the array and compare it to the element before it. If the element
 * before it is greater than the current element, we swap them. We then move to the next element and
 * repeat the process
 * @param {T[]} array - The array to sort.
 * @param [unsortedStart=1] - The index of the first element in the unsorted part of the array.
 * @param comparator - A function that takes two arguments and returns a number. If the number is less
 * than 0, the first argument is sorted before the second. If the number is greater than 0, the second
 * argument is sorted before the first. If the number is 0, the two arguments are considered equal.
 * @returns The array that was passed in.
 */
export declare function insertionSort<T>(array: T[], unsortedStart?: number, comparator?: Comparator<T>): T[];
