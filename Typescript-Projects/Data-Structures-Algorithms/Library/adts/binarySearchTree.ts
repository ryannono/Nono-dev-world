import {Comparator, defaultComparator} from '../functions/comparator';

// ---------------- Types ---------------- //

type nodePosition = 'left' | 'right' | null;

// -------------- Tree Node -------------- //

/**
 * A TreeNode is a node in a binary tree that has a value, a parent, and two children
 */
export class TreeNode<T> {
  // node info
  item: T | null;

  // parent info
  parent: TreeNode<T> | null;

  // descendants info
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;

  constructor(
    item?: T,
    parent?: TreeNode<T>,
    left?: TreeNode<T>,
    right?: TreeNode<T>
  ) {
    // node info
    this.item = item ?? null;

    // parent infor
    this.parent = parent ?? null;

    // descendants info
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

// ---------------- BST ----------------- //

export class BinarySearchTree<T> {
  private root: TreeNode<T> = new TreeNode<T>();
  private comparator: Comparator<T>;
  private size = 0;

  constructor(comparator = defaultComparator) {
    this.comparator = comparator;
  }

  // ---------- helper methods ---------- //

  /**
   * It returns the parent of the node and the position of the node on the parent
   * @param node - The node we want to find the position of.
   * @returns An object with two properties: parent and positionOnParent.
   */
  private getPositionOnParent(node: TreeNode<T>) {
    const parent = node.parent;
    let positionOnParent: nodePosition;

    if (!parent) {
      positionOnParent = null;
    } else if (this.comparator(parent.left!.item!, node.item!) === 0) {
      positionOnParent = 'left';
    } else {
      positionOnParent = 'right';
    }

    return {parent, positionOnParent};
  }

  /**
   * It sets the item, left, and right properties of the node to null
   * @param node - The node to be removed.
   */
  private dummify(node: TreeNode<T>) {
    node.item = null;
    node.left = null;
    node.right = null;
  }

  /**
   * It returns the left and right children of a node, and also a string that describes whether the
   * children are null or not
   * @param node - The node we're currently looking at.
   * @returns The left and right children of the node, and the occupation of the children.
   */
  private getChildren(node: TreeNode<T>) {
    const leftChild = node.left;
    const rightChild = node.right;
    let occupation;

    if (leftChild?.item === null && rightChild?.item === null)
      occupation = 'both null';
    else if (leftChild?.item === null) occupation = 'left null';
    else if (rightChild?.item === null) occupation = 'right null';
    else occupation = 'both';

    return {leftChild, rightChild, occupation};
  }

  /**
   * If the node has a left child, return the left child, otherwise return the node.
   * @param node - TreeNode<T>
   * @returns The left most node in the tree.
   */
  private traverseLeft(node: TreeNode<T>): TreeNode<T> {
    if (!node.left || node.left.item === null) return node;
    return this.traverseLeft(node.left);
  }

  /**
   * We're going to replace the node we want to delete with the next node in order, and then delete the
   * next node in order
   * @requires the passed node must have both left and right children
   * @param node - The node to delete.
   */
  private deleteInternal(node: TreeNode<T>) {
    const swapNode = this.traverseLeft(node.right!);

    node.item = swapNode.item;

    if (this.getPositionOnParent(swapNode).positionOnParent === 'left') {
      swapNode.parent!.left = swapNode.right;
    } else {
      swapNode.parent!.right = swapNode.right;
    }
  }

  // ---------- public methods ---------- //

  getSize() {
    return this.size;
  }

  /**
   * If the item is less than the current node, search the left subtree, if the item is greater than the
   * current node, search the right subtree, otherwise return the current node
   * @param {T} item - The item to search for.
   * @param {TreeNode<T> | null} startNode - The node to start searching from.
   * @returns The node that contains the item being searched for.
   */
  search(
    item: T,
    startNode: TreeNode<T> | null = this.root
  ): TreeNode<T> | null {
    if (!startNode || startNode.item === null) return startNode;
    if (this.comparator(item, startNode.item) < 0) {
      return this.search(item, startNode.left);
    }
    if (this.comparator(item, startNode.item) > 0) {
      return this.search(item, startNode.right);
    }
    return startNode;
  }

  /**
   * If the item is already in the tree, insert it in the left subtree, otherwise insert it in the
   * current node
   * @param {T} item - The item to insert into the tree.
   * @param startNode - The node to start searching from.
   * @returns The number of items in the tree.
   */
  insert(item: T, startNode = this.root): number {
    const insertionNode =
      startNode.item === null ? startNode : this.search(item, startNode)!;

    if (
      insertionNode.item !== null &&
      this.comparator(insertionNode.item, item) === 0
    ) {
      return this.insert(item, insertionNode.left!);
    }

    insertionNode.item = item;
    (insertionNode.left = new TreeNode<T>()).parent = insertionNode;
    (insertionNode.right = new TreeNode<T>()).parent = insertionNode;

    return ++this.size;
  }

  /**
   * If the node to be deleted has no children, we dummify it. If it has one child, we replace it with
   * its child. If it has two children, we replace it with its in-order successor
   * @param {T} item - the item to be deleted
   * @returns The item that was deleted.
   */
  delete(item: T) {
    if (this.root.item === null) return null;

    // get node we want to delete
    const deletionNode = this.search(item, this.root);
    if (!deletionNode || deletionNode.item === null) return null;

    // get info on the node to be deleted's position on the parent
    const {positionOnParent, parent} = this.getPositionOnParent(deletionNode);

    // get node to be deleted's children info
    const {leftChild, rightChild, occupation} = this.getChildren(deletionNode);

    switch (occupation) {
      case 'both null':
        this.dummify(deletionNode);
        break;

      case 'left null':
        if (positionOnParent === 'left') parent!.left = rightChild;
        else if (positionOnParent === 'right') parent!.right = rightChild;
        else this.root = rightChild!;
        break;

      case 'right null':
        if (positionOnParent === 'left') parent!.left = leftChild;
        else if (positionOnParent === 'right') parent!.right = leftChild;
        else this.root = leftChild!;
        break;

      default:
        this.deleteInternal(deletionNode);
        break;
    }

    return --this.size, deletionNode.item;
  }

  /**
   * If the node has no children, return the node's item. If the node has a left child and a right child,
   * return the left subtree, the node's item, and the right subtree. If the node has only has a right child,
   * return the node's item, and the right subtree. If the node only has a left child return the left subtree
   * and the node's item,
   * @param {TreeNode<T> | null} node - TreeNode<T> | null = this.root
   * @returns An array of the items in the tree in order.
   */
  inorderTraversal(node: TreeNode<T> | null = this.root): (T | null)[] {
    if (!node) return [null];

    const {occupation} = this.getChildren(node);

    switch (occupation) {
      case 'both null':
        return [node.item];

      case 'left null':
        return [node.item, ...this.inorderTraversal(node.right)];

      case 'right null':
        return [...this.inorderTraversal(node.left), node.item];

      default:
        return [
          ...this.inorderTraversal(node.left),
          node.item,
          ...this.inorderTraversal(node.right),
        ];
    }
  }
}
