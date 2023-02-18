// ---------------- Types ---------------- //

type nodePosition = 'left' | 'right' | null;

type descendant = {index: number; occupied: boolean};

// -------------- Tree Node -------------- //

/**
 * A HeapNode is a node in a heap that contains an item, an index, a level, a position on its parent, a
 * parent index, and two descendants
 * */
class HeapNode<T> {
  // node info
  item: T | null;
  itemIndex: number;
  level: number;

  // parent info
  positionOnParent: nodePosition;
  parentIndex: number | null;

  // descendants info
  left: descendant;
  right: descendant;

  constructor(itemIndex: number, positionOnParent: nodePosition, item?: T) {
    // node info
    this.item = item ?? null;
    this.itemIndex = itemIndex;
    this.level = Math.floor((itemIndex + 1) / 2);

    // parent infor
    this.positionOnParent = positionOnParent;
    if (itemIndex === 0) this.parentIndex = null;
    else this.parentIndex = Math.floor((itemIndex - 1) / 2);

    // descendants info
    this.left = {index: itemIndex * 2 + 1, occupied: false};
    this.right = {index: itemIndex * 2 + 2, occupied: false};
  }
}

// ------------- Min Heap ------------- //

/**
 * "The MinHeap class is a binary tree that stores items in a way that allows us to quickly find the
 * smallest item in the tree."
 */
export class MinHeap<T> {
  private data: HeapNode<T>[] = [];
  private size = 0;
  private height = 0;

  /**
   * If the constructor is called with an array, call the buildHeap function, otherwise call the insert
   * function
   * @param {T | T[]} [itemOrArray] - This is the item or array of items that you want to insert into the
   * heap.
   * @returns A new instance of the Heap class.
   */
  constructor(itemOrArray?: T | T[]) {
    if (!itemOrArray) return;
    else if (Array.isArray(itemOrArray)) this.buildHeap(itemOrArray);
    else this.insert(itemOrArray);
  }

  // ------- Generic/Accessor methods ------- //

  /**
   * The getSize function returns the size of the current object.
   * @returns The size of the stack.
   */
  getSize() {
    return this.size;
  }

  /**
   * If the size of the tree is not equal to zero, return false, otherwise return true
   * @returns The size of the stack.
   */
  isEmpty() {
    return !this.size ? true : false;
  }

  /**
   * "Return the first item in the data array, or null if the data array is empty."
   *
   * @returns The root node of the tree.
   */
  root() {
    return this.data[0].item ?? null;
  }

  /**
   * It returns the tree data
   * @returns The array of data.
   */
  elements() {
    return this.data;
  }

  /**
   * It returns an array of the items in the tree
   * @returns An array of the items in the tree.
   */
  items() {
    const elements: T[] = [];
    this.data.forEach(node => {
      if (node.item !== null) elements.push(node.item);
    });
    return elements;
  }

  /**
   * We're going to print out the elements in the heap, starting with the root, then the first level,
   * then the second level, and so on
   */
  printElements() {
    for (let level = 0, startIndex = 0; level <= this.height; level++) {
      const levelItemCount = 2 ** level;
      const maxIndex = levelItemCount + startIndex;

      console.log(' ');

      for (let i = startIndex; i < maxIndex && i < this.size; i++) {
        console.log(this.data[i]?.item);
      }
      startIndex = maxIndex;
    }
  }

  // ---------- Helper methods ---------- //

  /**
   * If the left child of the node exists, return it, otherwise return null.
   * @param node - The node to get the left child of.
   * @returns The left child of the node.
   */
  private left(node: HeapNode<T>) {
    if (node.left.index < this.size) {
      return this.data[node.left.index];
    }
    return null;
  }

  /**
   * Return the right child of the given node, or null if the node has no right child.
   * @param node - The node to get the right child of.
   * @returns The right child of the node.
   */
  private right(node: HeapNode<T>) {
    if (node.right.index < this.size) {
      return this.data[node.right.index];
    }
    return null;
  }

  /**
   * "If the node has a parent, return the parent, otherwise return null."
   *
   * The function takes a node as an argument and returns the parent of that node. If the node has no
   * parent, the function returns null
   * @param node - The node whose parent we want to find.
   * @returns The parent node of the node passed in.
   */
  private parent(node: HeapNode<T>) {
    if (node && node.parentIndex !== null) {
      return this.data[node.parentIndex];
    }
    return null;
  }

  /**
   * It inserts a new node at the given index, and updates the parent node's left or right child to
   * indicate that it's occupied
   * @param {number} index - the index of the new node
   * @param {nodePosition} positionOnParent - nodePosition
   * @param {T} item - The item to insert into the tree.
   * @returns The size of the tree
   */
  private insertAt(index: number, positionOnParent: nodePosition, item: T) {
    const newNode = (this.data[index] = new HeapNode(
      index,
      positionOnParent,
      item
    ));

    if (positionOnParent === 'left') {
      this.parent(newNode)!.left.occupied = true;
    }

    if (positionOnParent === 'right') {
      this.parent(newNode)!.right.occupied = true;
    }

    return ++this.size;
  }

  /**
   * Removes the last element in the tree, If the last level of the tree has only one element,
   * then the height of the tree is decremented
   * @returns The size of the tree.
   */
  private removeLast() {
    this.data.pop();

    if (
      this.levelAndTreeInfo().numOfElementsOnLastLevel === 1 &&
      this.height !== 0
    ) {
      this.height--;
    }

    return --this.size;
  }

