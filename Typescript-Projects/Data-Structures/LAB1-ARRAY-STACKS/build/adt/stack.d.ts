export declare class Stack<dataType> {
    private data;
    private dataLength;
    constructor();
    /**
     * The print() function is a method of the class, and it has access to the data property of the class
     */
    print(): void;
    /**
     * It adds an item to the end of the array and returns the new length of the array
     * @param {dataType} item - The item to be added to the end of the array.
     * @returns The length of the array.
     */
    push(item: dataType): number;
    /**
     * If the stack is empty, return null, otherwise, decrement the dataLength property and return the
     * value at the new dataLength index.
     * @returns The last element in the array.
     */
    pop(): dataType | null;
    /**
     * It returns the last element in the array
     * @returns The last element in the array.
     */
    top(): dataType | null;
    /**
     * It returns the length of the data array
     * @returns The size of the data array.
     */
    size(): number;
    /**
     * If the dataLength property of the object is not equal to zero, return false. Otherwise, return
     * true
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
