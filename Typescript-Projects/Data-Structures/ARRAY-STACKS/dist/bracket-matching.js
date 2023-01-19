"use strict";
// ------------------- Stack ------------------- //
Object.defineProperty(exports, "__esModule", { value: true });
const Stack_1 = require("./Stack");
// ------------------- Tuples ------------------- //
const openBrackets = ['(', '[', '{'];
const closeBrackets = [')', ']', '}'];
const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operations = ['+', '-', '*', '/'];
const allowedCharacters = [
    ...openBrackets,
    ...closeBrackets,
    ...digits,
    ...operations,
];
//------------------ Type guards ---------------- //
/**
 * "If the character is in the allowedCharacters set, return true, otherwise return false."
 *
 * The function isAllowedCharacter is a type guard. It takes a string and returns a boolean. If the
 * string is in the allowedCharacters set, it returns true, otherwise it returns false
 * @param {string} character - string - This is the character that we're checking to see if it's
 * allowed.
 * @returns A boolean
 */
function isAllowedCharacter(character) {
    return new Set(allowedCharacters).has(character);
}
/**
 * "If the character is an open bracket, return true, otherwise return false."
 *
 * The above function is a type guard. It's a function that takes a parameter and returns a boolean. If
 * the boolean is true, the parameter is of a certain type. If the boolean is false, the parameter is
 * of a different type
 * @param {allowedCharacter} character - allowedCharacter - This is the parameter that we're passing
 * into the function. It's a union type of allowedCharacter.
 * @returns A boolean value.
 */
function isOpenBracket(character) {
    return new Set(openBrackets).has(character);
}
/**
 * "If the character is a close bracket, return true, otherwise return false."
 *
 * The above function is a type guard. It's a function that takes a parameter and returns a boolean. If
 * the boolean is true, the parameter is of a certain type. If the boolean is false, the parameter is
 * of a different type
 * @param {allowedCharacter} character - allowedCharacter
 * @returns A boolean
 */
function isCloseBracket(character) {
    return new Set(closeBrackets).has(character);
}
/**
 * If the open bracket exists, return whether it's the same type as the close bracket
 * @param {openBracket | null} openBracket - The open bracket that we're checking against.
 * @param {closeBracket} closeBracket - The closing bracket that we're trying to match.
 * @returns A boolean value.
 */
function isSameType(openBracket, closeBracket) {
    if (!openBracket)
        return false;
    return openBracket === openBrackets[closeBrackets.indexOf(closeBracket)];
}
// -------------- Bracket checker -------------- //
/**
 * It checks if the input is valid by pushing open brackets to a stack and popping them off when a
 * close bracket is encountered
 * @param {string} input - string - The string to be checked.
 * @returns A boolean value.
 */
function verifyBrackets(input) {
    const stack = new Stack_1.Stack();
    for (let i = 0, length = input.length, lastIndex = length - 1; i < length; i++) {
        const currentCharacter = input[i];
        /* checking if the current character is allowed, if it's the last character and it's an open
        bracket, or if it's a close bracket and it's not the same type as the open bracket. If any of those
        conditions are true, it returns false. */
        if (!isAllowedCharacter(currentCharacter) ||
            (i === lastIndex &&
                (isOpenBracket(currentCharacter) || stack.size() > 1)) ||
            (isCloseBracket(currentCharacter) &&
                !isSameType(stack.pop(), currentCharacter))) {
            console.log('Bad input');
            stack.destroy();
            return false;
        }
        /* Pushing the current character to the stack if it's an open bracket. */
        if (isOpenBracket(currentCharacter)) {
            stack.push(currentCharacter);
        }
    }
    stack.destroy();
    return true;
}
// ----------------- Main ----------------- //
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
/* It's iterating through the testInputs Map and running the verifyBrackets function on each
value. */
testInputs.forEach((testString, testNumber) => {
    console.log(`testing test input #${testNumber}`);
    console.log(verifyBrackets(testString)
        ? '\nVerification PASSED\n\n'
        : '\nVerification FAILED\n\n');
});
//# sourceMappingURL=bracket-matching.js.map