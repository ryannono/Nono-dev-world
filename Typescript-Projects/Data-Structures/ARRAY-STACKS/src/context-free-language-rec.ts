// ------------------- Stack ------------------- //

import {Stack} from './Stack';

//----------------- Type guard ----------------- //

/**
 * "If the character is '0' or '1', then it is a allowed."
 *
 * The function isAllowedCharacter is a predicate function. It returns true or false
 * @param {string} character - string - This is the parameter that we're going to pass into the
 * function.
 * @returns A function that takes a string and returns a boolean.
 */
function isAllowedCharacter(character: string): character is '0' | '1' {
  return character === '0' || character === '1';
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
function verifyLanguage(input: string) {
  const stack = new Stack<'0'>();

  for (
    let i = 0, length = input.length, lastIndex = length - 1;
    i < length;
    i++
  ) {
    const currentCharacter = input[i];

    if (
      !isAllowedCharacter(currentCharacter) ||
      (i === lastIndex && currentCharacter === '0') ||
      (currentCharacter === '1' && !stack.pop())
    ) {
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
  console.log(
    verifyLanguage(testString)
      ? '\nYes - Verification PASSED\n\n'
      : '\nNo - Verification FAILED\n\n'
  );
});
