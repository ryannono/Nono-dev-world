export declare type NumKeyAccessor<T> = (element: T) => number;
/**
 * It takes an element and returns a number
 * @param {unknown} element - The element to be accessed.
 * @returns A function that takes an element and returns it as a number.
 */
export declare function defaultNumKeyAccessor(element: unknown): number;
