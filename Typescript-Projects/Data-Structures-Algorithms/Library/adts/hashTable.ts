// ---------------- Imports ---------------- //

import {binarySearch} from '../algorithms/binary-search';
import {defaultComparator, Comparator} from '../functions/comparator';
import {Entry, PriorityQueue} from './priorityQueue';

// ---------------- HashTable ---------------- //

export class HashTable<T> {
  private data: PriorityQueue<number, T>[] = [];
  private hashFunction = (key: number) => key % this.maxSize;
  private comparator: Comparator<Entry<number, T>> = (entry1, entry2) =>
    defaultComparator(entry1.key, entry2.key);
  private maxSize = 0;
  private size = 0;
  private numItems = 0;

  constructor(size = 1024) {
    let fillTemp = (this.maxSize = size);
    while (fillTemp--) this.data.push(new PriorityQueue(this.comparator));
  }

  /**
   * If the hash table is full, return -1, else if the queue at the index is empty, increment the size of
   * the hash table and insert the entry into the queue, else if the entry is already in the queue,
   * return -1, else insert the entry into the queue
   * @param entry - Entry<number, T>
   * @returns The number of occupied indices and the number of items in the hash table.
   */
  set(entry: Entry<number, T>) {
    const index = this.hashFunction(entry.key);
    const queue = this.data[index];

    if (this.isFull()) return -1;
    else if (queue.isEmpty()) ++this.size, queue.insert(entry);
    else if (
      binarySearch(
        queue.items(),
        {key: entry.key, value: {} as T},
        this.comparator
      ) !== -1
    ) {
      return -1;
    } else queue.insert(entry);
    return {occupiedIndices: this.size, numberOfItems: ++this.numItems};
  }

  /**
   * We use the hash function to find the index of the queue, then we use binary search to find the item
   * in the queue
   * @param {number} key - The key to search for
   * @returns The value of the key
   */
  get(key: number) {
    const index = this.hashFunction(key);
    const queue = this.data[index];

    if (queue.size() <= 1) return queue.min();

    const items = queue.items();

    return (
      items[binarySearch(items, {key: key, value: {} as T}, this.comparator)] ??
      null
    );
  }

  /**
   * We first find the index of the key in the hash table, then we find the index of the key in the queue
   * at that index, and then we remove the key from the queue
   * @param {number} key - The key to be removed
   * @returns The value of the key that was removed.
   */
  remove(key: number) {
    const index = this.hashFunction(key);
    const queue = this.data[index];
    if (queue.size() === 0) return null;
    if (queue.size() === 1) {
      return --this.size, --this.numItems, queue.removeMin();
    }

    const items = queue.items();
    const subIndex = binarySearch(
      items,
      {key: key, value: {} as T},
      this.comparator
    );

    return subIndex === -1
      ? null
      : (--this.numItems, items.splice(subIndex, 1)[0]);
  }

  /**
   * It returns an object with two properties, occupiedIndices and numberOfItems
   * @returns The size of the hash table and the number of items in the hash table.
   */
  getSize() {
    return {occupiedIndices: this.size, numberOfItems: this.numItems};
  }

  /**
   * @returns  Return true if the size of the hashtable is equal to the maxSize of the hashtable.
   */
  isFull() {
    return this.size === this.maxSize;
  }

  /**
   * @returns If the size property of the current instance is truthy, return true, otherwise return false.
   */
  isEmpty() {
    return !this.size;
  }

  /**
   * We loop through each queue in the data array, and then we loop through each entry in the queue, and
   * then we push the key of each entry into the keys array
   * @returns An array of all the keys in the data structure.
   */
  keys() {
    const keys: number[] = [];
    this.data.forEach(queue => {
      keys.push(...queue.items().map(entry => entry.key));
    });
    return keys;
  }

  /**
   * We create an empty array, then we iterate over each queue in the data array, and for each queue we
   * push the values of each entry in the queue into the values array
   * @returns An array of all the values in the queue.
   */
  values() {
    const values: T[] = [];
    this.data.forEach(queue => {
      values.push(...queue.items().map(entry => entry.value));
    });
    return values;
  }
}
