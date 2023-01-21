/**
 * If the number of strings that start with the longest prefix plus one is equal to the number of
 * strings in the array, and the length of the longest prefix is less than the length of the first
 * string, then return true
 * @param {string[]} strs - the array of strings
 * @param {string} longestPrefix - the longest prefix that we've found so far
 * @param {number} fullLength - the length of the array of strings
 * @returns The longest common prefix of the array of strings.
 */
function goodFilterResult(
  strs: string[],
  longestPrefix: string,
  fullLength: number
) {
  return (
    strs.filter(string =>
      string.startsWith(strs[0].substring(0, longestPrefix.length + 1))
    ).length === fullLength && longestPrefix.length < strs[0].length
  );
}

/**
 * We start with an empty string, and then we add one character at a time to the string, and check if
 * all the strings in the array start with that string. If they do, we keep adding characters. If they
 * don't, we return the string we have so far
 * @param {string[]} strs - an array of strings
 * @returns The longest common prefix of all the strings in the array.
 */
function longestCommonPrefix(strs: string[]): string {
  let longestPrefix = '';
  const fullLength = strs.length;

  while (goodFilterResult(strs, longestPrefix, fullLength)) {
    longestPrefix += strs[0][longestPrefix.length];
  }

  return longestPrefix;
}

// ----------------- Main ----------------- //
type testInput = [string[], string];

/* It's creating a Map object with the test inputs. */
const testInputs = new Map<number, testInput>([
  [1, [['flower', 'flow', 'flight'], 'fl']],
  [2, [['dog', 'racecar', 'car'], '']],
  [3, [[''], '']],
]);

/* It's iterating over the test inputs and printing the results of the verification. */
testInputs.forEach((stringArray, testNumber) => {
  console.log(`testing test input #${testNumber}`);
  console.log(
    longestCommonPrefix(stringArray[0]) === stringArray[1]
      ? '\nVerification PASSED\n\n'
      : '\nVerification FAILED\n\n'
  );
});
