"use strict";
// ---------------- heapSort ---------------- //
Object.defineProperty(exports, "__esModule", { value: true });
exports.testArrays = void 0;
const heapSort_1 = require("./algorithms/heapSort");
// ---------------- heapSort ---------------- //
/** Creating a map with 3 keys and 3 arrays as values. */
exports.testArrays = new Map([
    [1, [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]],
    [2, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
    [3, [1, 3, 5, 7, 9, 10, 8, 6, 4, 2]],
]);
// ------------------ main ----------------- //
/* Iterating over the testArrays array and logging the test number and the sorted array. */
exports.testArrays.forEach((array, testNumber) => {
    console.log(`testing test input #${testNumber}`);
    console.log((0, heapSort_1.heapSort)(array), '\n');
});
//# sourceMappingURL=testArrays.js.map