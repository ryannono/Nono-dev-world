/**
 * Given an array of weights and a number of days, return the minimum capacity of a ship that can carry
 * all the weights within the given number of days.
 * @param {number[]} weights - an array of integers representing the weight of each package
 * @param {number} days - the number of days that the ship can travel
 */
function shipWithinDays(weights: number[], days: number): number {
  if (days === 1) {
    return weights.reduce((total, weight) => total + weight, 0);
  }

  

  return Math.max(...dailyWeight);
}

console.log(
  shipWithinDays(
    [
      180, 373, 75, 82, 497, 23, 303, 299, 53, 426, 152, 314, 206, 433, 283,
      370, 179, 254, 265, 431, 453, 17, 189, 224,
    ],
    12
  )
);
