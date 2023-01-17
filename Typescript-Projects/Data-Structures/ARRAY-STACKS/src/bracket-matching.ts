/* PROMPT: Using your favorite programming language (Java is suggested), design and implement
a stack on an array. Implement the following operations: push, pop, top, size, isEmpty. Make sure
that your program checks whether the stack is full in the push operation, and whether the
stack is empty in the pop operation. */

// ------------------- Enums ------------------- //
const bracketTypes = {
  openBrackets: ['(', '[', '{'],
  closeBrackets: [')', ']', '}'],
} as const;
const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] as const;
const operations = ['+', '-', '*', '/'] as const;
const allowedInputs = [
  ...bracketTypes.openBrackets,
  ...bracketTypes.closeBrackets,
  ...digits,
  ...operations,
] as const;

// --------------- Types to verify -------------- //
type allowedInput = (typeof allowedInputs)[number];
type openBracket = (typeof bracketTypes.openBrackets)[number];
type closeBracket = (typeof bracketTypes.closeBrackets)[number];

// ------------------- Stack ------------------- //
class Stack {
  data: openBracket[];
  dataLength: number;

  constructor() {
    this.data = [];
    this.dataLength = 0;
  }

  /**
   * The function takes an item of type openBracket and adds it to the end of the data array
   * @param {openBracket} item - openBracket
   * @returns The length of the array.
   */
  push(item: openBracket) {
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
}

//-------- Type guards & helper functions ------ //
/**
 * "If the input is in the allowedInputs array, return true, otherwise return false."
 *
 * The function isAllowedInput takes a string as an argument and returns a boolean
 * @param {string} input - The input that the user has entered.
 * @returns A boolean value.
 */
function isAllowedInput(input: string): input is allowedInput {
  return Boolean(allowedInputs.filter(value => input === value).length);
}

/**
 * If the character is in the openBrackets array, return true, otherwise return false.
 * @param {allowedInput} character - allowedInput - This is the parameter that we're passing into the
 * function. It's a union type of all the allowed inputs.
 * @returns A boolean value.
 */
function isOpenBracket(character: allowedInput): character is openBracket {
  return Boolean(
    bracketTypes.openBrackets.filter(value => character === value).length
  );
}

/**
 * "If the character is in the array of close brackets, return true, otherwise return false."
 *
 * The function isCloseBracket takes a parameter of type allowedInput. The allowedInput type is a union
 * of the openBracket and closeBracket types
 * @param {allowedInput} character - allowedInput - This is the parameter that we're passing into the
 * function. It's a union type of all the allowed inputs.
 * @returns A boolean value.
 */
function isCloseBracket(character: allowedInput): character is closeBracket {
  return Boolean(
    bracketTypes.closeBrackets.filter(value => character === value).length
  );
}

/**
 * It takes two parameters, one of which is an open bracket and the other is a close bracket, and
 * returns true if the two brackets are of the same type
 * @param {openBracket} openBracket - The open bracket that we're checking against the close bracket.
 * @param {closeBracket} closeBracket - closeBracket
 * @returns A boolean value.
 */
function isSameType(
  openBracket: openBracket,
  closeBracket: closeBracket
): boolean {
  return (
    bracketTypes.openBrackets.indexOf(openBracket) ===
    bracketTypes.closeBrackets.indexOf(closeBracket)
  );
}

// -------------- Bracket checker -------------- //
/**
 * If the input is not allowed, or if the input is a closing bracket that doesn't match the last
 * opening bracket, or if the input is the last character and there are still opening brackets left,
 * then the input is bad. Otherwise, the input is good
 * @param {string} input - string - the string to be verified
 * @returns A boolean value.
 */
function verifyBrackets(input: string) {
  const stack = new Stack();

  for (let i = 0, length = input.length; i < length; i++) {
    const currentCharacter = input[i];
    if (
      !isAllowedInput(currentCharacter) ||
      (isCloseBracket(currentCharacter) &&
        !isSameType(stack.pop().removedItem, currentCharacter)) ||
      (i === length - 1 && stack.dataLength)
    ) {
      console.log('Bad input');
      return false;
    }
    if (isOpenBracket(currentCharacter)) {
      stack.push(currentCharacter);
    }
  }
  return true;
}

// ----------------- Main ----------------- //
const testInputs = new Map([
  [1, '(9*[3*{[(3+3)/5]*7}])'],
  [2, '{3*(2+[3-[4/[6/9]]]})'],
  [3, '((3*(9-(4*(6-5))))'],
  [4, '{2-{3*{6/[[[(((9-0)))]]]}}/7}'],
]);

/* It's iterating through the testInputs Map and running the verifyBrackets function on each
value. */
testInputs.forEach((testString, testNumber) => {
  console.log(`testing test input #${testNumber}`);
  console.log(
    verifyBrackets(testString)
      ? '\nVerification PASSED\n\n'
      : '\nVerification FAILED\n\n'
  );
});
