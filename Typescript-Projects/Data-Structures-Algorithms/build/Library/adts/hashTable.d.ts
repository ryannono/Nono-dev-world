import { defaultHashFunction } from '../functions/hashFunction';
import { Entry } from './priorityQueue';
export declare class HashTable<T> {
    private data;
    private hashFunction;
    private comparator;
    private hashConstant;
    private size;
    constructor(hashConstant?: number, hashFunction?: typeof defaultHashFunction);
    /**
     * If the entry is not already in the hash table, insert it into the hash table
     * @param entry - Entry<number, T>
     * @returns The index of the entry in the queue.
     */
    set(entry: Entry<number, T>): number;
    /**
     * We use the hash function to find the index of the queue we want to search, then we use binary search
     * to find the item in the queue
     * @param {number} key - number - the key to search for
     * @returns The value of the key in the hash table.
     */
    get(key: number): Entry<number, T> | null;
    /**
     * We first find the index of the key in the queue, and then we remove the element at that index
     * @param {number} key - number - The key to remove from the hash table.
     * @returns The value of the key that was removed.
     */
    remove(key: number): Entry<number, T> | null;
    /**
     * @returns The getSize function returns the size of the current object.
     */
    getSize(): number;
    /**
     * @returns If the size property of the current instance is truthy, return true, otherwise return false.
     */
    isEmpty(): boolean;
    /**
     * We loop through each queue in the data array, and then we loop through each entry in the queue, and
     * then we push the key of each entry into the keys array
     * @returns An array of all the keys in the data structure.
     */
    keys(): number[];
    /**
     * We create an empty array, then we iterate over each queue in the data array, and for each queue we
     * push the values of each entry in the queue into the values array
     * @returns An array of all the values in the queue.
     */
    values(): T[];
}
