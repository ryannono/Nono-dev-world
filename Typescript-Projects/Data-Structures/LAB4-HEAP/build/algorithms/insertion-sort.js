"use strict";
// ---------------- swap ---------------- //
Object.defineProperty(exports, "__esModule", { value: true });
const swap_1 = require("../functions/swap");
// ---------------- tests ---------------- //
const testArrays_1 = require("../testArrays");
// ------------ insertionSort ------------ //
/**
 * For each element in the array, starting from the second element, if the element is less than the
 * previous element, swap it with the previous element until it is greater than or equal to the
 * previous element.
 * @param {number[]} array - number[] - the array to sort
 * @returns The sorted array.
 * @ComplexityBestCase O(1) - array of length 1 or O(n) for a sorted array
 * @ComplexityAvgCase O(n**2) - need to go back and verify each element on each advancment
 * @ComplexityWorstCase O(n**2) - need to go back and verify each element on each advancment
 */
function insertionSort(array) {
    if (array.length < 2)
        return array;
    for (let positionIndex = 1, length = array.length; positionIndex < length; positionIndex++) {
        const currElement = array[positionIndex];
        const prevElement = array[positionIndex - 1];
        let swapCount = 0;
        if (prevElement > currElement) {
            /* Iterating backwards through the sorted portion
            of the array and swapping the current element with
            the previous element until the current element is
            greater than or equal to the previous element. */
            for (let sortedIndex = positionIndex - 1; sortedIndex >= 0; sortedIndex--) {
                const currElementIndex = positionIndex - swapCount;
                const sortedElement = array[sortedIndex];
                if (currElement > sortedElement)
                    break;
                (0, swap_1.swap)(array, sortedIndex, currElementIndex);
                swapCount++;
            }
        }
    }
    return array;
}
// ------------------ main ----------------- //
/* Iterating over the testArrays array and logging the test number and the sorted array. */
testArrays_1.testArrays.forEach((array, testNumber) => {
    console.log(`testing test input #${testNumber}`);
    console.log(insertionSort(array), '\n');
});
//# sourceMappingURL=insertion-sort.js.map