  /**
   * It returns an object with the number of elements on the last level, the number of elements needed
   * for the last level to be full, the number of total elements needed for the tree to be full, and a boolean
   * that tells us if the last level is full
   * @returns An object with the following properties:
   *   numOfElementsOnLastLevel: number of elements on the last level of the tree
   *   numForLastLevelToBeFull: number of elements needed for the last level to be full
   *   numForTreeToBeFull: number of elements needed for the tree to be full
   *   lastLevelIsFull: boolean indicating if the last level
   */
  private levelAndTreeInfo() {
    const fullTreeSize = 2 ** this.height * 2 - 1;
    const treeSizeLessLastLevel = 2 ** (this.height - 1) * 2 - 1;
    const numOfElementsOnLastLevel = this.size - treeSizeLessLastLevel;
    return {
      numOfElementsOnLastLevel: numOfElementsOnLastLevel,
      numForLastLevelToBeFull: fullTreeSize - treeSizeLessLastLevel,
      numForTreeToBeFull: fullTreeSize,
      lastLevelIsFull: fullTreeSize === this.size ? true : false,
    };
  }

  /**
   * It swaps the items of two nodes
   * @param node1 - The first node to swap.
   * @param node2 - The node that we want to move.
   */
  private swapItems(node1: HeapNode<T>, node2: HeapNode<T>) {
    const temp = node1.item;
    node1.item = node2.item;
    node2.item = temp;
  }

  /**
   * If both node1 and node2 are not null, return the node with the smaller item. If only one of them is
   * not null, return the non-null node. If both are null, return null
   * @param node1 - The first node to compare
   * @param node2 - The node to compare against.
   * @returns The node with the smallest item.
   */
  private minItemNode(node1: HeapNode<T> | null, node2: HeapNode<T> | null) {
    if (node1 && node2) {
      return node1.item! > node2.item! ? node2 : node1;
    } else if (node1) {
      return node1;
    } else if (node2) {
      return node2;
    } else {
      return null;
    }
  }

  /**
   * "While the current node has a parent, and the current node's item is less than the parent's item,
   * swap the items and set the current node to the parent."
   *
   * @param startNode - The node to start sifting up from.
   */
  private siftUp(startNode: HeapNode<T>) {
    let currNode = startNode;
    let parentNode: HeapNode<T> | null;

    while ((parentNode = this.parent(currNode))) {
      if (currNode.item! > parentNode.item!) break;
      this.swapItems(currNode, parentNode);
      currNode = parentNode;
    }
  }

  /**
   * "While there is a child node, if the child node is less than the current node, swap the child node
   * with the current node and set the current node to the child node."
   *
   * @param startNode - The node to start sifting down from.
   */
  private siftDown(startNode: HeapNode<T>) {
    let currNode = startNode;
    let minChild: HeapNode<T> | null;

    while (
      (minChild = this.minItemNode(this.left(currNode), this.right(currNode)))
    ) {
      if (minChild.item! > currNode.item!) break;
      this.swapItems(currNode, minChild);
      currNode = minChild;
    }
  }

  /**
   * It takes an array of elements and inserts each element into the heap
   * @param {T[]} array - The array to be converted into a heap.
   * @complexity - O(nlog(n))
   */
  private buildHeap(array: T[]) {
    array.forEach(element => this.insert(element));
  }

  // ---------- Modifier methods ---------- //

  /**
   * If the tree is empty, insert the item at the root. Otherwise, if the last level is full, insert the
   * item at the first available spot on the next level. Otherwise, insert the item at the end of the
   * tree and then update the parent node's left and right children to reflect the new node's position
   * @param {T} itemToInsert - The item to insert into the heap.
   * @returns The size of the heap.
   * @complexity O(log(n))
   */
  insert(itemToInsert: T) {
    if (this.isEmpty()) return this.insertAt(0, null, itemToInsert);

    const treeInfo = this.levelAndTreeInfo();
    if (treeInfo.lastLevelIsFull) {
      this.insertAt(treeInfo.numForTreeToBeFull, 'left', itemToInsert);
      this.height++;
    } else {
      const insertionIndex = this.size;
      this.insertAt(insertionIndex, null, itemToInsert);
      const newNode = this.data[insertionIndex];
      const parentNode = this.parent(newNode)!;

      if (parentNode.left.occupied === false) {
        newNode.positionOnParent = 'left';
        parentNode.left.occupied = true;
      } else if (parentNode.right.occupied === false) {
        newNode.positionOnParent = 'right';
        parentNode.right.occupied = true;
      }
    }

    this.siftUp(this.data[this.size - 1]);
    return this.size;
  }

  /**
   * It's swapping the root node with the last node in the tree, and then setting the left or right child
   * of the parent of the last node to false
   * @returns The item that was removed.
   * @complexity O(log(n))
   */
  removeMin() {
    if (this.isEmpty()) return this.size;

    /* It's swapping the root node with the last node in the tree. */
    const lastNode = this.data[this.size - 1];
    const root = this.data[0];
    this.swapItems(lastNode, root);

    /* It's setting the left or right child of the parent of the last node to false. */
    if (lastNode.positionOnParent === 'left') {
      this.parent(lastNode)!.left.occupied = false;
    } else if (lastNode.positionOnParent === 'right') {
      this.parent(lastNode)!.right.occupied = false;
    }

    this.removeLast();
    this.siftDown(root);
    return lastNode.item;
  }
}
