"use strict";
// ------------------- Stack ------------------- //
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
/* It's a class that creates a stack data structure */
class Stack {
    constructor() {
        this.data = [];
        this.dataLength = 0;
    }
    /**
     * It adds an item to the end of the array and returns the new length of the array
     * @param {dataType} item - The item to be added to the end of the array.
     * @returns The length of the array.
     */
    push(item) {
        this.data[this.dataLength] = item;
        this.dataLength++;
        return this.dataLength;
    }
    /**
     * If the stack is empty, return null, otherwise, decrement the dataLength property and return the
     * value at the new dataLength index.
     * @returns The last element in the array.
     */
    pop() {
        if (this.isEmpty())
            return null;
        this.dataLength--;
        return this.data[this.dataLength];
    }
    /**
     * It returns the last element in the array
     * @returns The last element in the array.
     */
    top() {
        if (this.isEmpty())
            return null;
        return this.data[this.dataLength - 1];
    }
    /**
     * It returns the length of the data array
     * @returns The size of the data array.
     */
    size() {
        return this.dataLength;
    }
    /**
     * If the dataLength property of the object is not equal to zero, return false. Otherwise, return
     * true
     * @returns The return value is a boolean.
     */
    isEmpty() {
        return !this.dataLength ? true : false;
    }
    /**
     * It clears the array by setting the dataLength property to 0
     */
    clear() {
        this.dataLength = 0;
    }
    /**
     * It sets the data array to an empty array and sets the dataLength to 0
     */
    destroy() {
        this.data = [];
        this.dataLength = 0;
    }
}
exports.Stack = Stack;
//# sourceMappingURL=Stack.js.map