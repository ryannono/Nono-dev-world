"use strict";
// ------------------ Queue ------------------ //
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = void 0;
const queue_1 = require("../adts/queue");
// ------------------ merge ------------------ //
/**
 * "Merge two sorted arrays into a single sorted array."
 *
 * The function takes two arrays as input, and returns a single array
 * @param {number[]} array1 - [1, 3, 5, 7, 9]
 * @param {number[]} array2 - [1, 3, 5, 7, 9]
 * @returns A queue with the elements of the two arrays in sorted order.
 * @complexity O(n) - iterates over every element in the queues
 */
function merge(queue1, queue2, queue3) {
    var _a, _b;
    if (Array.isArray(queue1))
        queue1 = (0, queue_1.arrayToQueue)(queue1);
    if (Array.isArray(queue2))
        queue2 = (0, queue_1.arrayToQueue)(queue2);
    if (!queue3)
        queue3 = new queue_1.llQueue();
    const length = queue1.size() + queue2.size();
    while (queue3.size() !== length) {
        const queue1Front = queue1.front();
        const queue2Front = queue2.front();
        if ((typeof queue1Front !== 'number' && queue2Front) ||
            queue1Front > queue2Front) {
            queue3.enqueue((_a = queue2.dequeue()) !== null && _a !== void 0 ? _a : 0);
        }
        else {
            queue3.enqueue((_b = queue1.dequeue()) !== null && _b !== void 0 ? _b : 0);
        }
    }
    return queue3;
}
exports.merge = merge;
//# sourceMappingURL=merge.js.map