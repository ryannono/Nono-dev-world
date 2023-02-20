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
    insert(elements) {
        const unsortedStart = this.data.length;
        if (Array.isArray(elements))
            this.data.push(...elements);
        else
            this.data.push(elements);
        (0, insertion_sort_1.insertionSort)(this.data, unsortedStart, this.comparator);
        return this.data.length;
    }
    min() {
        return this.data[0];
    }
    removeMin() {
        return this.data.shift();
    }
    max() {
        return this.data[this.data.length - 1];
    }
    removeMax() {
        return this.data.pop();
    }
    size() {
        return this.data.length;
    }
    isEmpty() {
        return !this.data.length;
    }
    items() {
        return this.data;
    }
    print() {
        console.log(this.data);
    }
}
exports.PriorityQueue = PriorityQueue;
//# sourceMappingURL=priorityQueue.js.map