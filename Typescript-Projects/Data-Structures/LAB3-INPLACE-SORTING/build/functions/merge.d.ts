import { llQueue } from '../adts/queue';
/**
 * "Merge two sorted arrays into a single sorted array."
 *
 * The function takes two arrays as input, and returns a single array
 * @param {number[]} array1 - [1, 3, 5, 7, 9]
 * @param {number[]} array2 - [1, 3, 5, 7, 9]
 * @returns A queue with the elements of the two arrays in sorted order.
 * @complexity O(n) - iterates over every element in the queues
 */
export declare function merge(queue1: number[] | llQueue<number>, queue2: number[] | llQueue<number>, queue3?: llQueue<number>): llQueue<number>;
