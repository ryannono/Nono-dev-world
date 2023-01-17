"use strict";
/* PROMPT: Design an algorithm that recognizes (accepts) strings of strings that contain a
number of zeros followed by the same number of ones.
Examples of strings in the language are: 01, 0011, 000111, etc.
Strings that are not in the language are, for example, 10, 00, 111, 1100, 0101, and many
more. The algorithm should take a string of 0’s and 1’s as input and output “Yes” if the
string belongs to the language, and “No” if the string doesn’t belong to the language. The
algorithm should use a stack. When it reads a 0 from the string, it pushes 0 onto the stack.
When it reads a 1, it checks if the stack has a 0, in which case that 0 is popped from the
stack. When the stack is empty and the end of the string is reached, the string is recognized
as correct (Yes). Otherwise, the string is not in the language (No). */
// ------------------- Enums ------------------- //
/* It's a TypeScript feature that allows you to create a tuple type. */
const allowedRecInputs = ['0', '1'];
// ------------------- Stack ------------------- //
/* It's a class that creates a stack data structure
that can hold any type of data */
class languageStack {
    constructor() {
        this.data = [];
        this.dataLength = 0;
    }
    /**
     * The push function takes an item of type zero and adds it to the end of the data array
     * @param {zero} item - The item to be added to the stack.
     * @returns The length of the array.
     */
    push(item) {
        this.data[this.dataLength] = item;
        this.dataLength++;
        return this.dataLength;
    }
    /**
     * It removes the last item from the array and returns the removed item and the new length of the
     * array
     * @returns The last item in the array and the new length of the array.
     */
    pop() {
        this.dataLength--;
        return {
            removedItem: this.data[this.dataLength],
            newLength: this.dataLength,
        };
    }
    /**
     * It returns the last element in the array
     * @returns The last element in the array.
     */
    top() {
        return this.data[this.dataLength - 1];
    }
    /**
     * It returns the length of the data array
     * @returns The size of the data array.
     */
    size() {
        return this.dataLength;
    }
    /**
     * If the dataLength property of the object is not equal to zero, return false. Otherwise, return
     * true
     * @returns The return value is a boolean.
     */
    isEmpty() {
        return !this.dataLength ? true : false;
    }
    /**
     * It clears the array by setting the dataLength property to 0
     */
    clear() {
        this.dataLength = 0;
    }
    /**
     * It sets the data array to an empty array and sets the dataLength to 0
     */
    destroy() {
        this.data = [];
        this.dataLength = 0;
    }
}
//-------- Type guards & helper functions ------ //
/**
 * If the input is in the allowedRecInputs array, return true, otherwise return false.
 * @param {string} input - The input string to check.
 * @returns A boolean value.
 */
function isAllowedRecInput(input) {
    return Boolean(allowedRecInputs.filter(value => input === value).length);
}
/**
 * "If the input is '0', return true, otherwise return false."
 *
 * The function isZero is a type guard. It takes an input of type allowedRecInput and returns a boolean
 * @param {allowedRecInput} input - allowedRecInput
 * @returns A function that takes an input of type allowedRecInput and returns a boolean.
 */
function isZero(input) {
    return input === '0';
}
// ------------- Language checker ------------- //
/**
 * If the input is not a valid character, or if the input is not a zero and the stack is empty,
 * or if the input is the last character and there are still zeros' left in the stack,
 * then the input is not valid,
 * @param {string} input - string - the input string to be verified
 * @returns A boolean value.
 */
function verifyLanguage(stack, input) {
    for (let i = 0, length = input.length; i < length; i++) {
        const currentCharacter = input[i];
        if (!isAllowedRecInput(currentCharacter) ||
            (!isZero(currentCharacter) && !stack.pop().removedItem) ||
            (i === length - 1 && stack.dataLength)) {
            console.log('Bad input');
            return false;
        }
        if (isZero(currentCharacter)) {
            stack.push(currentCharacter);
        }
    }
    return true;
}
// ----------------- Main ----------------- //
const testRecInputs = new Map([
    [1, '01'],
    [2, '000111'],
    [3, '00000001111111'],
    [4, '10'],
    [5, '00'],
    [6, '00111'],
    [7, '0101'],
]);
/* Iterating over the testRecInputs Map and calling the verifyLanguage function on each
value in the Map. */
const langStack = new languageStack();
testRecInputs.forEach((testString, testNumber) => {
    console.log(`testing test input #${testNumber}`);
    console.log(verifyLanguage(langStack, testString)
        ? '\nYes - Verification PASSED\n\n'
        : '\nNo - Verification FAILED\n\n');
    langStack.clear();
});
langStack.destroy();
//# sourceMappingURL=context-free-language-rec.js.map