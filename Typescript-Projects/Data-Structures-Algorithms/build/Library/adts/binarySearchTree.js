"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinarySearchTree = exports.TreeNode = void 0;
const comparator_1 = require("../functions/comparator");
// -------------- Tree Node -------------- //
/**
 * A TreeNode is a node in a binary tree that has a value, a parent, and two children
 */
class TreeNode {
    constructor(item, parent, left, right) {
        // node info
        this.item = item !== null && item !== void 0 ? item : null;
        // parent infor
        this.parent = parent !== null && parent !== void 0 ? parent : null;
        // descendants info
        this.left = left !== null && left !== void 0 ? left : null;
        this.right = right !== null && right !== void 0 ? right : null;
    }
}
exports.TreeNode = TreeNode;
// ---------------- BST ----------------- //
class BinarySearchTree {
    constructor(comparator = (comparator_1.defaultComparator)) {
        this.root = new TreeNode();
        this.size = 0;
        this.comparator = comparator;
    }
    // ---------- helper methods ---------- //
    /**
     * It returns the parent of the node and the position of the node on the parent
     * @param node - The node we want to find the position of.
     * @returns An object with two properties: parent and positionOnParent.
     */
    getPositionOnParent(node) {
        const parent = node.parent;
        let positionOnParent;
        if (!parent) {
            positionOnParent = null;
        }
        else if (this.comparator(parent.left.item, node.item) === 0) {
            positionOnParent = 'left';
        }
        else {
            positionOnParent = 'right';
        }
        return { parent, positionOnParent };
    }
    /**
     * It sets the item, left, and right properties of the node to null
     * @param node - The node to be removed.
     */
    dummify(node) {
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
    getChildren(node) {
        const leftChild = node.left;
        const rightChild = node.right;
        let occupation;
        if ((leftChild === null || leftChild === void 0 ? void 0 : leftChild.item) === null && (rightChild === null || rightChild === void 0 ? void 0 : rightChild.item) === null)
            occupation = 'both null';
        else if ((leftChild === null || leftChild === void 0 ? void 0 : leftChild.item) === null)
            occupation = 'left null';
        else if ((rightChild === null || rightChild === void 0 ? void 0 : rightChild.item) === null)
            occupation = 'right null';
        else
            occupation = 'both';
        return { leftChild, rightChild, occupation };
    }
    /**
     * If the node has a left child, return the left child, otherwise return the node.
     * @param node - TreeNode<T>
     * @returns The left most node in the tree.
     */
    traverseLeft(node) {
        if (!node.left || node.left.item === null)
            return node;
        return this.traverseLeft(node.left);
    }
    /**
     * We're going to replace the node we want to delete with the next node in order, and then delete the
     * next node in order
     * @requires the passed node must have both left and right children
     * @param node - The node to delete.
     */
    deleteInternal(node) {
        const swapNode = this.traverseLeft(node.right);
        node.item = swapNode.item;
        if (this.getPositionOnParent(swapNode).positionOnParent === 'left') {
            swapNode.parent.left = swapNode.right;
        }
        else {
            swapNode.parent.right = swapNode.right;
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
    search(item, startNode = this.root) {
        if (!startNode || startNode.item === null)
            return startNode;
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
    insert(item, startNode = this.root) {
        const insertionNode = startNode.item === null ? startNode : this.search(item, startNode);
        if (insertionNode.item !== null &&
            this.comparator(insertionNode.item, item) === 0) {
            return this.insert(item, insertionNode.left);
        }
        insertionNode.item = item;
        (insertionNode.left = new TreeNode()).parent = insertionNode;
        (insertionNode.right = new TreeNode()).parent = insertionNode;
        return ++this.size;
    }
    /**
     * If the node to be deleted has no children, we dummify it. If it has one child, we replace it with
     * its child. If it has two children, we replace it with its in-order successor
     * @param {T} item - the item to be deleted
     * @returns The item that was deleted.
     */
    delete(item) {
        if (this.root.item === null)
            return null;
        // get node we want to delete
        const deletionNode = this.search(item, this.root);
        if (!deletionNode || deletionNode.item === null)
            return null;
        // get info on the node to be deleted's position on the parent
        const { positionOnParent, parent } = this.getPositionOnParent(deletionNode);
        // get node to be deleted's children info
        const { leftChild, rightChild, occupation } = this.getChildren(deletionNode);
        switch (occupation) {
            case 'both null':
                this.dummify(deletionNode);
                break;
            case 'left null':
                if (positionOnParent === 'left')
                    parent.left = rightChild;
                else if (positionOnParent === 'right')
                    parent.right = rightChild;
                else
                    this.root = rightChild;
                break;
            case 'right null':
                if (positionOnParent === 'left')
                    parent.left = leftChild;
                else if (positionOnParent === 'right')
                    parent.right = leftChild;
                else
                    this.root = leftChild;
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
    inorderTraversal(node = this.root) {
        if (!node)
            return [null];
        const { occupation } = this.getChildren(node);
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
exports.BinarySearchTree = BinarySearchTree;
//# sourceMappingURL=binarySearchTree.js.map