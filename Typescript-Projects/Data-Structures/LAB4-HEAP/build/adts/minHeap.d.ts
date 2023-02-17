declare type nodePosition = 'left' | 'right' | null;
declare type descendant = {
    index: number;
    occupied: boolean;
};
/**
 * A HeapNode is a node in a heap that contains an item, an index, a level, a position on its parent, a
 * parent index, and two descendants
 * */
declare class HeapNode<T> {
    item: T | null;
    itemIndex: number;
    level: number;
    positionOnParent: nodePosition;
    parentIndex: number | null;
    left: descendant;
    right: descendant;
    constructor(itemIndex: number, positionOnParent: nodePosition, item?: T);
}
/**
 * "The MinHeap class is a binary tree that stores items in a way that allows us to quickly find the
 * smallest item in the tree."
 */
export declare class MinHeap<T> {
    private data;
    private size;
    private height;
    constructor(item?: T);
    /**
     * The getSize function returns the size of the current object.
     * @returns The size of the stack.
     */
    getSize(): number;
    /**
     * If the size of the tree is not equal to zero, return false, otherwise return true
     * @returns The size of the stack.
     */
    isEmpty(): boolean;
    /**
     * "Return the first item in the data array, or null if the data array is empty."
     *
     * @returns The root node of the tree.
     */
    root(): NonNullable<T> | null;
    /**
     * It returns the tree data
     * @returns The array of data.
     */
    elements(): HeapNode<T>[];
    /**
     * It returns an array of the items in the tree
     * @returns An array of the items in the tree.
     */
    items(): T[];
    /**
     * We're going to print out the elements in the heap, starting with the root, then the first level,
     * then the second level, and so on
     */
    printElements(): void;
    /**
     * If the left child of the node exists, return it, otherwise return null.
     * @param node - The node to get the left child of.
     * @returns The left child of the node.
     */
    private left;
    /**
     * Return the right child of the given node, or null if the node has no right child.
     * @param node - The node to get the right child of.
     * @returns The right child of the node.
     */
    private right;
    /**
     * "If the node has a parent, return the parent, otherwise return null."
     *
     * The function takes a node as an argument and returns the parent of that node. If the node has no
     * parent, the function returns null
     * @param node - The node whose parent we want to find.
     * @returns The parent node of the node passed in.
     */
    private parent;
    /**
     * It inserts a new node at the given index, and updates the parent node's left or right child to
     * indicate that it's occupied
     * @param {number} index - the index of the new node
     * @param {nodePosition} positionOnParent - nodePosition
     * @param {T} item - The item to insert into the tree.
     * @returns The size of the tree
     */
    private insertAt;
    /**
     * Removes the last element in the tree, If the last level of the tree has only one element,
     * then the height of the tree is decremented
     * @returns The size of the tree.
     */
    private removeLast;
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
    private levelAndTreeInfo;
    /**
     * It swaps the items of two nodes
     * @param node1 - The first node to swap.
     * @param node2 - The node that we want to move.
     */
    private swapItems;
    /**
     * If both node1 and node2 are not null, return the node with the smaller item. If only one of them is
     * not null, return the non-null node. If both are null, return null
     * @param node1 - The first node to compare
     * @param node2 - The node to compare against.
     * @returns The node with the smallest item.
     */
    private minItemNode;
    /**
     * "While the current node has a parent, and the current node's item is less than the parent's item,
     * swap the items and set the current node to the parent."
     *
     * @param startNode - The node to start sifting up from.
     */
    private siftUp;
    /**
     * "While there is a child node, if the child node is less than the current node, swap the child node
     * with the current node and set the current node to the child node."
     *
     * @param startNode - The node to start sifting down from.
     */
    private siftDown;
    /**
     * If the tree is empty, insert the item at the root. Otherwise, if the last level is full, insert the
     * item at the first available spot on the next level. Otherwise, insert the item at the end of the
     * tree and then update the parent node's left and right children to reflect the new node's position
     * @param {T} itemToInsert - The item to insert into the heap.
     * @returns The size of the heap.
     * @complexity O(log(n))
     */
    insert(itemToInsert: T): number;
    /**
     * It's swapping the root node with the last node in the tree, and then setting the left or right child
     * of the parent of the last node to false
     * @returns The item that was removed.
     * @complexity O(log(n))
     */
    removeMin(): number | T | null;
}
export {};
