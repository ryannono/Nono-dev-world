/**
 * Return a random integer between min and max, inclusive.
 * @param {number} min - The minimum number that can be returned.
 * @param {number} max - The maximum number that can be returned.
 * @returns A random number between min and max.
 */
export function getRandomInt(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}
