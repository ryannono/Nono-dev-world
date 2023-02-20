// ------------------- Swap ------------------- //

import {swap} from '../functions/swap';

// ------------------ Types ------------------- //

export type Entry<K, V> = {key: K; value: V};

type Comparator<K, V> = (
  element1: Entry<K, V>,
  element2: Entry<K, V>
) => -1 | 0 | 1;

// ------------------- Queue ------------------- //

/**
 * It's a priority queue that uses insertion sort to keep the data sorted
 * */
export class PriorityQueue<K, V> {
  private data: Entry<K, V>[] = [];
  private comparator: Comparator<K, V>;

  constructor(comparator: Comparator<K, V>) {
    this.comparator = comparator;
  }

  private insertionSort(unsortedStart: number) {
    for (
      let length = this.data.length;
      unsortedStart < length;
      unsortedStart++
    ) {
      let currElementIndex = unsortedStart;
      let sortedIndex = unsortedStart - 1;

      while (
        sortedIndex >= 0 &&
        this.comparator(this.data[sortedIndex], this.data[currElementIndex]) > 0
      ) {
        swap(this.data, sortedIndex, currElementIndex);
        currElementIndex = sortedIndex--;
      }
    }
  }

  insert(element: Entry<K, V>) {
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
    return !this.data.length ? true : false;
  }

  items() {
    return this.data;
  }

  print() {
    console.log(this.data);
  }
}
