import { Comparator } from '../functions/comparator';
/**
 * "If the array is not already a max heap, heapify it, then extract the max element until the array is
 * sorted."
 * @param {T[]} array - The array to sort.
 * @param [inMaxHeap=false] - If you already have a max heap, you can pass in true to skip the heapify
 * step.
 * @param comparator - A function that takes two arguments and returns a number. If the number is less
 * than 0, the first argument is considered smaller than the second. If the number is greater than 0,
 * the first argument is considered larger than the second. If the number is 0, the two arguments are
 * considered equal.
 * @returns The array is being returned.
 */
export declare function heapSort<T>(array: T[], inMaxHeap?: boolean, comparator?: Comparator<T>): T[];
