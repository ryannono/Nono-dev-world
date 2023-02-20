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

  insert(elements: Entry<K, V> | Entry<K, V>[]) {
    const unsortedStart = this.data.length;

    if (Array.isArray(elements)) this.data.push(...elements);
    else this.data.push(elements);

    insertionSort(this.data, unsortedStart, this.comparator);
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
