"use strict";
// ------------------- Stack ------------------- //
Object.defineProperty(exports, "__esModule", { value: true });
const stack_1 = require("../../../LAB2-LINKED-LISTS-AND-MERGING/src/adts/stack");
// ------------------- Tuples ------------------- //
const openBrackets = ['(', '[', '{'];
const closeBrackets = [')', ']', '}'];
const allowedCharacters = [
    ...openBrackets,
    ...closeBrackets,
    ...['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ...['+', '-', '*', '/'],
];
//------------ generic/base function ----------- //
/**
 * "If the character is in the tuple, return true, otherwise return false."
 *
 * The function is generic, meaning that it can be used with any type. The generic type is called T,
 * and it extends the allowedCharacter type. This means that the generic type T can be any type that is
 * allowed by the allowedCharacter type
 * @param {string} character - string
 * @param tuple - readonly T[]
 * @returns A function that takes a string and a tuple of allowed characters and returns a boolean.
 * @complexity O(1) - the character is checked within a fixed/constant size tuple
 */
function overlap(character, tuple) {
    return tuple.includes(character);
}
//----------- Type guards/abstractions --------- //
/**
 * "If the character is an allowed character, return true, otherwise return false."
 *
 * The function isAllowedCharacter is a predicate function. It returns a boolean value
 * @param {string} character - string - The character to check.
 * @returns A boolean
 * @complexity O(1) - overlap is a constant time function
 */
function isAllowedCharacter(character) {
    return overlap(character, allowedCharacters);
}
/**
 * "If the character is an allowed character and it's also an open bracket, then it's an open bracket."
 *
 * The overlap function is a helper function that checks if a value is in an array
 * @param {allowedCharacter} character - allowedCharacter
 * @returns A boolean
 * @complexity O(1) - overlap is a constant time function
 */
function isOpenBracket(character) {
    return overlap(character, openBrackets);
}
/**
 * "If the character is an allowed character, and it's also a close bracket, then it's a close
 * bracket."
 *
 * The above function is a type guard. It's a function that takes a parameter, and returns a boolean.
 * If the boolean is true, then the parameter is of a certain type
 * @param {allowedCharacter} character - allowedCharacter
 * @returns A boolean
 * @complexity O(1) - overlap is a constant time function
 */
function isCloseBracket(character) {
    return overlap(character, closeBrackets);
}
//--------------- helper functions ------------- //
/**
 * It takes two arguments, one of which is an open bracket and the other is a close bracket, and
 * returns true if the open bracket and close bracket are of the same type
 * @param {openBracket} openBracket - The opening bracket of the pair.
 * @param {closeBracket} closeBracket - The closing bracket that we're checking against.
 * @returns A boolean value.
 * @complexity O(1) - comparison of a variable to a constant size tuple
 */
function isSameType(openBracket, closeBracket) {
    return openBracket === openBrackets[closeBrackets.indexOf(closeBracket)];
}
/**
 * If the current index is the last index and the current character is an open bracket or the stack
 * size is greater than 1, then the string is unbalanced
 * @param {number} currentIndex - the current index of the character we're looking at
 * @param {number} lastIndex - the last index of the string
 * @param {allowedCharacter} currentCharacter - the current character we're looking at
 * @param {number} stackSize - the number of open brackets in the stack
 * @returns A boolean value.
 * @complexity O(1) - constant time comparisons and "isOpenBracket" is a constant time function
 */
function isUnbalanced(currentIndex, lastIndex, currentCharacter, stackSize) {
    return (currentIndex === lastIndex &&
        (isOpenBracket(currentCharacter) || stackSize > 1));
}
/**
 * If the current character is a closing bracket and the top of the stack is not the same type of
 * bracket, then return true
 * @param {allowedCharacter} currentCharacter - allowedCharacter
 * @param {openBracket | null} stackTop - openBracket | null
 * @returns A boolean value
 * @complexity O(1) - constant time comparisons and "isCloseBracket" is a constant time function
 */
function isWrongCloseType(currentCharacter, stackTop) {
    return (isCloseBracket(currentCharacter) &&
        (!stackTop || !isSameType(stackTop, currentCharacter)));
}
// -------------- Bracket checker -------------- //
/**
 * It checks if the input is balanced by pushing open brackets to a stack and popping them off when a
 * close bracket is encountered
 * @param {string} input - The string to be checked.
 * @returns A boolean value.
 * @complexity O(n) - all operations and functions ran inside the
 * for loop are of constant time and the for loop itself will run "n" times
 */
function verifyBrackets(input) {
    const stack = new stack_1.llStack();
    for (let index = 0, length = input.length, lastIndex = length - 1; index < length; index++) {
        const currentCharacter = input[index];
        if (!isAllowedCharacter(currentCharacter) ||
            isUnbalanced(index, lastIndex, currentCharacter, stack.size()) ||
            isWrongCloseType(currentCharacter, stack.top())) {
            console.log('Bad input');
            stack.clear();
            return false;
        }
        if (isOpenBracket(currentCharacter))
            stack.push(currentCharacter);
        else if (isCloseBracket(currentCharacter))
            stack.pop();
    }
    stack.clear();
    return true;
}
// ----------------- Main ----------------- //
/* It's creating a Map object with the test inputs. */
const testInputs = new Map([
    [1, '(9*[3*{[(3+3)/5]*7}])'],
    [2, '{3*(2+[3-[4/[6/9]]]})'],
    [3, '((3*(9-(4*(6-5))))'],
    [4, '{2-{3*{6/[[[(((9-0)))]]]}}/7}'],
    [5, '['],
    [6, ']['],
    [7, '[]'],
    [8, '[][[]['],
]);
/* It's iterating over the test inputs and printing the results of the verification. */
testInputs.forEach((testString, testNumber) => {
    console.log(`testing test input #${testNumber}`);
    console.log(verifyBrackets(testString)
        ? '\nVerification PASSED\n\n'
        : '\nVerification FAILED\n\n');
});
//# sourceMappingURL=bracket-matching.js.map