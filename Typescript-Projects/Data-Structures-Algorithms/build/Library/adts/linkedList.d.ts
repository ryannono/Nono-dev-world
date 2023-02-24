/** A Node is a class that has an item and a next property */
declare class llNode<T> {
    item: T | null;
    prev: llNode<T> | null;
    next: llNode<T> | null;
    constructor(item?: T, prev?: llNode<T> | null, next?: llNode<T> | null);
    /**
     * If the object is an instance of the llNode class, then return true, otherwise return false.
     * @param {unknown} obj - unknown - this is the object we're checking to see if it's an instance of
     * llNode.
     * @returns a boolean value.
     */
    static isLlNode<T>(obj: unknown): obj is llNode<T>;
}
/**
 * "We're creating a linked list class that has a front, back, and length property, and methods to add
 * and remove nodes from the list."
 */
export declare class LinkedList<T> {
    private front;
    private back;
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
     * "If the object is an instance of the LinkedList class, then it is a LinkedList."
     *
     * The above function is a type guard. It's a function that takes an object and returns a boolean. If
     * the boolean is true, then the object is of the type specified in the function
     * @param {unknown} obj - unknown
     * @returns a boolean value.
     */
    static isLinkedList<T>(obj: unknown): obj is LinkedList<T>;
    /**
     * We create a new node with the item and the current front node as its next node.
     *
     * Then we set the new node's next node's (old front), previous node to the new node.
     *
     * Finally, we set the front node to the new node and return the new length of the list.
     * @param {T} item - T - the item to be added to the list
     * @returns The length of the linked list
     */
    addFirst(item: T): number;
    /**
     * If the list is empty, return null, otherwise, if the list has only one node, set the front and back
     * to null, otherwise, set the front to the next node and set the previous node of the new front to
     * null
     * @returns The old head of the list.
     */
    removeFirst(): llNode<T> | null;
    /**
     * If the list is empty, set the front and back to the new node, otherwise set the back's next to the
     * new node and set the back to the new node
     * @param {T} item - the item to be added to the list
     * @returns The length of the linked list
     */
    addLast(item: T): number;
    /**
     * If the list is empty, set the front and back to null, otherwise, set the back to the previous node
     * and set the next pointer of the new back to null
     * @returns The last node in the list.
     */
    removeLast(): llNode<T> | null;
    /**
     * Return the first element in the linkedlist.
     * @returns The first node in the linkedlist
     */
    getFirst(): llNode<T> | null;
    /**
     * Return the last node in the list.
     * @returns The last node in the list.
     */
    getLast(): llNode<T> | null;
    /**
     * Return the length of the list.
     * @returns The length of the list.
     */
    size(): number;
}
export {};
