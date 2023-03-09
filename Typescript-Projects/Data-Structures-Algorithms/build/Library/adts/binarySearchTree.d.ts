/**
 * A TreeNode is a node in a binary tree that has a value, a parent, and two children
 */
export declare class TreeNode<T> {
    item: T | null;
    parent: TreeNode<T> | null;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
    constructor(item?: T, parent?: TreeNode<T>, left?: TreeNode<T>, right?: TreeNode<T>);
}
export declare class BinarySearchTree<T> {
    private root;
    private comparator;
    private size;
    constructor(comparator?: (element1: T, element2: T) => 0 | 1 | -1);
    /**
     * It returns the parent of the node and the position of the node on the parent
     * @param node - The node we want to find the position of.
     * @returns An object with two properties: parent and positionOnParent.
     */
    private getPositionOnParent;
    /**
     * It sets the item, left, and right properties of the node to null
     * @param node - The node to be removed.
     */
    private dummify;
    /**
     * It returns the left and right children of a node, and also a string that describes whether the
     * children are null or not
     * @param node - The node we're currently looking at.
     * @returns The left and right children of the node, and the occupation of the children.
     */
    private getChildren;
    /**
     * If the node has a left child, return the left child, otherwise return the node.
     * @param node - TreeNode<T>
     * @returns The left most node in the tree.
     */
    private traverseLeft;
    /**
     * We're going to replace the node we want to delete with the next node in order, and then delete the
     * next node in order
     * @requires the passed node must have both left and right children
     * @param node - The node to delete.
     */
    private deleteInternal;
    getSize(): number;
    /**
     * If the item is less than the current node, search the left subtree, if the item is greater than the
     * current node, search the right subtree, otherwise return the current node
     * @param {T} item - The item to search for.
     * @param {TreeNode<T> | null} startNode - The node to start searching from.
     * @returns The node that contains the item being searched for.
     */
    search(item: T, startNode?: TreeNode<T> | null): TreeNode<T> | null;
    /**
     * If the item is already in the tree, insert it in the left subtree, otherwise insert it in the
     * current node
     * @param {T} item - The item to insert into the tree.
     * @param startNode - The node to start searching from.
     * @returns The number of items in the tree.
     */
    insert(item: T, startNode?: TreeNode<T>): number;
    /**
     * If the node to be deleted has no children, we dummify it. If it has one child, we replace it with
     * its child. If it has two children, we replace it with its in-order successor
     * @param {T} item - the item to be deleted
     * @returns The item that was deleted.
     */
    delete(item: T): T | null;
    /**
     * If the node has no children, return the node's item. If the node has a left child and a right child,
     * return the left subtree, the node's item, and the right subtree. If the node has only has a right child,
     * return the node's item, and the right subtree. If the node only has a left child return the left subtree
     * and the node's item,
     * @param {TreeNode<T> | null} node - TreeNode<T> | null = this.root
     * @returns An array of the items in the tree in order.
     */
    inorderTraversal(node?: TreeNode<T> | null): (T | null)[];
}
