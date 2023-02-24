// ------------------- Swap ------------------- //

import {insertionSort} from '../algorithms/insertion-sort';
import {Comparator} from '../functions/comparator';

// ------------------ Types ------------------- //

export type Entry<K, V> = {key: K; value: V};

// ------------------- Queue ------------------- //

/**
 * It's a priority queue that uses insertion sort to insert elements
 */
export class PriorityQueue<K, V> {
  private data: Entry<K, V>[] = [];
  private comparator: Comparator<Entry<K, V>>;

  constructor(comparator: Comparator<Entry<K, V>>) {
    this.comparator = comparator;
  }

  /**
   * It inserts the given elements into the heap, and then sorts the heap
   * @param {Entry<K, V> | Entry<K, V>[]} elements - The element(s) to insert into the heap.
   * @returns The length of the data array.
   */
  insert(elements: Entry<K, V> | Entry<K, V>[]) {
    const unsortedStart = this.data.length;

    if (Array.isArray(elements)) this.data.push(...elements);
    else this.data.push(elements);

    insertionSort(this.data, unsortedStart, this.comparator);
    return this.data.length;
  }

  /**
   * "Return the first element of the array, or null if the array is empty."
   *
   * The ?? operator is called the nullish coalescing operator. It's a new operator in JavaScript that's
   * similar to the || operator, but it only returns the right-hand side if the left-hand side is null or
   * undefined
   * @returns The minimum value in the heap.
   */
  min() {
    return this.data[0] ?? null;
  }

  /**
   * Remove the first element from the array and return it
   * @returns The first element of the array.
   */
  removeMin() {
    return this.data.shift() ?? null;
  }

  /**
   * Return the last element of the array.
   * @returns The last element in the array.
   */
  max() {
    return this.data[this.data.length - 1] ?? null;
  }

  /**
   * "Remove the last element from the array and return it."
   *
   * The ?? null part is a TypeScript feature called the nullish coalescing operator. It's a way to say
   * "if the value on the left is null or undefined, return the value on the right."
   *
   * The ?? null part is optional. If you're not using TypeScript, you can remove it
   * @returns The last element of the array.
   */
  removeMax() {
    return this.data.pop() ?? null;
  }

  /**
   * Return the length of the data array.
   * @returns The length of the array.
   */
  size() {
    return this.data.length;
  }

  /**
   * Return true if the array is empty, otherwise return false.
   * @returns The length of the data array.
   */
  isEmpty() {
    return !this.data.length;
  }

  /**
   * It returns the data property of the class
   * @returns The data array
   */
  items() {
    return this.data;
  }

  /**
   * The print function is a method of the class, and it prints the data property of the class
   */
  print() {
    console.log(this.data);
  }
}
