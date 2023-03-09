// ------------- Imports -------------- //

import {BinarySearchTree} from '../../Library/adts/binarySearchTree';

// ---------- Test funtions ----------- //

/**
 * It inserts a number of items into the tree, and then prints the tree in order
 * @param tree - BinarySearchTree<number> - The tree to insert into.
 * @param {number} [item] - The item to insert into the tree. If this is undefined, the tree will be
 * filled with numbers from 1 to 15.
 */
function insertionTest(tree: BinarySearchTree<number>, item?: number) {
  if (item === undefined) {
    while (tree.insert(tree.getSize() + 1) < 15);
  } else {
    tree.insert(item);
  }
  console.log(tree.inorderTraversal());
  return tree;
}

/**
 * It searches for the number 1 in the tree 100,000 times, then searches for the number 15 in the tree
 * 100,000 times, and returns the time it took to do each search
 * @param tree - BinarySearchTree<number>
 * @returns An object with two properties, timeFor1 and timeFor15.
 */
function searchTest(tree: BinarySearchTree<number>) {
  const repeatedSearch = (item: number) => {
    for (let i = 0; i < 100000; i++) {
      tree.search(item);
    }
  };

  let startTime;
  const timeFor1 =
    ((startTime = new Date().getTime()),
    repeatedSearch(1),
    new Date().getTime() - startTime);

  const timeFor15 =
    ((startTime = new Date().getTime()),
    repeatedSearch(15),
    new Date().getTime() - startTime);

  return {timeFor1, timeFor15};
}

/**
 * It takes a binary search tree and a number, and then it deletes the number from the tree and prints
 * the tree's inorder traversal
 * @param tree - BinarySearchTree<number> - The tree to remove the item from.
 * @param {number} item - The item to be removed from the tree.
 */
function removalTest(tree: BinarySearchTree<number>, item: number) {
  tree.delete(item);
  console.log(tree.inorderTraversal());
}

/**
 * Creating an object with two getters, tree1 and tree2. Each getter creates a new
 * BinarySearchTree, inserts a number of items into it, and then returns the tree.
 */
const getTestTree = {
  get tree1() {
    const tree = new BinarySearchTree<number>();
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15];
    items.forEach(item => tree.insert(item));
    console.log('\ninitial tree1\n\n', tree.inorderTraversal());
    return tree;
  },

  get tree2() {
    const tree = new BinarySearchTree<number>();
    const items = [8, 4, 12, 2, 6, 10, 14, 1, 3, 5, 7, 9, 11, 13, 15];
    items.forEach(item => tree.insert(item));
    console.log('\ninitial tree2\n\n', tree.inorderTraversal());
    return tree;
  },
};

// ------------ Main ------------ //

// ------ Tree 1 ------ //
/* Creating a new tree, inserting a number of items into it, and then searching for the
number 1 and 15 in the tree 100,000 times. It then removes the number 5, 15, and 1 from the tree,
and then inserts the number 2 into the tree. */
const tree1 = getTestTree.tree1;
const tree1SearchResults = searchTest(tree1);

console.log('\nremoval of 5 from tree1 result\n'), removalTest(tree1, 5);
console.log('\nremoval of 15 from tree1 result\n'), removalTest(tree1, 15);
console.log('\nremoval of 1 from tree1 result\n'), removalTest(tree1, 1);
console.log('\ninsertion of 2 from tree1 result\n'), insertionTest(tree1, 2);

// ------ Tree 2 ------ //
/* Creating a new tree, inserting a number of items into it, and then searching for the
number 1 and 15 in the tree 100,000 times. It then removes the number 8 from the tree. */
const tree2 = getTestTree.tree2;
const tree2SearchResults = searchTest(tree2);

console.log('\nremoval of 8 from tree2 result\n'), removalTest(tree2, 8);

// ------ Results ----- //
/* Using template literals to print out the results of the search test. */
console.log(
  `

  search test results:
  tree1: 1 time = ${tree1SearchResults.timeFor1}, 15 time = ${tree1SearchResults.timeFor15}
  tree2: 1 time = ${tree2SearchResults.timeFor1}, 15 time = ${tree2SearchResults.timeFor15}
  
  `
);
