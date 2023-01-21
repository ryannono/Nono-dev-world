"use strict";
// ------------------- Stack ------------------- //
Object.defineProperty(exports, "__esModule", { value: true });
const Stack_1 = require("./Stack");
// ------------------- Tuple ------------------- //
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
 * It's iterating over the input string and checking each character. If the current character is a 0,
 * then it's pushing it onto the stack. If the current character is a 1, then it's popping the stack.
 * If the current character is not an allowed character, or if the current character is a 0 and it's
 * the last character in the string, or if the current character is a 1 and the stack is empty, then
 * the input is bad
 * @param {string} input - string
 * @returns A boolean value.
 */
function verifyLanguage(input) {
    const stack = new Stack_1.Stack();
    for (let i = 0, length = input.length, lastIndex = length - 1; i < length; i++) {
        const currentCharacter = input[i];
        if (!isAllowedCharacter(currentCharacter) ||
            (i === lastIndex && currentCharacter === '0') ||
            (currentCharacter === '1' && stack.isEmpty())) {
            console.log('Bad input');
            stack.destroy();
            return false;
        }
        if (currentCharacter === '0')
            stack.push(currentCharacter);
        else
            stack.pop();
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