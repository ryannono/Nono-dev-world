/* eslint-disable node/no-unsupported-features/es-builtins */

/* PROMPT: Read in and ignore any leading whitespace.
Check if the next character (if not already at the end of the string)
is '-' or '+'. Read this character in if it is either. This determines
if the final result is negative or positive respectively. Assume the result is
positive if neither is present. Read in next the characters until the next
non-digit character or the end of the input is reached. The rest of the string is ignored.
Convert these digits into an integer (i.e. "123" -> 123, "0032" -> 32).
If no digits were read, then the integer is 0. Change the sign as necessary (from step 2).
If the integer is out of the 32-bit signed integer range [-231, 231 - 1],
then clamp the integer so that it remains in the range. Specifically, integers less than
-231 should be clamped to -231, and integers greater than 231 - 1 should be clamped to 231 - 1.
Return the integer as the final result. */

/**
 * If the character is not equal to 0 and the character is not a number, return false, otherwise return
 * true.
 * @param {string} character - The character to be checked.
 * @returns true or false
 */
/**
 * If the character is not equal to 0 and the character is not a number, return false, otherwise return
 * true.
 * @param {string} character - The character to be checked.
 * @returns true or false
 */
function isDigit(character: string) {
  if (character !== '0' && !Number(character)) return false;
  return true;
}

/**
 * If the character is a plus or minus sign, return true, otherwise return false.
 * @param {string} character - The character to check if it's an operation.
 * @returns a boolean value.
 */
function isOperation(character: string) {
  if (character === '+' || character === '-') return true;
  return false;
}

/**
 * It takes a string, removes all non-numeric characters from the beginning, then converts the
 * remaining characters to a number, and returns that number
 * @param {string} string - the string to parse
 * @returns the integer value of a string.
 */
function getInt(string: string) {
  string = string.trim();

  let cleanString = '';
  for (const character of string) {
    if (!cleanString.length && !isDigit(character) && !isOperation(character)) {
      break;
    }
    if (cleanString.length && !isDigit(character)) break;
    cleanString += character;
  }

  let int;
  if (isOperation(cleanString[0])) {
    int = BigInt(cleanString.substring(1));
    if (cleanString[0] === '-') int = -int;
  } else int = BigInt(cleanString);

  const min = (-2) ** 31;
  const max = 2 ** 31 - 1;

  if (int < min) return min;
  if (int > max) return max;
  return int;
}

/* It's calling the getInt function and passing in the string '21474836460' as an argument. */
console.log(getInt('21474836460'));
