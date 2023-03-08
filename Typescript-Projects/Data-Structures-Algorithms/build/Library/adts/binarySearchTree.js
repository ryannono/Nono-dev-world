"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeNode = void 0;
const comparator_1 = require("../functions/comparator");
// -------------- Tree Node -------------- //
/* A TreeNode is a node in a binary tree that has a value, a parent, and two children */
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
    constructor(comparator = comparator_1.defaultComparator) {
        this.root = new TreeNode();
        this.size = 0;
        this.comparator = comparator;
    }
    // ---------- helper methods ---------- //
    /**
     * It returns the parent and the position of the node on the parent
     * @param node - The node to be removed.
     * @returns An object with two properties: parent and positionOnParent.
     */
    getPositionOnParent(node) {
        const parent = node.parent;
        let positionOnParent;
        let leftItem;
        if (((leftItem = parent.left.item) === null && node.item === null) ||
            this.comparator(leftItem, node.item) === 0) {
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
        const left = node.left;
        const right = node.right;
        let occupation;
        if ((left === null || left === void 0 ? void 0 : left.item) === null && (right === null || right === void 0 ? void 0 : right.item) === null)
            occupation = 'both null';
        else if ((left === null || left === void 0 ? void 0 : left.item) === null)
            occupation = 'left null';
        else if ((right === null || right === void 0 ? void 0 : right.item) === null)
            occupation = 'right null';
        else
            occupation = 'both';
        return { left, right, occupation };
    }
    /**
     * Get the next node in order by going right once and then left as far as possible.
     * @param node - The node to start from.
     * @returns The next node in order.
     */
    getNextInOrder(node) {
        let currNode = node.right;
        while ((currNode === null || currNode === void 0 ? void 0 : currNode.left) && currNode.left.item !== null) {
            currNode = currNode.left;
        }
        return currNode;
    }
    /**
     * We're going to replace the node we want to delete with the next node in order, and then delete the
     * next node in order
     * @param node - The node to delete.
     */
    deleteInternal(node) {
        const swapNode = this.getNextInOrder(node);
        const swapNodePositionOnParent = this.getPositionOnParent(swapNode).positionOnParent;
        node.item = swapNode.item;
        if (swapNodePositionOnParent === 'left') {
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
        const { parent, positionOnParent } = this.getPositionOnParent(deletionNode);
        // get node to be deleted's children info
        const { left, right, occupation } = this.getChildren(deletionNode);
        switch (occupation) {
            case 'both null':
                this.dummify(deletionNode);
                break;
            case 'left null':
                if (positionOnParent === 'left')
                    parent.left = right;
                else
                    parent.right = right;
                break;
            case 'right null':
                if (positionOnParent === 'left')
                    parent.left = left;
                else
                    parent.right = left;
                break;
            default:
                this.deleteInternal(deletionNode);
                break;
        }
        return --this.size, deletionNode.item;
    }
    /**
     * If the node has no children, return the node's item. If the node has a left child, return the node's
     * item and the left child's inorder traversal. If the node has a right child, return the node's item
     * and the right child's inorder traversal. If the node has both children, return the node's item, the
     * left child's inorder traversal, and the right child's inorder traversal
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
                return [node.item, ...this.inorderTraversal(node.left)];
            default:
                return [
                    node.item,
                    ...this.inorderTraversal(node.left),
                    ...this.inorderTraversal(node.right),
                ];
        }
    }
}
const bst = new BinarySearchTree();
bst.insert(1);
bst.insert(2);
bst.insert(3);
bst.insert(4);
bst.insert(5);
bst.insert(6);
bst.insert(7);
bst.insert(8);
bst.insert(9);
bst.insert(10);
bst.insert(11);
bst.insert(12);
bst.insert(13);
bst.insert(14);
bst.insert(15);
console.log(bst.getSize(), bst.inorderTraversal(), bst.search(15)); // 1
//# sourceMappingURL=binarySearchTree.js.map