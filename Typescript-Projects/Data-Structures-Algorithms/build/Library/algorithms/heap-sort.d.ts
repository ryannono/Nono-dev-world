import { Comparator } from '../functions/comparator';
/**
 * Heapify the array, then move the max element to the end of the array, and repeat until the array is
 * sorted
 * @param {T[]} array - The array to sort.
 * @param comparator - A function that takes two values and returns a number. If the number is less
 * than 0, the first value is considered smaller. If the number is greater than 0, the first value is
 * considered larger. If the number is 0, the two values are considered equal.
 * @returns The array is being returned.
 */
export declare function heapSort<T>(array: T[], comparator?: Comparator<T>): T[];
