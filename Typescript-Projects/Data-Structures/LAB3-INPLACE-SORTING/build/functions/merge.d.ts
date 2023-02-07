import { llQueue } from '../adts/queue';
/**
 * Merges two provided arrays/queues into a third queue
 *
 * The first thing we do is check if the first two queues are arrays. If they are, we convert them to
 * linked list queues. We also create a third queue if one is not provided
 * @param {number[] | llQueue<number>} queue1 - The first queue to merge
 * @param {number[] | llQueue<number>} queue2 - [1, 3, 5, 7, 9]
 * @param [queue3] - The queue to merge the other two queues into. If not provided, a new queue will be
 * created.
 * @returns A queue with the elements of queue1 and queue2 in sorted order.
 * @complexity O(n) - iterates over every element in the queues
 */
export declare function merge(queue1: number[] | llQueue<number>, queue2: number[] | llQueue<number>, queue3?: llQueue<number>): llQueue<number>;
