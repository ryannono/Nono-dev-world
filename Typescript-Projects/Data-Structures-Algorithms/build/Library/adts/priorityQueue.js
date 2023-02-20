"use strict";
// ------------------- Swap ------------------- //
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityQueue = void 0;
const swap_1 = require("../functions/swap");
// ------------------- Queue ------------------- //
/**
 * It's a priority queue that uses insertion sort to keep the data sorted
 * */
class PriorityQueue {
    constructor(comparator) {
        this.data = [];
        this.comparator = comparator;
    }
    insertionSort(unsortedStart) {
        for (let length = this.data.length; unsortedStart < length; unsortedStart++) {
            let currElementIndex = unsortedStart;
            let sortedIndex = unsortedStart - 1;
            while (sortedIndex >= 0 &&
                this.comparator(this.data[sortedIndex], this.data[currElementIndex]) > 0) {
                (0, swap_1.swap)(this.data, sortedIndex, currElementIndex);
                currElementIndex = sortedIndex--;
            }
        }
    }
    insert(element) {
        this.data.push(element);
        this.insertionSort(this.data.length - 1);
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