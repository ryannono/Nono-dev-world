"use strict";
/* A Node is a class that has a character, a next, and a previous. */
class Node {
    constructor(passedItem, passedNext) {
        this.item = passedItem;
        this.next = passedNext;
    }
}
/* Creating a linked list. */
class LinkedList {
    constructor(passedList) {
        var _a, _b;
        this.front = passedList === null || passedList === void 0 ? void 0 : passedList.front;
        this.back = passedList === null || passedList === void 0 ? void 0 : passedList.back;
        this.sum = (_a = passedList === null || passedList === void 0 ? void 0 : passedList.sum) !== null && _a !== void 0 ? _a : 0;
        this.length = (_b = passedList === null || passedList === void 0 ? void 0 : passedList.length) !== null && _b !== void 0 ? _b : 0;
    }
    /**
     * If there is no back node, set the front node to the new node, otherwise set the back node's next
     * node to the new node and set the new node's previous node to the back node, then set the back node
     * to the new node, add the new node's item to the maxSum, and increment the length.
     * @param {Node} newNode - Node - the new node to be added to the back of the queue
     * @returns The queue itself.
     */
    push(newNode) {
        var _a;
        const currentback = this.back;
        if (!currentback) {
            this.front = newNode;
        }
        else {
            currentback.next = newNode;
            newNode.previous = currentback;
        }
        this.back = newNode;
        this.sum += (_a = newNode.item) !== null && _a !== void 0 ? _a : 0;
        this.length++;
        return this;
    }
    /**
     * set the front and back to undefined, and set the length to 0.
     */
    clear(keepSum) {
        this.front = undefined;
        this.back = undefined;
        if (!keepSum)
            this.sum = 0;
        this.length = 0;
    }
    /**
     * If the front node exists and has a next node, then set the front node to the next node, set the
     * previous node of the new front node to undefined, and decrement the length
     */
    removeFromFront(keepSum) {
        var _a, _b;
        if (!((_a = this.front) === null || _a === void 0 ? void 0 : _a.next)) {
            this.clear(keepSum);
        }
        else {
            if (!keepSum)
                this.sum -= (_b = this.front.item) !== null && _b !== void 0 ? _b : 0;
            this.front = this.front.next;
            this.front.previous = undefined;
            this.length--;
        }
    }
    /**
     * If there is a back node, set the back node to the previous node, set the back node's next to
     * undefined, and decrement the length
     */
    removeFromBack(keepSum) {
        var _a, _b;
        if (!((_a = this.back) === null || _a === void 0 ? void 0 : _a.previous)) {
            this.clear(keepSum);
        }
        else {
            if (!keepSum)
                this.sum -= (_b = this.back.item) !== null && _b !== void 0 ? _b : 0;
            this.back = this.back.previous;
            this.back.next = undefined;
            this.length--;
        }
    }
}
/**
 * If the sumToTest is greater than the currMaxSum, return true, otherwise return false.
 * @param {number} sumToTest - the sum of the current subarray
 * @param {number} currMaxSum - the current max sum of the array
 * @returns a boolean value.
 */
function isMaxSum(sumToTest, currMaxSum) {
    if (sumToTest > currMaxSum)
        return true;
    return false;
}
/**
 * If the index is greater than the maximum normal index, return the index minus the array length,
 * otherwise return the index.
 * @param {number} arrayLength - The length of the array.
 * @param {number} index - The index of the item you want to get.
 * @returns The index of the element in the array that is at the given index.
 */
function circularIndex(arrayLength, index) {
    const maxNormalIndex = arrayLength - 1;
    if (index > maxNormalIndex)
        return index - arrayLength;
    return index;
}
function maxSubarraySum(array) {
    const list = new LinkedList();
    let maxSum = array[0];
    for (let i = 0, length = array.length; i < length; i++) {
        let numbersTraversed = 0;
        while (numbersTraversed < length) {
            if (list.length && isMaxSum(list.sum, maxSum)) {
                maxSum = list.sum;
                console.log(`Passed: ${list.sum}\n`);
            }
            if (list.length)
                numbersTraversed++;
            const index = circularIndex(length, i + numbersTraversed);
            list.push(new Node(array[index]));
            console.log(`sum: ${list.sum}\n`);
        }
        list.removeFromFront();
        console.log(`sum: ${list.sum}\n`);
        i++;
        while (list.length) {
            console.log(`2nd S sum: ${list.sum}\n`);
            if (isMaxSum(list.sum, maxSum)) {
                maxSum = list.sum;
                console.log(`Passed: ${list.sum}\n`);
            }
            list.removeFromBack();
        }
    }
    return maxSum;
}
/* It's calling the longestSubstring function and passing in the string 'cbbbbdbibbnbjbobn' as an
argument. */
console.log('final: ' + maxSubarraySum([3, 1, 3, 2, 6]));
//# sourceMappingURL=max-subarray-sum.js.map