// ------------------- Stack ------------------- //

/*
 * It's a class that creates a stack data structure
 */
export class ArrayStack<T> {
  private data: T[];
  private dataLength: number;

  constructor() {
    this.data = [];
    this.dataLength = 0;
  }

  /**
   * The print() function is a method of the class, and it has access to the data property of the class
   */
  print() {
    console.log(this.data);
  }

  /**
   * The push function takes an item of type T and adds it to the end of the array, returning the new
   * length of the array.
   * @param {T} item - The item to be added to the end of the array.
   * @returns The length of the array.
   */
  push(item: T) {
    this.data[this.dataLength++] = item;
    return this.dataLength;
  }

  /**
   * If the stack is empty, return null, otherwise return the last element in the array and decrement the
   * dataLength property
   * @returns The last element in the array.
   */
  pop() {
    if (this.isEmpty()) return null;
    return this.data[--this.dataLength];
  }

  /**
   * It returns the last element in the array
   * @returns The last element in the array.
   */
  top() {
    if (this.isEmpty()) return null;
    return this.data[this.dataLength - 1];
  }

  /**
   * It returns the length of the data array
   * @returns The size of the data array.
   */
  size() {
    return this.dataLength;
  }

  /**
   * Return true if the dataLength property is falsy, otherwise return false.
   * @returns The return value is a boolean.
   */
  isEmpty() {
    return !this.dataLength;
  }

  /**
   * It clears the array by setting the dataLength property to 0
   */
  clear() {
    this.dataLength = 0;
  }

  /**
   * It sets the data array to an empty array and sets the dataLength to 0
   */
  destroy() {
    this.data = [];
    this.dataLength = 0;
  }
}
