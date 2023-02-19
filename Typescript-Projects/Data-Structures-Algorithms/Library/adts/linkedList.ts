// ----------------- List Node ----------------- //

/** A Node is a class that has an item and a next property */
class llNode<T> {
  item: T | null;
  next: llNode<T> | null;

  constructor(item?: T, next?: llNode<T>) {
    this.item = item ?? null;
    this.next = next ?? null;
  }
}

// ---------------- Linked list ---------------- //

/**
 * "We're creating a linked list class that has a head property, a length property, and methods to add
 * and remove nodes from the list."
 */
export class LinkedList<T> {
  private head: llNode<T> | null = null;
  private length = 0;

  /**
   * If the constructor is called with a Node, set the head to that node and count the length of the
   * list. If the constructor is called with a value, create a new Node with that value and set the head
   * to that node
   * @param {llNode<T> | T} [headOrItem] - Node<T> | T
   * @returns A new instance of the LinkedList class.
   */
  constructor(headOrItem?: llNode<T> | T) {
    if (!headOrItem) return;
    if (this.isllNode(headOrItem)) {
      this.head = headOrItem;
      let currentNode: llNode<T> | null = this.head;
      while (currentNode) {
        this.length++;
        currentNode = currentNode.next ?? null;
      }
    } else {
      this.head = new llNode(headOrItem);
      this.length++;
    }
  }

  /**
   * If the elementToCheck has an item property, then it's a Node<T> and we return true. Otherwise, it's
   * a T and we return false
   * @param {llNode<T> | T} elementToCheck - Node<T> | T
   * @returns a boolean value.
   */
  private isllNode(elementToCheck: llNode<T> | T): elementToCheck is llNode<T> {
    return (elementToCheck as llNode<T>).item !== undefined;
  }

  /**
   * "Get the second last node in the linked list."
   *
   * The function takes in a head node and returns the second last node
   * @param head - The head of the linked list.
   * @returns The second to last node in the linked list.
   */
  private getSecondLastNode(head: llNode<T>) {
    let currentNode = head;
    while (currentNode.next?.next) {
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
  addFirst(item: T) {
    const newNode = new llNode(item);
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
    this.length--;
    const oldHead = this.head;
    this.head = this.head?.next ?? null;
    return oldHead;
  }

  /**
   * If the list is empty, set the head to the new node. If the list has one item, set the head's next to
   * the new node. If the list has two or more items, set the second last node's next to the new node
   * @param {T} item - T - the item to add to the end of the list
   * @returns The length of the linked list.
   */
  addLast(item: T) {
    const newNode = new llNode(item);
    if (!this.head) this.head = newNode;
    else if (this.length < 2) this.head.next = newNode;
    else {
      const lastNode = this.getSecondLastNode(this.head).next!;
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
    if (!this.head) return null;

    let oldLast;
    if (this.length < 2) {
      oldLast = this.head.next;
      this.head.next = null;
    } else {
      const newLast = this.getSecondLastNode(this.head);
      oldLast = newLast?.next;
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
    if (!this.head) return null;
    if (this.length < 2) return this.head;
    return this.getSecondLastNode(this.head).next ?? this.head;
  }

  /**
   * Return the length of the list.
   * @returns The length of the list.
   */
  size() {
    return this.length;
  }
}
