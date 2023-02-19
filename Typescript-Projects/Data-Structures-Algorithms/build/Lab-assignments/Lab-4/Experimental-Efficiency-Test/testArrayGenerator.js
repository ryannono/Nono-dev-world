"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const getRandomInt_1 = require("../../../Library/functions/getRandomInt");
// ----------- generator ------------ //
/**
 * It creates an array of a given size, and fills it with random numbers
 * @param {number} size - The size of the array to be generated.
 * @returns An array of random integers.
 */
function getRandomArray(size) {
    const array = new Array(size);
    for (let k = 0; k < array.length; k++) {
        array[k] = (0, getRandomInt_1.getRandomInt)(0, size);
    }
    return array;
}
// --------------- main --------------- //
const randTestArrays = [];
let i = 8;
while (i <= 2 ** 20) {
    const array = getRandomArray(i);
    randTestArrays.push(array);
    i *= 2;
}
(0, fs_1.writeFileSync)('Lab-assignments/Lab-4/Experimental-Efficiency-Test/CPURuntimeTestArrays.json', JSON.stringify(randTestArrays));
//# sourceMappingURL=testArrayGenerator.js.map