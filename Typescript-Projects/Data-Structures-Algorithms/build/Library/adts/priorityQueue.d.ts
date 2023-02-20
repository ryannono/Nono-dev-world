export declare type Entry<K, V> = {
    key: K;
    value: V;
};
declare type Comparator<K, V> = (element1: Entry<K, V>, element2: Entry<K, V>) => -1 | 0 | 1;
/**
 * It's a priority queue that uses insertion sort to keep the data sorted
 * */
export declare class PriorityQueue<K, V> {
    private data;
    private comparator;
    constructor(comparator: Comparator<K, V>);
    private insertionSort;
    insert(element: Entry<K, V>): number;
    min(): Entry<K, V>;
    removeMin(): Entry<K, V> | undefined;
    max(): Entry<K, V>;
    removeMax(): Entry<K, V> | undefined;
    size(): number;
    isEmpty(): boolean;
    items(): Entry<K, V>[];
    print(): void;
}
export {};
