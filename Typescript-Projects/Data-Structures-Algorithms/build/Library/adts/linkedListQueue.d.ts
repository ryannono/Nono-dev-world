import { LinkedList } from './linkedList';
/**
 * "The llQueue class is a queue that uses a linked list as its underlying data structure."
 *
 * The llQueue class has a constructor that takes an optional parameter. The parameter is a linked
 * list. If the parameter is not provided, the constructor creates a new linked list
 */
export declare class llQueue<T> {
    private data;
    constructor(data?: LinkedList<T>);
    /**
     * Take an array of any type, and return a queue of that type.
     * @param {T[]} array - The array you want to convert to a queue.
     * @returns A new queue with the values of the array in the order they were in the array.
     */
    static arrayToQueue<T>(array: T[]): llQueue<T>;
    /**
     * Convert a queue to an array.
     * @param queue - llQueue<T>
     * @returns An array of the values in the queue.
     */
    static queueToArray<T>(queue: llQueue<T>): (T | null)[];
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
