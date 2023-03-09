"use strict";
// ---------------- Linked list ---------------- //
Object.defineProperty(exports, "__esModule", { value: true });
exports.llQueue = void 0;
const linkedList_1 = require("./linkedList");
// ------------------- Queue ------------------- //
/**
 * "The llQueue class is a queue that uses a linked list as its underlying data structure."
 *
 * The llQueue class has a constructor that takes an optional parameter. The parameter is a linked
 * list. If the parameter is not provided, the constructor creates a new linked list
 */
class llQueue {
    constructor(data) {
        this.data = data !== null && data !== void 0 ? data : new linkedList_1.LinkedList();
    }
    /**
     * Take an array of any type, and return a queue of that type.
     * @param {T[]} array - The array you want to convert to a queue.
     * @returns A new queue with the values of the array in the order they were in the array.
     */
    static arrayToQueue(array) {
        const temp = new llQueue();
        array.forEach(val => temp.enqueue(val));
        return temp;
    }
    /**
     * Convert a queue to an array.
     * @param queue - llQueue<T>
     * @returns An array of the values in the queue.
     */
    static queueToArray(queue) {
        return linkedList_1.LinkedList.linkedListToArray(queue.data);
    }
    /**
     * "Add the item to the end of the queue."
     *
     * The function is called enqueue because it adds an item to the queue
     * @param {T} item - T - The item to be added to the queue.
     * @returns The item that was added to the queue.
     */
    enqueue(item) {
        return this.data.addLast(item);
    }
    /**
     * Remove the first element from the queue and return it.
     * @returns The first item in the queue.
     */
    dequeue() {
        var _a;
        return (_a = this.data.removeFirst()) === null || _a === void 0 ? void 0 : _a.item;
    }
    /**
     * "Return the first item in the queue, or null if the queue is empty."
     *
     * The first line of the function is a return statement. The return statement is followed by an
     * expression. The value of the expression is the value that the function returns
     * @returns The first item in the queue.
     */
    front() {
        var _a;
        return (_a = this.data.getFirst()) === null || _a === void 0 ? void 0 : _a.item;
    }
    /**
     * Return the size of the data.
     * @returns The size of the data array.
     */
    size() {
        return this.data.size();
    }
    /**
     * If the size of the data property is greater than 0, return false, otherwise return true
     * @returns The size of the data.
     */
    isEmpty() {
        return !this.data.size() ? true : false;
    }
}
exports.llQueue = llQueue;
//# sourceMappingURL=linkedListQueue.js.map