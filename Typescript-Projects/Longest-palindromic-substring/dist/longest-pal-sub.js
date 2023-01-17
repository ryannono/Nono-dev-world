"use strict";
/* A Node is a class that has a character, a next, and a previous. */
class Node {
    constructor(passedCharacter, passedNext) {
        this.character = passedCharacter;
        this.next = passedNext;
    }
}
/* Creating a linked list. */
class LinkedList {
    constructor(passedList) {
        var _a;
        this.front = passedList === null || passedList === void 0 ? void 0 : passedList.front;
        this.back = passedList === null || passedList === void 0 ? void 0 : passedList.back;
        this.length = (_a = passedList === null || passedList === void 0 ? void 0 : passedList.length) !== null && _a !== void 0 ? _a : 0;
    }
    /**
     * We create a new node, and then we set the current back node's next property to the new node, and
     * then we set the new node's previous property to the current back node, and then we set the back
     * property to the new node, and then we increment the length property
     * @param {Node} newNode - The node that we want to add to the end of the list.
     * @returns The linked list
     */
    push(newNode) {
        const currentback = this.back;
        if (!currentback) {
            this.front = newNode;
            this.back = newNode;
            this.length = 1;
        }
        else {
            currentback.next = newNode;
            newNode.previous = currentback;
            this.back = newNode;
            this.length++;
        }
        return this;
    }
    /**
     * set the front and back to undefined, and set the length to 0.
     */
    clear() {
        this.front = undefined;
        this.back = undefined;
        this.length = 0;
    }
    /**
     * If the front node exists and has a next node, then set the front node to the next node, set the
     * front node's previous node to undefined, and decrement the length
     */
    removeFromFront() {
        var _a;
        if (!((_a = this.front) === null || _a === void 0 ? void 0 : _a.next)) {
            this.clear();
        }
        else {
            this.front = this.front.next;
            this.front.previous = undefined;
            this.length--;
        }
    }
    /**
     * If there is a back node, set the back node to the previous node, set the back node's next to
     * undefined, and decrement the length
     */
    removeFromBack() {
        var _a;
        if (!((_a = this.back) === null || _a === void 0 ? void 0 : _a.previous)) {
            this.clear();
        }
        else {
            this.back = this.back.previous;
            this.back.next = undefined;
            this.length--;
        }
    }
}
/**
 * We start at the front and back of the list, and we move towards the middle of the list, comparing
 * the characters of the elements we're on. If we ever find a mismatch, we return false. If we make it
 * all the way to the middle of the list without finding a mismatch, we return true
 * @param {LinkedList} list - LinkedList - the list to check
 * @returns a boolean value.
 */
function isPalindromicList(list) {
    if (!list.front || !list.back)
        return false;
    let leftSideElement = list.front, rightSideElement = list.back;
    while (leftSideElement !== rightSideElement) {
        if ((leftSideElement === null || leftSideElement === void 0 ? void 0 : leftSideElement.character) !== (rightSideElement === null || rightSideElement === void 0 ? void 0 : rightSideElement.character)) {
            return false;
        }
        if (leftSideElement.next === rightSideElement)
            break;
        if (leftSideElement.next && rightSideElement.previous) {
            leftSideElement = leftSideElement.next;
            rightSideElement = rightSideElement.previous;
        }
    }
    return true;
}
/**
 * While the front of the list has a character, add that character to the output string and move to the
 * next node.
 * @param {LinkedList} list - LinkedList - the linked list to be converted to a string
 * @returns A string
 */
function createString(list) {
    let output = '';
    let front = list.front;
    while (front === null || front === void 0 ? void 0 : front.character) {
        output += front.character;
        front = front.next;
    }
    return output;
}
/**
 * We're going to iterate through the string, adding each character to a linked list, and then checking
 * if the linked list is a palindrome. If it is, we'll check if it's the longest palindrome we've found
 * so far. If it's not, we'll remove the first character from the linked list and check again. If it's
 * still not a palindrome, we'll remove the last character from the linked list and check again
 * @param {string} fullString - the string we're looking for the longest palindromic substring in
 * @returns The longest palindromic substring in the given string.
 */
function longestSubstring(fullString) {
    const stringlength = fullString.length;
    const list = new LinkedList();
    let longestPalSub = '', i = 0;
    while (i < stringlength) {
        while (i <= stringlength) {
            console.log('frnt: ' + createString(list));
            if (list.length > longestPalSub.length && isPalindromicList(list)) {
                longestPalSub = createString(list);
                console.log('passed first pass');
            }
            const currentCharacter = fullString[i];
            list.push(new Node(currentCharacter));
            i++;
        }
        list.removeFromFront();
        while (list.length > longestPalSub.length) {
            console.log('back: ' + createString(list));
            if (isPalindromicList(list)) {
                longestPalSub = createString(list);
                console.log('passed second pass');
            }
            list.removeFromBack();
            i--;
        }
        list.removeFromFront();
    }
    return longestPalSub;
}
/* It's calling the longestSubstring function and passing in the string 'cbbbbdbibbnbjbobn' as an
argument. */
console.log('final: ' + longestSubstring('cbbbbdbibbnbjbobn'));
//# sourceMappingURL=longest-pal-sub.js.map