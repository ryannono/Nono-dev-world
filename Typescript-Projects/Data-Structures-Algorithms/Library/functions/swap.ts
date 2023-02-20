//-------------Swap function------------//

/**
 * It swaps the values of two elements in an array
 * @param {T[]} array - The array.
 * @param {number} index1 - The index of the first item to swap.
 * @param {number} index2 - The index of the second item to swap.
 */
export function swap<T>(array: T[], index1: number, index2: number) {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}
