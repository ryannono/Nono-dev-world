declare class Node<T> {
    item: T | null;
    next: Node<T> | null;
    constructor(item?: T, next?: Node<T>);
}
export declare class LinkedList<T> {
    private head;
    private length;
    constructor(headOrItem?: Node<T> | T);
    /**
     * If the elementToCheck has an item property, then it's a Node<T> and we return true. Otherwise, it's
     * a T and we return false
     * @param {Node<T> | T} elementToCheck - Node<T> | T
     * @returns a boolean value.
     */
    private isNode;
    /**
     * "Get the second last node in the linked list."
     *
     * The function takes in a head node and returns the second last node
     * @param head - The head of the linked list.
     * @returns The second to last node in the linked list.
     */
    private getSecondLastNode;
    /**
     * We create a new node, set the next property of the new node to the current head, increment the
     * length, set the head to the new node, and return the new node
     * @param {T} item - the item to be added to the list
     * @returns The head of the linked list.
     */
    addFirst(item: T): number;
    /**
     * "Remove the first node from the list and return it."
     *
     * The first thing we do is decrement the length of the list
     * @returns The old head is being returned.
     */
    removeFirst(): Node<T> | null;
    /**
     * If the list is empty, set the head to the new node. If the list has one item, set the head's next to
     * the new node. If the list has two or more items, set the second last node's next to the new node
     * @param {T} item - T - the item to add to the end of the list
     * @returns The length of the linked list.
     */
    addLast(item: T): number;
    /**
     * We're removing the last node by setting the second last node's next property to null
     * @returns The last node in the linked list.
     */
    removeLast(): Node<T> | null;
    /**
     * Return the first node in the linked list.
     * @returns The first node in the linked list.
     */
    getFirst(): Node<T> | null;
    /**
     * If the list is empty, return null. If the list has one node, return the head. Otherwise, return the
     * second last node's next property
     * @returns The last node in the linked list.
     */
    getLast(): Node<T> | null;
    /**
     * Return the length of the list.
     * @returns The length of the list.
     */
    size(): number;
}
export {};
