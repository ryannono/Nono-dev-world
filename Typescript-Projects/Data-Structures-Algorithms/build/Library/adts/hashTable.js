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
    constructor(size = 1024, hashFunction = hashFunction_1.defaultHashFunction) {
        this.data = [];
        this.comparator = (entry1, entry2) => (0, comparator_1.defaultComparator)(entry1.key, entry2.key);
        this.maxSize = 0;
        this.size = 0;
        this.numItems = 0;
        this.hashFunction = hashFunction;
        let fillTemp = (this.maxSize = size);
        while (fillTemp--)
            this.data.push(new priorityQueue_1.PriorityQueue(this.comparator));
    }
    /**
     * If the hash table is full, return -1, else if the queue at the index is empty, increment the size of
     * the hash table and insert the entry into the queue, else if the entry is already in the queue,
     * return -1, else insert the entry into the queue
     * @param entry - Entry<number, T>
     * @returns The number of occupied indices and the number of items in the hash table.
     */
    set(entry) {
        const index = this.hashFunction(entry.key, this.maxSize);
        const queue = this.data[index];
        if (this.isFull())
            return -1;
        else if (queue.isEmpty())
            ++this.size, queue.insert(entry);
        else if ((0, binary_search_1.binarySearch)(queue.items(), { key: entry.key, value: {} }, this.comparator) !== -1) {
            return -1;
        }
        else
            queue.insert(entry);
        return { occupiedIndices: this.size, numberOfItems: ++this.numItems };
    }
    /**
     * We use the hash function to find the index of the queue, then we use binary search to find the item
     * in the queue
     * @param {number} key - The key to search for
     * @returns The value of the key
     */
    get(key) {
        var _a;
        const index = this.hashFunction(key, this.maxSize);
        const queue = this.data[index];
        if (queue.size() <= 1)
            return queue.min();
        const items = queue.items();
        return ((_a = items[(0, binary_search_1.binarySearch)(items, { key: key, value: {} }, this.comparator)]) !== null && _a !== void 0 ? _a : null);
    }
    /**
     * We first find the index of the key in the hash table, then we find the index of the key in the queue
     * at that index, and then we remove the key from the queue
     * @param {number} key - The key to be removed
     * @returns The value of the key that was removed.
     */
    remove(key) {
        const index = this.hashFunction(key, this.maxSize);
        const queue = this.data[index];
        if (queue.size() === 0)
            return null;
        if (queue.size() === 1) {
            return --this.size, --this.numItems, queue.removeMin();
        }
        const items = queue.items();
        const subIndex = (0, binary_search_1.binarySearch)(items, { key: key, value: {} }, this.comparator);
        return subIndex === -1
            ? null
            : (--this.numItems, items.splice(subIndex, 1)[0]);
    }
    /**
     * It returns an object with two properties, occupiedIndices and numberOfItems
     * @returns The size of the hash table and the number of items in the hash table.
     */
    getSize() {
        return { occupiedIndices: this.size, numberOfItems: this.numItems };
    }
    /**
     * @returns  Return true if the size of the hashtable is equal to the maxSize of the hashtable.
     */
    isFull() {
        return this.size === this.maxSize;
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