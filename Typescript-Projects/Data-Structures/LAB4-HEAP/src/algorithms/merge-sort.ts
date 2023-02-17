// ------------------ Queue ------------------ //

import {llQueue, arrayToQueue, queueToArray} from '../adts/queue';

// ---------------- tests ---------------- //

import {testArrays} from '../testArrays';

// -------------- merge Function ------------- //

import {merge} from '../functions/merge';

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
function mergeSort(queue: llQueue<number>) {
  if (queue.size() < 2) return queue;

  const length = queue.size();
  let halfPoint = Math.floor(length / 2);
  const queue1 = new llQueue<number>();
  const queue2 = new llQueue<number>();

  while (queue.size()) {
    if (halfPoint) queue1.enqueue(queue.dequeue()!);
    else queue2.enqueue(queue.dequeue()!);
    halfPoint--;
  }

  mergeSort(queue1);
  mergeSort(queue2);
  merge(queue1, queue2, queue);
  return queue;
}

// ------------------ main ----------------- //

/* It's iterating through the testArrays array and running the mergeSort function on each array. */
testArrays.forEach((array, testNumber) => {
  console.log(`testing test input #${testNumber}`);
  console.log(queueToArray(mergeSort(arrayToQueue(array))), '\n');
});
