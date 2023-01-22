// -------------- Loop ---------------- //

/**
 * We iterate through the array, and if we see a duplicate, we remove it
 * @param {number[]} nums - array we want to remove duplicates from
 * @returns The length of the array after removing duplicates.
 */
function removeDuplicates(nums: number[]): number {
  let lastSeenDigit = nums[0],
    length = nums.length;
  for (let i = 1; i < length; lastSeenDigit = nums[i], i++) {
    while (nums[i] === lastSeenDigit) {
      nums.splice(i, 1);
      length--;
    }
  }
  return length;
}

// -------- Method implementation ------- //

/**
 * We iterate through the array, and for each element, we remove all the duplicates of that element
 * @param {number[]} nums - array we want to remove duplicates from
 * @returns The length of the array after removing duplicates.
 */
function removeDuplicates1(nums: number[]): number {
  for (let i = 0; i < nums.length - 1; i++) {
    nums.splice(
      i,
      nums.reduce((prev, val) => prev + (val === nums[i] ? 1 : 0), -1)
    );
  }
  return nums.length;
}

// ----------------- Main ----------------- //

/* It's creating a Map object with the test inputs. */
const testInputs = new Map<number, [number[], number]>([
  [1, [[1, 1, 2], 2]],
  [2, [[0, 0, 1, 1, 1, 2, 2, 3, 3, 4], 5]],
  [3, [[1, 1], 1]],
  [4, [[0, 0, 0, 0, 3], 2]],
]);

/* It's iterating over the test inputs and printing the results of the verification. */
testInputs.forEach((numberArray, testNumber) => {
  console.log(`testing test input #${testNumber}`);
  console.log(
    removeDuplicates(numberArray[0]) === numberArray[1]
      ? '\nVerification PASSED'
      : '\nVerification FAILED'
  );
  console.log(
    removeDuplicates1(numberArray[0]) === numberArray[1]
      ? '\nVerification PASSED\n\n'
      : '\nVerification FAILED\n\n'
  );
});
