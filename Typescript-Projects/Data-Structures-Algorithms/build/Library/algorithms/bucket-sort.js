"use strict";
// ----------------- Imports ----------------- //
Object.defineProperty(exports, "__esModule", { value: true });
const quick_sort_1 = require("./quick-sort");
const comparator_1 = require("../functions/comparator");
const keyAccessor_1 = require("../functions/keyAccessor");
// ---------------- Bucket Sort ---------------- //
/**
 * We create an array of arrays, where each array is a bucket. We then iterate through the input array
 * and push each element into the bucket that corresponds to its key. Finally, we iterate through the
 * buckets and sort each bucket using quick sort
 * @param {T[]} array - The array to sort.
 * @param {number} maxKey - The maximum value of the key.
 * @param keyAccessor - A function that takes in an element and returns a number. This number is used
 * to determine which bucket the element should be placed in.
 * @param comparator - A function that takes two elements and returns a number. If the number is less
 * than 0, the first element is less than the second. If the number is greater than 0, the first
 * element is greater than the second. If the number is 0, the two elements are equal.
 * @returns The sorted array.
 */
function bucketSort(array, maxKey, keyAccessor = keyAccessor_1.defaultNumKeyAccessor, comparator = comparator_1.defaultComparator) {
    const containerArray = [];
    while (maxKey-- + 1)
        containerArray.push([]);
    while (array.length) {
        const currElement = array.pop();
        containerArray[keyAccessor(currElement)].push(currElement);
    }
    for (const bucket of containerArray) {
        (0, quick_sort_1.quickSort)(bucket, 0, bucket.length - 1, comparator);
        array.push(...bucket);
    }
    return array;
}
//# sourceMappingURL=bucket-sort.js.map