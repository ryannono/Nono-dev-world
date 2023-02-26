"use strict";
// ---------------- Imports ---------------- //
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashTable = void 0;
const binary_search_1 = require("../algorithms/binary-search");
const comparator_1 = require("../functions/comparator");
const hashFunction_1 = require("../functions/hashFunction");
const priorityQueue_1 = require("./priorityQueue");
// ---------------- HashTable ---------------- //
class HashTable {
    constructor(hashConstant = 1024, hashFunction = hashFunction_1.defaultHashFunction) {
        this.data = [];
        this.comparator = (entry1, entry2) => (0, comparator_1.defaultComparator)(entry1.key, entry2.key);
        this.size = 0;
        this.hashFunction = hashFunction;
        this.hashConstant = hashConstant;
    }
    /**
     * If the entry is not already in the hash table, insert it into the hash table
     * @param entry - Entry<number, T>
     * @returns The index of the entry in the queue.
     */
    set(entry) {
        const index = this.hashFunction(entry.key, this.hashConstant);
        let queue = this.data[index];
        if (!priorityQueue_1.PriorityQueue.isPriorityQueue(queue)) {
            queue = this.data[index] = new priorityQueue_1.PriorityQueue(this.comparator);
        }
        else if ((0, binary_search_1.binarySearch)(queue.items(), { key: entry.key, value: {} }, this.comparator) !== -1) {
            return -1;
        }
        return queue.insert(entry), ++this.size;
    }
    /**
     * We use the hash function to find the index of the queue we want to search, then we use binary search
     * to find the item in the queue
     * @param {number} key - number - the key to search for
     * @returns The value of the key in the hash table.
     */
    get(key) {
        var _a;
        const index = this.hashFunction(key, this.hashConstant);
        const queue = this.data[index];
        const items = queue.items();
        if (!priorityQueue_1.PriorityQueue.isPriorityQueue(queue))
            return null;
        if (queue.size() === 1)
            return queue.min();
        return ((_a = items[(0, binary_search_1.binarySearch)(queue.items(), { key: key, value: {} }, this.comparator)]) !== null && _a !== void 0 ? _a : null);
    }
    /**
     * We first find the index of the key in the queue, and then we remove the element at that index
     * @param {number} key - number - The key to remove from the hash table.
     * @returns The value of the key that was removed.
     */
    remove(key) {
        const index = this.hashFunction(key, this.hashConstant);
        const queue = this.data[index];
        const items = queue.items();
        if (!priorityQueue_1.PriorityQueue.isPriorityQueue(queue))
            return null;
        if (queue.size() === 1)
            return --this.size, queue.removeMin();
        const subIndex = (0, binary_search_1.binarySearch)(items, { key: key, value: {} }, this.comparator);
        return (subIndex === -1 ? null : --this.size, queue.removeElementAt(subIndex));
    }
    /**
     * @returns The getSize function returns the size of the current object.
     */
    getSize() {
        return this.size;
    }
    /**
     * @returns If the size property of the current instance is truthy, return true, otherwise return false.
     */
    isEmpty() {
        return !this.size;
    }
    /**
     * We loop through each queue in the data array, and then we loop through each entry in the queue, and
     * then we push the key of each entry into the keys array
     * @returns An array of all the keys in the data structure.
     */
    keys() {
        const keys = [];
        this.data.forEach(queue => {
            keys.push(...queue.items().map(entry => entry.key));
        });
        return keys;
    }
    /**
     * We create an empty array, then we iterate over each queue in the data array, and for each queue we
     * push the values of each entry in the queue into the values array
     * @returns An array of all the values in the queue.
     */
    values() {
        const values = [];
        this.data.forEach(queue => {
            values.push(...queue.items().map(entry => entry.value));
        });
        return values;
    }
}
exports.HashTable = HashTable;
//# sourceMappingURL=hashTable.js.map