"use strict";
/**
 * Given an array of weights and a number of days, return the minimum capacity of a ship that can carry
 * all the weights within the given number of days.
 * @param {number[]} weights - an array of integers representing the weight of each package
 * @param {number} days - the number of days that the ship can travel
 */
function shipWithinDays(weights, days) {
    if (days === 1) {
        return weights.reduce((total, weight) => total + weight, 0);
    }
    const totalWeight = weights.reduce((total, weight) => total + weight, 0);
    const avgWeight = totalWeight / days;
    const numWeights = weights.length;
    console.log(avgWeight);
    const standardDeviation = Math.sqrt(weights.reduce((total, weight) => total + Math.pow(weight - totalWeight / numWeights, 2), 0) / numWeights);
    console.log(standardDeviation);
    const dailyWeight = [];
    for (let dayIndex = 0, weightIndex = 0; dayIndex < days; dayIndex++) {
        let weightsLeft = numWeights - (weightIndex + 1);
        const daysLeft = days - (dayIndex + 1);
        if (dailyWeight[dayIndex] === undefined) {
            dailyWeight[dayIndex] = weights[weightIndex++];
        }
        if (dailyWeight[dayIndex] < avgWeight) {
            while ((dailyWeight[dayIndex] < avgWeight - standardDeviation &&
                dailyWeight[dayIndex] + weights[weightIndex] <
                    totalWeight / numWeights + standardDeviation &&
                weightsLeft > daysLeft) ||
                (weightsLeft && !daysLeft)) {
                weightsLeft--;
                dailyWeight[dayIndex] += weights[weightIndex++];
            }
        }
        console.log(weightsLeft, daysLeft);
    }
    console.log(dailyWeight);
    return Math.max(...dailyWeight);
}
console.log(shipWithinDays([
    180, 373, 75, 82, 497, 23, 303, 299, 53, 426, 152, 314, 206, 433, 283,
    370, 179, 254, 265, 431, 453, 17, 189, 224,
], 12));
//# sourceMappingURL=weight.js.map