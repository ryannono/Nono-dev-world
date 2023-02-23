"use strict";
function substract(minuend, subtrahend, count) {
    minuend -= subtrahend * count;
    if (minuend >= subtrahend)
        return 'increase';
    if (minuend < 0)
        return 'decrease';
    return 'good';
}
function divide(dividend, divisor) {
    const isNegative = dividend !== 0 &&
        ((dividend < 0 && divisor > 0) || (divisor < 0 && dividend > 0));
    dividend = Math.abs(dividend);
    divisor = Math.abs(divisor);
    if (divisor > dividend)
        return 0;
    let count = 0;
    let i = 0;
    while ((i += divisor) < dividend + 1 && ++count)
        ;
    if (isNegative) {
        return count > 2147483648 ? -2147483648 : -count;
    }
    else {
        return count > 2147483647 ? 2147483647 : count;
    }
}
console.log(divide(12332535, 1));
//# sourceMappingURL=divide.js.map