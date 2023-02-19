/**
 * It swaps the values of two elements in an array
 * @param {number[]} array - The array to sort.
 * @param {number} index1 - The index of the first item to swap.
 * @param {number} index2 - The index of the second item to swap.
 * @complexity O(1)
 */
export function swap(array: number[], index1: number, index2: number) {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}
