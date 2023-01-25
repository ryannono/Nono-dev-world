class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

/* It stores the nodes of a linked list in an array, and then shifts the nodes to the front of the list
by popping the last node and unshifting it to the front of the array */
class NodeStore {
  private data: ListNode[] = [];
  private length = 0;

  constructor(headNode: ListNode | null) {
    while (headNode) {
      this.data.push(headNode);
      this.length++;
      headNode = headNode.next;
    }
  }

  /**
   * We're going to take the last node in the list, and make it the first node in the list, and then
   * we're going to take the second to last node in the list, and make it the second node in the list,
   * and so on, until we've moved the number of nodes that we want to move to the front of the list
   * @param {number} numberOfNodes - number - the number of nodes to shift to the front of the list
   * @returns The first node in the list.
   */
  shiftNodesToFront(numberOfNodes: number): ListNode | null {
    if (this.length === 1) return this.data[0];
    if (numberOfNodes > this.length) numberOfNodes %= this.length;

    while (numberOfNodes) {
      this.data[this.length - 1].next = this.data[0];
      this.data.unshift(this.data.pop()!);
      numberOfNodes--;
    }
    this.data[this.length - 1].next = null;

    return this.data[0] ?? null;
  }
}

/**
 * We create a NodeStore object, which is a wrapper around the linked list, and then we shift the nodes
 * to the front of the list by the number of rotations
 * @param {ListNode | null} head - the head of the linked list
 * @param {number} k - the number of times to rotate the list
 * @returns A new linked list with the nodes shifted to the front.
 */
function rotateRight(head: ListNode | null, k: number): ListNode | null {
  if (!head) return head;
  return new NodeStore(head).shiftNodesToFront(k);
}
