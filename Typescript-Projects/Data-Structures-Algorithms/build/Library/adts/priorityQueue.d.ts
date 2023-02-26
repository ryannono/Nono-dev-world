import { Comparator } from '../functions/comparator';
export declare type Entry<K, V> = {
    key: K;
    value: V;
};
/**
 * It's a priority queue that uses insertion sort to insert elements
 */
export declare class PriorityQueue<K, V> {
    private data;
    private comparator;
    constructor(comparator: Comparator<Entry<K, V>>);
    /**
     * "If the object is an instance of the PriorityQueue class, then it's a PriorityQueue object."
     *
     * The above function is a type guard. It's a function that returns a boolean value. If the boolean
     * value is true, then the object is of the type specified in the function
     * @param {unknown} obj - unknown - this is the object that we want to check if it's a PriorityQueue.
     * @returns a boolean value.
     */
    static isPriorityQueue<T, V>(obj: unknown): obj is PriorityQueue<T, V>;
    /**
     * It inserts the given elements into the heap, and then sorts the heap
     * @param {Entry<K, V> | Entry<K, V>[]} elements - The element(s) to insert into the heap.
     * @returns The length of the data array.
     */
    insert(elements: Entry<K, V> | Entry<K, V>[]): number;
    /**
     * "Return the first element of the array, or null if the array is empty."
     *
     * The ?? operator is called the nullish coalescing operator. It's a new operator in JavaScript that's
     * similar to the || operator, but it only returns the right-hand side if the left-hand side is null or
     * undefined
     * @returns The minimum value in the heap.
     */
    min(): Entry<K, V>;
    /**
     * Remove the first element from the array and return it
     * @returns The first element of the array.
     */
    removeMin(): Entry<K, V> | null;
    /**
     * Return the last element of the array.
     * @returns The last element in the array.
     */
    max(): Entry<K, V>;
    /**
     * "Remove the last element from the array and return it."
     *
     * The ?? null part is a TypeScript feature called the nullish coalescing operator. It's a way to say
     * "if the value on the left is null or undefined, return the value on the right."
     *
     * The ?? null part is optional. If you're not using TypeScript, you can remove it
     * @returns The last element of the array.
     */
    removeMax(): Entry<K, V> | null;
    /**
     * "Remove the element at the given index and return it, or return null if the index is out of bounds."
     *
     * The first line of the function is a guard clause. It checks if the index is out of bounds, and if it
     * is, it returns null
     * @param {number} index - The index of the element to remove.
     * @returns The element at the given index is being removed from the array and returned.
     */
    removeElementAt(index: number): Entry<K, V>;
    /**
     * Return the length of the data array.
     * @returns The length of the array.
     */
    size(): number;
    /**
     * Return true if the array is empty, otherwise return false.
     * @returns The length of the data array.
     */
    isEmpty(): boolean;
    /**
     * It returns the data property of the class
     * @returns The data array
     */
    items(): Entry<K, V>[];
    /**
     * The print function is a method of the class, and it prints the data property of the class
     */
    print(): void;
}
