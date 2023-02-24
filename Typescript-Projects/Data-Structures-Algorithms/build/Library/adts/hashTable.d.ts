import { defaultHashFunction } from '../functions/hashFunction';
import { Entry } from './priorityQueue';
export declare class HashTable<T> {
    private data;
    private hashFunction;
    private comparator;
    private maxSize;
    private size;
    private numItems;
    constructor(size?: number, hashFunction?: typeof defaultHashFunction);
    /**
     * If the hash table is full, return -1, else if the queue at the index is empty, increment the size of
     * the hash table and insert the entry into the queue, else if the entry is already in the queue,
     * return -1, else insert the entry into the queue
     * @param entry - Entry<number, T>
     * @returns The number of occupied indices and the number of items in the hash table.
     */
    set(entry: Entry<number, T>): -1 | {
        occupiedIndices: number;
        numberOfItems: number;
    };
    /**
     * We use the hash function to find the index of the queue, then we use binary search to find the item
     * in the queue
     * @param {number} key - The key to search for
     * @returns The value of the key
     */
    get(key: number): Entry<number, T>;
    /**
     * We first find the index of the key in the hash table, then we find the index of the key in the queue
     * at that index, and then we remove the key from the queue
     * @param {number} key - The key to be removed
     * @returns The value of the key that was removed.
     */
    remove(key: number): Entry<number, T> | null;
    /**
     * It returns an object with two properties, occupiedIndices and numberOfItems
     * @returns The size of the hash table and the number of items in the hash table.
     */
    getSize(): {
        occupiedIndices: number;
        numberOfItems: number;
    };
    /**
     * @returns  Return true if the size of the hashtable is equal to the maxSize of the hashtable.
     */
    isFull(): boolean;
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
