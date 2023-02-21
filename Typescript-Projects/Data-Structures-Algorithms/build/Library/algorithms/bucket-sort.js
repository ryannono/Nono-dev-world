"use strict";
// ----------------- Imports ----------------- //
Object.defineProperty(exports, "__esModule", { value: true });
const comparator_1 = require("../functions/comparator");
const keyAccessor_1 = require("../functions/keyAccessor");
const insertion_sort_1 = require("./insertion-sort");
const merge_sort_1 = require("./merge-sort");
// ---------------- Bucket Sort ---------------- //
/**
 * It takes an array of elements, a comparator function, and a key accessor function, and returns an
 * object with the minimum and maximum keys
 * @param {T[]} array - The array to be sorted.
 * @param comparator - A function that takes two elements and returns a number. If the number is
 * positive, the first element is greater than the second. If the number is negative, the first element
 * is less than the second. If the number is 0, the two elements are equal.
 * @param keyAccessor - A function that takes an element of the array and returns a number.
 * @returns An object with two keys, min and max, and their values are the min and max values of the
 * array.
 */
function getMinAndMaxKeys(array, comparator, keyAccessor) {
    let maxElement, minElement;
    maxElement = minElement = array[0];
    for (const element of array) {
        if (comparator(element, maxElement) > 0)
            maxElement = element;
        if (comparator(element, minElement) < 0)
            minElement = element;
    }
    return {
        min: Math.floor(keyAccessor(minElement)),
        max: Math.floor(keyAccessor(maxElement)),
    };
}
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
    /* If the minKey and maxKey are not defined,
    we find the min and max keys in the array. If they
    are defined, we floor them. */
    if (typeof maxKey === 'undefined' || typeof minKey === 'undefined') {
        const { min, max } = getMinAndMaxKeys(array, comparator, keyAccessor);
        minKey = min;
        maxKey = max;
    }
    else {
        minKey = Math.floor(minKey);
        maxKey = Math.floor(maxKey);
    }
    const keyRange = maxKey - minKey + 1;
    const containerArray = [];
    /* Creating an array of empty arrays. */
    while (containerArray.push([]) < keyRange)
        ;
    /* Iterating through the array and placing each element into the bucket corresponding to its key. */
    let currElement;
    while ((currElement = array.pop())) {
        containerArray[Math.floor(keyAccessor(currElement)) - minKey].push(currElement);
    }
    /* Sorting each bucket. */
    for (const bucket of containerArray) {
        if (!bucket.length)
            continue;
        else if (bucket.length < 20)
            (0, insertion_sort_1.insertionSort)(bucket, 0, comparator);
        else
            (0, merge_sort_1.mergeSort)(bucket, 0, bucket.length - 1, comparator);
        array.push(...bucket);
    }
    return array;
}
//# sourceMappingURL=bucket-sort.js.map