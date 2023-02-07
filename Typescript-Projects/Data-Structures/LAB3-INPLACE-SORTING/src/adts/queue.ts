// ---------------- Linked list ---------------- //

import {LinkedList} from './linkedList';

// ------------------- Queue ------------------- //

export class llQueue<T> {
  private data: LinkedList<T>;

  constructor(data?: LinkedList<T>) {
    this.data = data ?? new LinkedList<T>();
  }

  /**
   * "Add the item to the end of the queue."
   *
   * The function is called enqueue because it adds an item to the queue
   * @param {T} item - T - The item to be added to the queue.
   * @returns The item that was added to the queue.
   */
  enqueue(item: T) {
    return this.data.addLast(item);
  }

  /**
   * Remove the first element from the queue and return it.
   * @returns The first item in the queue.
   */
  dequeue() {
    return this.data.removeFirst()?.item;
  }

  /**
   * "Return the first item in the queue, or null if the queue is empty."
   *
   * The first line of the function is a return statement. The return statement is followed by an
   * expression. The value of the expression is the value that the function returns
   * @returns The first item in the queue.
   */
  front() {
    return this.data.getFirst()?.item;
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

// ------------- Utility functions ------------- //

/**
 * Take an array and return a queue.
 * @param {T[]} array - The array to be converted to a queue.
 * @returns A queue with the values of the array in the order they were in the array.
 */
export function arrayToQueue<T>(array: T[]) {
  const temp = new llQueue<T>();
  array.forEach(val => temp.enqueue(val));
  return temp;
}

/**
 * Convert a queue to an array.
 * @param queue - The queue to convert to an array
 * @returns An array of the values in the queue.
 */
export function queueToArray<T>(queue: llQueue<T>) {
  const temp = new Array<T>();
  let i = 0;
  while (queue.size()) {
    temp[i] = queue.dequeue()!;
    i++;
  }
  temp.forEach(val => queue.enqueue(val));
  return temp;
}
