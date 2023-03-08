export declare class TreeNode<T> {
    item: T | null;
    parent: TreeNode<T> | null;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
    constructor(item?: T, parent?: TreeNode<T>, left?: TreeNode<T>, right?: TreeNode<T>);
}
