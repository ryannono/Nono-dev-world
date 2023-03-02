// ---------------- Imports ---------------- //

import {binarySearch} from '../algorithms/binary-search';
import {defaultComparator, Comparator} from '../functions/comparator';
import {HashFunction, defaultHashFunction} from '../functions/hashFunction';
import {Entry, PriorityQueue} from './priorityQueue';

// ---------------- HashTable ---------------- //

/* We use a hash function to map a key to an index in an array, and then we use a priority queue to
store the entries at that index */
export class HashTable<T> {
  private data: PriorityQueue<number, T>[] = [];
  private hashFunction: HashFunction;
  private comparator: Comparator<Entry<number, T>> = (entry1, entry2) =>
    defaultComparator(entry1.key, entry2.key);
  private hashConstant: number;
  private size = 0;

  constructor(hashConstant = 1024, hashFunction = defaultHashFunction) {
    this.hashFunction = hashFunction;
    this.hashConstant = hashConstant;
  }

  /**
   * If the entry is not already in the hash table, insert it into the hash table
   * @param entry - Entry<number, T>
   * @returns The index of the entry in the queue.
   */
  set(entry: Entry<number, T>) {
    const index = this.hashFunction(entry.key, this.hashConstant);
    let queue: PriorityQueue<number, T> | undefined = this.data[index];

    if (!PriorityQueue.isPriorityQueue(queue)) {
      queue = this.data[index] = new PriorityQueue(this.comparator);
    } else if (
      binarySearch(
        queue.items(),
        {key: entry.key, value: {} as T},
        this.comparator
      ) !== -1
    ) {
      return -1;
    }

    return queue.insert(entry), ++this.size;
  }

  /**
   * We use the hash function to find the index of the queue we want to search, then we use binary search
   * to find the item in the queue
   * @param {number} key - number - the key to search for
   * @returns The value of the key in the hash table.
   */
  get(key: number) {
    const index = this.hashFunction(key, this.hashConstant);
    const queue: PriorityQueue<number, T> | undefined = this.data[index];
    const items = queue.items();

    if (!PriorityQueue.isPriorityQueue(queue)) return null;
    if (queue.size() === 1) return queue.min();

    return (
      items[
        binarySearch(queue.items(), {key: key, value: {} as T}, this.comparator)
      ] ?? null
    );
  }

  /**
   * We first find the index of the key in the queue, and then we remove the element at that index
   * @param {number} key - number - The key to remove from the hash table.
   * @returns The value of the key that was removed.
   */
  remove(key: number) {
    const index = this.hashFunction(key, this.hashConstant);
    const queue = this.data[index];
    const items = queue.items();

    if (!PriorityQueue.isPriorityQueue(queue)) return null;
    if (queue.size() === 1) return --this.size, queue.removeMin();

    const subIndex = binarySearch(
      items,
      {key: key, value: {} as T},
      this.comparator
    );

    return (
      subIndex === -1 ? null : --this.size, queue.removeElementAt(subIndex)
    );
  }

  /**
   * @returns The getSize function returns the size of the current object.
   */
  getSize() {
    return this.size;
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

  /**
   * It returns a copy of the data array, where each queue is replaced with its items
   * @returns An array of arrays.
   */
  table() {
    return [...this.data].map(queue => {
      if (!PriorityQueue.isPriorityQueue(queue)) return queue;
      return queue.items();
    });
  }
}

const hash = new HashTable();
hash.set({key: 1, value: 1});
hash.set({key: 2, value: 2});
hash.set({key: 3, value: 3});
hash.set({key: 4, value: 4});

console.log(hash.table());
