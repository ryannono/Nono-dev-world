import { LinkedList } from './linkedList';
export declare class llQueue<T> {
    private data;
    constructor(data?: LinkedList<T>);
    /**
     * "Add the item to the end of the queue."
     *
     * The function is called enqueue because it adds an item to the queue
     * @param {T} item - T - The item to be added to the queue.
     * @returns The item that was added to the queue.
     */
    enqueue(item: T): number;
    /**
     * Remove the first element from the queue and return it.
     * @returns The first item in the queue.
     */
    dequeue(): T | null | undefined;
    /**
     * "Return the first item in the queue, or null if the queue is empty."
     *
     * The first line of the function is a return statement. The return statement is followed by an
     * expression. The value of the expression is the value that the function returns
     * @returns The first item in the queue.
     */
    front(): T | null | undefined;
    /**
     * Return the size of the data.
     * @returns The size of the data array.
     */
    size(): number;
    /**
     * If the size of the data property is greater than 0, return false, otherwise return true
     * @returns The size of the data.
     */
    isEmpty(): boolean;
}
/**
 * Take an array and return a queue.
 * @param {T[]} array - The array to be converted to a queue.
 * @returns A queue with the values of the array in the order they were in the array.
 */
export declare function arrayToQueue<T>(array: T[]): llQueue<T>;
/**
 * It takes a queue and returns an array of the same elements.
 * @param queue - The queue to convert to an array.
 * @returns An array of the values in the queue.
 */
export declare function queueToArray<T>(queue: llQueue<T>): T[];
