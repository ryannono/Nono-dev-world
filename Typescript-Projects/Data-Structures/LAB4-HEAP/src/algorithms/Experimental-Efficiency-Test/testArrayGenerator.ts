import {writeFileSync} from 'fs';
import {getRandomInt} from '../../functions/getRandomInt';

// ----------- generator ------------ //

/**
 * It creates an array of a given size, and fills it with random numbers
 * @param {number} size - The size of the array to be generated.
 * @returns An array of random integers.
 */
function getRandomArray(size: number) {
  const array = new Array(size);
  for (let k = 0; k < array.length; k++) {
    array[k] = getRandomInt(0, size);
  }
  return array;
}

// --------------- main --------------- //

const randTestArrays: number[][] = [];

let i = 8;
while (i <= 2 ** 20) {
  const array: number[] = getRandomArray(i);
  randTestArrays.push(array);
  i *= 2;
}

writeFileSync(
  'src/algorithms/Experimental-Efficiency-Test/CPURuntimeTestArrays.json',
  JSON.stringify(randTestArrays)
);
