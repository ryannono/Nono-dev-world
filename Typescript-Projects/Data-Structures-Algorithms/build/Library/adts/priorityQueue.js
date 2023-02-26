"use strict";
// ------------------- Swap ------------------- //
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityQueue = void 0;
const insertion_sort_1 = require("../algorithms/insertion-sort");
// ------------------- Queue ------------------- //
/**
 * It's a priority queue that uses insertion sort to insert elements
 */
class PriorityQueue {
    constructor(comparator) {
        this.data = [];
        this.comparator = comparator;
    }
    /**
     * "If the object is an instance of the PriorityQueue class, then it's a PriorityQueue object."
     *
     * The above function is a type guard. It's a function that returns a boolean value. If the boolean
     * value is true, then the object is of the type specified in the function
     * @param {unknown} obj - unknown - this is the object that we want to check if it's a PriorityQueue.
     * @returns a boolean value.
     */
    static isPriorityQueue(obj) {
        return obj instanceof PriorityQueue;
    }
    /**
     * It inserts the given elements into the heap, and then sorts the heap
     * @param {Entry<K, V> | Entry<K, V>[]} elements - The element(s) to insert into the heap.
     * @returns The length of the data array.
     */
    insert(elements) {
        const unsortedStart = this.data.length;
        if (Array.isArray(elements))
            this.data.push(...elements);
        else
            this.data.push(elements);
        (0, insertion_sort_1.insertionSort)(this.data, unsortedStart, this.comparator);
        return this.data.length;
    }
    /**
     * "Return the first element of the array, or null if the array is empty."
     *
     * The ?? operator is called the nullish coalescing operator. It's a new operator in JavaScript that's
     * similar to the || operator, but it only returns the right-hand side if the left-hand side is null or
     * undefined
     * @returns The minimum value in the heap.
     */
    min() {
        var _a;
        return (_a = this.data[0]) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Remove the first element from the array and return it
     * @returns The first element of the array.
     */
    removeMin() {
        var _a;
        return (_a = this.data.shift()) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Return the last element of the array.
     * @returns The last element in the array.
     */
    max() {
        var _a;
        return (_a = this.data[this.data.length - 1]) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * "Remove the last element from the array and return it."
     *
     * The ?? null part is a TypeScript feature called the nullish coalescing operator. It's a way to say
     * "if the value on the left is null or undefined, return the value on the right."
     *
     * The ?? null part is optional. If you're not using TypeScript, you can remove it
     * @returns The last element of the array.
     */
    removeMax() {
        var _a;
        return (_a = this.data.pop()) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * "Remove the element at the given index and return it, or return null if the index is out of bounds."
     *
     * The first line of the function is a guard clause. It checks if the index is out of bounds, and if it
     * is, it returns null
     * @param {number} index - The index of the element to remove.
     * @returns The element at the given index is being removed from the array and returned.
     */
    removeElementAt(index) {
        var _a;
        return (_a = this.data.splice(index, 1)[0]) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * Return the length of the data array.
     * @returns The length of the array.
     */
    size() {
        return this.data.length;
    }
    /**
     * Return true if the array is empty, otherwise return false.
     * @returns The length of the data array.
     */
    isEmpty() {
        return !this.data.length;
    }
    /**
     * It returns the data property of the class
     * @returns The data array
     */
    items() {
        return this.data;
    }
    /**
     * The print function is a method of the class, and it prints the data property of the class
     */
    print() {
        console.log(this.data);
    }
}
exports.PriorityQueue = PriorityQueue;
//# sourceMappingURL=priorityQueue.js.map