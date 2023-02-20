"use strict";
// ----------------- Imports ----------------- //
Object.defineProperty(exports, "__esModule", { value: true });
const comparator_1 = require("../functions/comparator");
const keyAccessor_1 = require("../functions/keyAccessor");
const insertion_sort_1 = require("./insertion-sort");
const merge_sort_1 = require("./merge-sort");
// ---------------- Bucket Sort ---------------- //
/**
 * We create an array of buckets, each bucket is an array of elements. We then iterate through the
 * array and place each element into the bucket corresponding to its key. We then sort each bucket and
 * concatenate the buckets together
 * @param {T[]} array - The array to be sorted.
 * @param {number} [minKey] - The minimum key value in the array.
 * @param {number} [maxKey] - The maximum key value in the array.
 * @param keyAccessor - A function that takes in an element and returns a number.
 * @param comparator - A function that compares two elements and returns a number.
 * @returns The sorted array.
 */
function bucketSort(array, minKey, maxKey, keyAccessor = keyAccessor_1.defaultNumKeyAccessor, comparator = comparator_1.defaultComparator) {
    if (!array.length)
        return array;
    /**
     * It takes an array of elements, and returns an array of elements grouped by the floored value of the
     * key accessor function
     * @param {T} element - T
     */
    const getFlooredKey = (element) => Math.floor(keyAccessor(element));
    /* If the user does not specify the max and min key,
    we find the max and min key by iterating through the array. */
    if (typeof maxKey === 'undefined' || typeof minKey === 'undefined') {
        let tempMax, tempMin;
        tempMax = tempMin = array[0];
        for (const element of array) {
            if (comparator(element, tempMax) > 0)
                tempMax = element;
            if (comparator(element, tempMin) < 0)
                tempMin = element;
        }
        maxKey = getFlooredKey(tempMax);
        minKey = getFlooredKey(tempMin);
    }
    else {
        minKey = Math.floor(minKey);
        maxKey = Math.floor(maxKey);
    }
    let keyRange = maxKey - minKey + 1;
    const offset = -minKey;
    const containerArray = [];
    /* Creating an array of empty arrays. */
    while (keyRange--)
        containerArray.push([]);
    /* Iterating through the array and placing each element into the bucket corresponding to its key. */
    while (array.length) {
        const currElement = array.pop();
        containerArray[getFlooredKey(currElement) + offset].push(currElement);
    }
    /* Sorting the buckets. */
    for (const bucket of containerArray) {
        if (bucket.length < 20)
            (0, insertion_sort_1.insertionSort)(bucket, 0, comparator);
        else
            (0, merge_sort_1.mergeSort)(bucket);
        array.push(...bucket);
    }
    return array;
}
//# sourceMappingURL=bucket-sort.js.map