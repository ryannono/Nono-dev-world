// ------------------ Queue ------------------ //

import {llQueue, arrayToQueue, queueToArray} from './adts/queue';

// ------------------ merge ------------------ //

/**
 * Merges two provided arrays/queues into a third queue
 *
 * The first thing we do is check if the first two queues are arrays. If they are, we convert them to
 * linked list queues. We also create a third queue if one is not provided
 * @param {number[] | llQueue<number>} queue1 - The first queue to merge
 * @param {number[] | llQueue<number>} queue2 - [1, 3, 5, 7, 9]
 * @param [queue3] - The queue to merge the other two queues into. If not provided, a new queue will be
 * created.
 * @returns A queue with the elements of queue1 and queue2 in sorted order.
 * @complexity O(n) - iterates over every element in the queues
 */
export function merge(
  queue1: number[] | llQueue<number>,
  queue2: number[] | llQueue<number>,
  queue3?: llQueue<number>
) {
  if (Array.isArray(queue1)) queue1 = arrayToQueue(queue1);
  if (Array.isArray(queue2)) queue2 = arrayToQueue(queue2);
  if (!queue3) queue3 = new llQueue<number>();

  const length = queue1.size() + queue2.size();

  while (queue3.size() !== length) {
    const queue1Front = queue1.front();
    const queue2Front = queue2.front();

    if (
      (typeof queue1Front !== 'number' && queue2Front) ||
      queue1Front! > queue2Front!
    ) {
      queue3.enqueue(queue2.dequeue() ?? 0);
    } else {
      queue3.enqueue(queue1.dequeue() ?? 0);
    }
  }

  return queue3;
}

// ----------------- Main ----------------- //

/* Test map with 7 key-value pairs. */
const testLangInputs = new Map([
  [
    1,
    [
      [1, 3, 5, 7, 9],
      [2, 3, 6, 8, 10],
    ],
  ],
  [
    2,
    [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
    ],
  ],
  [
    3,
    [
      [2, 4, 8, 16, 32],
      [1, 3, 5, 7, 9],
    ],
  ],
  [
    4,
    [
      [10, 11, 12, 13],
      [1, 2, 3, 4],
    ],
  ],
]);

/* Iterating over the testLangInputs test map and running the verifyLanguage function on each
value. */
testLangInputs.forEach((Array2D, testNumber) => {
  console.log(`testing test input #${testNumber}`);
  console.log(queueToArray(merge(Array2D[0], Array2D[1])), '\n');
  // const mergeQueue = merge(Array2D[0], Array2D[1]);
  // for (
  //   let i = 0, length = Array2D[0].length + Array2D[1].length;
  //   i < length;
  //   i++
  // ) {
  //   console.log(mergeQueue.dequeue());
  // }
  // console.log('\n');
});
