import { Comparator } from '../functions/comparator';
export declare type Entry<K, V> = {
    key: K;
    value: V;
};
/**
 * It's a priority queue that uses insertion sort to insert elements
 */
export declare class PriorityQueue<K, V> {
    private data;
    private comparator;
    constructor(comparator: Comparator<Entry<K, V>>);
    insert(elements: Entry<K, V> | Entry<K, V>[]): number;
    min(): Entry<K, V>;
    removeMin(): Entry<K, V> | undefined;
    max(): Entry<K, V>;
    removeMax(): Entry<K, V> | undefined;
    size(): number;
    isEmpty(): boolean;
    items(): Entry<K, V>[];
    print(): void;
}
