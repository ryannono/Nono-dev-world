"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomInt = void 0;
/**
 * Return a random integer between min and max, inclusive.
 * @param {number} min - The minimum number that can be returned.
 * @param {number} max - The maximum number that can be returned.
 * @returns A random number between min and max.
 */
function getRandomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
exports.getRandomInt = getRandomInt;
//# sourceMappingURL=getRandomInt.js.map