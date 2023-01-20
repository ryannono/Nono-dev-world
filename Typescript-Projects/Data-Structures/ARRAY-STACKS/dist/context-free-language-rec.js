"use strict";
// ------------------- Stack ------------------- //
Object.defineProperty(exports, "__esModule", { value: true });
const Stack_1 = require("./Stack");
// ------------------- Types ------------------- //
const allowedCharacters = ['0', '1'];
//----------------- Type guard ----------------- //
/**
 * "If the character is in the allowedCharacters array, then it's an allowed character."
 *
 * The above function is a type guard. It's a function that takes a value and returns a boolean. If the
 * boolean is true, then the value is of a certain type
 * @param {unknown} character - unknown
 * @returns A function that takes a character and returns a boolean.
 */
function isAllowedCharacter(character) {
    return allowedCharacters.includes(character);
}
// ------------- Language checker ------------- //
/**
 * It's creating a new stack that only accepts the type '0', iterating over the input string and
 * checking to see if the current character is a 0 or a 1, pushing a 0 onto the stack if it's a 0,
 * popping a 0 off of the stack if it's a 1, destroying the stack and returning true if the stack is
 * empty, and destroying the stack and returning false if the stack is not empty
 * @param {string} input - string
 * @returns It's returning a boolean.
 */
function verifyLanguage(input) {
    const stack = new Stack_1.Stack();
    for (let i = 0, length = input.length, lastIndex = length - 1; i < length; i++) {
        const currentCharacter = input[i];
        if (!isAllowedCharacter(currentCharacter) ||
            (i === lastIndex && currentCharacter === '0') ||
            (currentCharacter === '1' && !stack.pop())) {
            console.log('Bad input');
            stack.destroy();
            return false;
        }
        if (currentCharacter === '0') {
            stack.push(currentCharacter);
        }
    }
    stack.destroy();
    return true;
}
// ----------------- Main ----------------- //
/* Test map with 7 key-value pairs. */
const testLangInputs = new Map([
    [1, '01'],
    [2, '000111'],
    [3, '00000001111111'],
    [4, '10'],
    [5, '00'],
    [6, '00111'],
    [7, '0101'],
]);
/* Iterating over the testLangInputs test map and running the verifyLanguage function on each
value. */
testLangInputs.forEach((testString, testNumber) => {
    console.log(`testing test input #${testNumber}`);
    console.log(verifyLanguage(testString)
        ? '\nYes - Verification PASSED\n\n'
        : '\nNo - Verification FAILED\n\n');
});
//# sourceMappingURL=context-free-language-rec.js.map