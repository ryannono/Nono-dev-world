// ---------------- swap ---------------- //

function swap<T>(array: T[], index1: number, index2: number) {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}

// -------------- quickSort ------------- //

function partition<T>(array: T[], leftIndex: number, rightIndex: number) {
  let smallerThanPivotIndex = leftIndex - 1;

  for (let i = leftIndex, pivot = array[rightIndex]; i < rightIndex; i++) {
    if (array[i] < pivot) {
      swap(array, i, ++smallerThanPivotIndex);
    }
  }

  swap(array, rightIndex, smallerThanPivotIndex + 1);

  return smallerThanPivotIndex + 1;
}

function quickSort<T>(
  array: T[],
  leftIndex = 0,
  rightIndex = array.length - 1
) {
  if (leftIndex >= rightIndex) return array;

  const pivotIndex = partition(array, leftIndex, rightIndex);

  quickSort(array, leftIndex, pivotIndex - 1);
  quickSort(array, pivotIndex + 1, rightIndex);

  return array;
}

// -------------- quickSort ------------- //

function insertionSort<T>(array: T[], unsortedStart = 1) {
  for (let length = array.length; unsortedStart < length; unsortedStart++) {
    let currElementIndex = unsortedStart;
    let sortedIndex = unsortedStart - 1;

    while (sortedIndex >= 0 && array[sortedIndex] > array[currElementIndex]) {
      swap(array, sortedIndex, currElementIndex);
      currElementIndex = sortedIndex--;
    }
  }

  return array;
}

// -------------- threeSum ------------- //

function threeSum(nums: number[]): number[][] {
  const confirmedTriplets: number[][] = [];

  const fullLength = nums.length;
  quickSort(nums, 0, fullLength - 1);
  let num1, num2, num3, sum;
  for (
    let num1Index = 0, length = fullLength - 2;
    (num1 = nums[num1Index]) * 3 <= 0 && num1Index < length;
    num1Index++
  ) {
    if (num1Index === 0 || num1 !== nums[num1Index - 1]) {
      for (
        let num2Index = num1Index + 1, length = fullLength - 1;
        num1 + (num2 = nums[num2Index]) * 2 <= 0 && num2Index < length;
        num2Index++
      ) {
        if (num2Index === num1Index + 1 || num2 !== nums[num2Index - 1]) {
          for (
            let num3Index = num2Index + 1, length = fullLength;
            num3Index < length;
            num3Index++
          ) {
            num3 = nums[num3Index];
            if (num3Index === num2Index + 1 || num3 !== nums[num3Index - 1]) {
              sum = num1 + num2 + num3;
              if (sum === 0) confirmedTriplets.push([num1, num2, num3]);
              if (sum > 0) break;
            }
          }
        }
      }
    }
  }

  return confirmedTriplets;
}

const x = [-1, 0, 1, 2, -1, -4];
console.log(threeSum(x));
