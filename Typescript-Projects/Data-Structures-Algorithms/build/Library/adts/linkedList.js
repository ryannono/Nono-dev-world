"use strict";
// ----------------- List Node ----------------- //
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = void 0;
/** A Node is a class that has an item and a next property */
class llNode {
    constructor(item, prev, next) {
        this.item = item !== null && item !== void 0 ? item : null;
        this.prev = prev !== null && prev !== void 0 ? prev : null;
        this.next = next !== null && next !== void 0 ? next : null;
    }
    /**
     * If the object is an instance of the llNode class, then return true, otherwise return false.
     * @param {unknown} obj - unknown - this is the object we're checking to see if it's an instance of
     * llNode.
     * @returns a boolean value.
     */
    static isLlNode(obj) {
        return obj instanceof llNode;
    }
}
// ---------------- Linked list ---------------- //
/**
 * "We're creating a linked list class that has a front, back, and length property, and methods to add
 * and remove nodes from the list."
 */
class LinkedList {
    /**
     * If the constructor is called with a Node, set the head to that node and count the length of the
     * list. If the constructor is called with a value, create a new Node with that value and set the head
     * to that node
     * @param {llNode<T> | T} [headOrItem] - Node<T> | T
     * @returns A new instance of the LinkedList class.
     */
    constructor(headOrItem) {
        this.front = null;
        this.back = null;
        this.length = 0;
        if (!headOrItem)
            return;
        if (llNode.isLlNode(headOrItem)) {
            let currentNode = (this.front = this.back = headOrItem);
            while (currentNode) {
                this.length++;
                currentNode = currentNode.next;
            }
        }
        else {
            this.front = this.back = new llNode(headOrItem);
            this.length++;
        }
    }
    /**
     * We're going to create a new array, and then we're going to loop through the linked list, and for
     * each node in the linked list, we're going to push the item in that node into the array.
     * @param linkedList - LinkedList<T>
     * @returns An array of the items in the linked list.
     */
    static linkedListToArray(linkedList) {
        let currentNode = linkedList.front;
        const array = [];
        while (currentNode) {
            array.push(currentNode.item);
            currentNode = currentNode.next;
        }
        return array;
    }
    /**
     * "If the object is an instance of the LinkedList class, then it is a LinkedList."
     *
     * The above function is a type guard. It's a function that takes an object and returns a boolean. If
     * the boolean is true, then the object is of the type specified in the function
     * @param {unknown} obj - unknown
     * @returns a boolean value.
     */
    static isLinkedList(obj) {
        return obj instanceof LinkedList;
    }
    /**
     * We create a new node with the item and the current front node as its next node.
     *
     * Then we set the new node's next node's (old front), previous node to the new node.
     *
     * Finally, we set the front node to the new node and return the new length of the list.
     * @param {T} item - T - the item to be added to the list
     * @returns The length of the linked list
     */
    addFirst(item) {
        if (!this.length)
            this.front = this.back = new llNode(item);
        else {
            this.front = new llNode(item, null, this.front);
            this.front.next.prev = this.front;
        }
        return ++this.length;
    }
    /**
     * If the list is empty, return null, otherwise, if the list has only one node, set the front and back
     * to null, otherwise, set the front to the next node and set the previous node of the new front to
     * null
     * @returns The old head of the list.
     */
    removeFirst() {
        const oldHead = this.front;
        if (this.length <= 1)
            this.front = this.back = null;
        else
            (this.front = this.front.next).prev = null;
        this.length = !this.length ? 0 : this.length - 1;
        return oldHead;
    }
    /**
     * If the list is empty, set the front and back to the new node, otherwise set the back's next to the
     * new node and set the back to the new node
     * @param {T} item - the item to be added to the list
     * @returns The length of the linked list
     */
    addLast(item) {
        const newNode = new llNode(item, this.back);
        if (!this.length)
            this.front = this.back = newNode;
        else
            this.back = this.back.next = newNode;
        return ++this.length;
    }
    /**
     * If the list is empty, set the front and back to null, otherwise, set the back to the previous node
     * and set the next pointer of the new back to null
     * @returns The last node in the list.
     */
    removeLast() {
        const oldLast = this.back;
        if (this.length <= 1)
            this.front = this.back = null;
        else
            (this.back = this.back.prev).next = null;
        this.length = !this.length ? 0 : this.length - 1;
        return oldLast;
    }
    /**
     * Return the first element in the linkedlist.
     * @returns The first node in the linkedlist
     */
    getFirst() {
        return this.front;
    }
    /**
     * Return the last node in the list.
     * @returns The last node in the list.
     */
    getLast() {
        return this.back;
    }
    /**
     * Return the length of the list.
     * @returns The length of the list.
     */
    size() {
        return this.length;
    }
}
exports.LinkedList = LinkedList;
//# sourceMappingURL=linkedList.js.map