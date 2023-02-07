class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

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
   * We're taking the last `numberOfNodes` nodes and moving them to the front of the list
   * @param {number} numberOfNodes - number
   * @returns The first node in the list.
   */
  shiftNodesToFront(numberOfNodes: number): ListNode | null {
    if (numberOfNodes > this.length) numberOfNodes %= this.length;

    this.data[this.length - 1].next = this.data[0];
    this.data.unshift(...this.data.splice(-numberOfNodes));
    this.data[this.length - 1].next = null;

    return this.data[0] ?? null;
  }
}

/**
 * We create a NodeStore object, which is a wrapper around the linked list, and then we shift the nodes
 * to the front of the list by the number of times specified by the k parameter
 * @param {ListNode | null} head - the head of the linked list
 * @param {number} k - the number of times to rotate the list
 * @returns A new linked list with the nodes shifted to the front.
 */
function rotateRight(head: ListNode | null, k: number): ListNode | null {
  if (!head || !head.next || !k) return head;
  return new NodeStore(head).shiftNodesToFront(k);
}
