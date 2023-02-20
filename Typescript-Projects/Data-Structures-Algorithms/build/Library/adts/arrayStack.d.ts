export declare class ArrayStack<T> {
    private data;
    private dataLength;
    constructor();
    /**
     * The print() function is a method of the class, and it has access to the data property of the class
     */
    print(): void;
    /**
     * The push function takes an item of type T and adds it to the end of the array, returning the new
     * length of the array.
     * @param {T} item - The item to be added to the end of the array.
     * @returns The length of the array.
     */
    push(item: T): number;
    /**
     * If the stack is empty, return null, otherwise return the last element in the array and decrement the
     * dataLength property
     * @returns The last element in the array.
     */
    pop(): T | null;
    /**
     * It returns the last element in the array
     * @returns The last element in the array.
     */
    top(): T | null;
    /**
     * It returns the length of the data array
     * @returns The size of the data array.
     */
    size(): number;
    /**
     * Return true if the dataLength property is falsy, otherwise return false.
     * @returns The return value is a boolean.
     */
    isEmpty(): boolean;
    /**
     * It clears the array by setting the dataLength property to 0
     */
    clear(): void;
    /**
     * It sets the data array to an empty array and sets the dataLength to 0
     */
    destroy(): void;
}
