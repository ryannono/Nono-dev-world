//------------Numeric accessor Type------------//

export type NumKeyAccessor<T> = (element: T) => number;

//---------------Default accessor--------------//

/**
 * It takes an element and returns a number
 * @param {unknown} element - The element to be accessed.
 * @returns A function that takes an element and returns it as a number.
 */
export function defaultNumKeyAccessor(element: unknown) {
  return element as number;
}
