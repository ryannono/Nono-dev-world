export declare type Comparator<T> = (element1: T, element2: T) => -1 | 0 | 1;
/**
 * It returns 1 if the first element is greater than the second, 0 if they're equal, and -1 if the
 * first element is less than the second
 * @param {T} element1 - The first element to compare.
 * @param {T} element2 - The element to compare against.
 * @returns A function that takes two arguments and returns a number.
 */
export declare function defaultComparator<T>(element1: T, element2: T): 1 | 0 | -1;
