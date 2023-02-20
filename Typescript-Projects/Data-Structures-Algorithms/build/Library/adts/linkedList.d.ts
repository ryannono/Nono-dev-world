/** A Node is a class that has an item and a next property */
declare class llNode<T> {
    item: T | null;
    next: llNode<T> | null;
    constructor(item?: T, next?: llNode<T>);
}
/**
 * "We're creating a linked list class that has a head property, a length property, and methods to add
 * and remove nodes from the list."
 */
export declare class LinkedList<T> {
    private head;
    private length;
    /**
     * If the constructor is called with a Node, set the head to that node and count the length of the
     * list. If the constructor is called with a value, create a new Node with that value and set the head
     * to that node
     * @param {llNode<T> | T} [headOrItem] - Node<T> | T
     * @returns A new instance of the LinkedList class.
     */
    constructor(headOrItem?: llNode<T> | T);
    /**
     * We're going to create a new array, and then we're going to loop through the linked list, and for
     * each node in the linked list, we're going to push the item in that node into the array.
     * @param linkedList - LinkedList<T>
     * @returns An array of the items in the linked list.
     */
    static linkedListToArray<T>(linkedList: LinkedList<T>): (T | null)[];
    /**
     * If the elementToCheck has an item property, then it's a Node<T> and we return true. Otherwise, it's
     * a T and we return false
     * @param {llNode<T> | T} elementToCheck - Node<T> | T
     * @returns a boolean value.
     */
    private isllNode;
    /**
     * "Get the second last node in the linked list."
     *
     * The function takes in a head node and returns the second last node
     * @param head - The head of the linked list.
     * @returns The second to last node in the linked list.
     */
    private getSecondLastNode;
    /**
     * We create a new node, set the next property of the new node to the current head, and then set the
     * head to the new node
     * @param {T} item - the item to be added to the list
     * @returns The length of the linked list
     */
    addFirst(item: T): number;
    /**
     * "Remove the first node from the list and return it."
     *
     * The first thing we do is decrement the length of the list
     * @returns The old head is being returned.
     */
    removeFirst(): llNode<T> | null;
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
    removeLast(): llNode<T> | null;
    /**
     * Return the first node in the linked list.
     * @returns The first node in the linked list.
     */
    getFirst(): llNode<T> | null;
    /**
     * If the list is empty, return null. If the list has one node, return the head. Otherwise, return the
     * second last node's next property
     * @returns The last node in the linked list.
     */
    getLast(): llNode<T> | null;
    /**
     * Return the length of the list.
     * @returns The length of the list.
     */
    size(): number;
}
export {};
