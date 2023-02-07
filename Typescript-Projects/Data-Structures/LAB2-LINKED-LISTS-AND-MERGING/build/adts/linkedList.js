"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = void 0;
/* A Node is a class that has an item and a next property */
class Node {
    constructor(item, next) {
        this.item = item !== null && item !== void 0 ? item : null;
        this.next = next !== null && next !== void 0 ? next : null;
    }
}
/* "We're creating a linked list class that has a head property, a length property, and methods to add
and remove nodes from the list."*/
class LinkedList {
    constructor(headOrItem) {
        var _a;
        this.head = null;
        this.length = 0;
        if (!headOrItem)
            return;
        if (this.isNode(headOrItem)) {
            this.head = headOrItem;
            let currentNode = this.head;
            while (currentNode) {
                this.length++;
                currentNode = (_a = currentNode.next) !== null && _a !== void 0 ? _a : null;
            }
        }
        else {
            this.head = new Node(headOrItem);
            this.length++;
        }
    }
    /**
     * If the elementToCheck has an item property, then it's a Node<T> and we return true. Otherwise, it's
     * a T and we return false
     * @param {Node<T> | T} elementToCheck - Node<T> | T
     * @returns a boolean value.
     */
    isNode(elementToCheck) {
        return elementToCheck.item !== undefined;
    }
    /**
     * "Get the second last node in the linked list."
     *
     * The function takes in a head node and returns the second last node
     * @param head - The head of the linked list.
     * @returns The second to last node in the linked list.
     */
    getSecondLastNode(head) {
        var _a;
        let currentNode = head;
        while ((_a = currentNode.next) === null || _a === void 0 ? void 0 : _a.next) {
            currentNode = currentNode.next;
        }
        return currentNode;
    }
    /**
     * We create a new node, set the next property of the new node to the current head, increment the
     * length, set the head to the new node, and return the new node
     * @param {T} item - the item to be added to the list
     * @returns The head of the linked list.
     */
    addFirst(item) {
        const newNode = new Node(item);
        newNode.next = this.head;
        this.length++;
        this.head = newNode;
        return this.length;
    }
    /**
     * "Remove the first node from the list and return it."
     *
     * The first thing we do is decrement the length of the list
     * @returns The old head is being returned.
     */
    removeFirst() {
        var _a, _b;
        this.length--;
        const oldHead = this.head;
        this.head = (_b = (_a = this.head) === null || _a === void 0 ? void 0 : _a.next) !== null && _b !== void 0 ? _b : null;
        return oldHead;
    }
    /**
     * If the list is empty, set the head to the new node. If the list has one item, set the head's next to
     * the new node. If the list has two or more items, set the second last node's next to the new node
     * @param {T} item - T - the item to add to the end of the list
     * @returns The length of the linked list.
     */
    addLast(item) {
        const newNode = new Node(item);
        if (!this.head)
            this.head = newNode;
        else if (this.length < 2)
            this.head.next = newNode;
        else {
            const lastNode = this.getSecondLastNode(this.head).next;
            lastNode.next = newNode;
        }
        this.length++;
        return this.length;
    }
    /**
     * We're removing the last node by setting the second last node's next property to null
     * @returns The last node in the linked list.
     */
    removeLast() {
        if (!this.head)
            return null;
        let oldLast;
        if (this.length < 2) {
            oldLast = this.head.next;
            this.head.next = null;
        }
        else {
            const newLast = this.getSecondLastNode(this.head);
            oldLast = newLast === null || newLast === void 0 ? void 0 : newLast.next;
            newLast.next = null;
        }
        this.length--;
        return oldLast;
    }
    /**
     * Return the first node in the linked list.
     * @returns The first node in the linked list.
     */
    getFirst() {
        return this.head;
    }
    /**
     * If the list is empty, return null. If the list has one node, return the head. Otherwise, return the
     * second last node's next property
     * @returns The last node in the linked list.
     */
    getLast() {
        var _a;
        if (!this.head)
            return null;
        if (this.length < 2)
            return this.head;
        return (_a = this.getSecondLastNode(this.head).next) !== null && _a !== void 0 ? _a : this.head;
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