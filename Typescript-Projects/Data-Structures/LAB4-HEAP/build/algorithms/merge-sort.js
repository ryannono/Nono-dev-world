"use strict";
// ------------------ Queue ------------------ //
Object.defineProperty(exports, "__esModule", { value: true });
const queue_1 = require("../adts/queue");
// ---------------- tests ---------------- //
const testArrays_1 = require("../testArrays");
// -------------- merge Function ------------- //
const merge_1 = require("../functions/merge");
// ---------------- mergeSort --------------- //
/**
 * We split the queue into two queues, sort each of those queues, and then merge the two sorted queues
 * back into the original queue
 * @param queue - the queue to be sorted
 * @returns A sorted queue
 * @ComplexityBestCase O(1) - queue of size 1 otherwise O(nlog(n))
 * @ComplexityAvgCase O(nlog(n)) - spliting to a single element depends on how many times the
 * initial queue is divisible by 2 so log2(n). We have to do the spliting for every element so
 * the splitting will be nlog(n). The merging is O(n). nlog(n) > n so the function is O(nlogn(n))
 * @ComplexityWorstCase O(nlog(n)) - there's no input that will make the program run any slower
 */
function mergeSort(queue) {
    if (queue.size() < 2)
        return queue;
    const length = queue.size();
    let halfPoint = Math.floor(length / 2);
    const queue1 = new queue_1.llQueue();
    const queue2 = new queue_1.llQueue();
    while (queue.size()) {
        if (halfPoint)
            queue1.enqueue(queue.dequeue());
        else
            queue2.enqueue(queue.dequeue());
        halfPoint--;
    }
    mergeSort(queue1);
    mergeSort(queue2);
    (0, merge_1.merge)(queue1, queue2, queue);
    return queue;
}
// ------------------ main ----------------- //
/* It's iterating through the testArrays array and running the mergeSort function on each array. */
testArrays_1.testArrays.forEach((array, testNumber) => {
    console.log(`testing test input #${testNumber}`);
    console.log((0, queue_1.queueToArray)(mergeSort((0, queue_1.arrayToQueue)(array))), '\n');
});
//# sourceMappingURL=merge-sort.js.map