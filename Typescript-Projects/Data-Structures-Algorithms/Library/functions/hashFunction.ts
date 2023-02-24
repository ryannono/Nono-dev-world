//---------------Hash funtion Type------------//

export type HashFunction = (key: number, tableMaxSize: number) => number;

//-------------Default Hash funtion------------//

export function defaultHashFunction(key: number, tableMaxSize: number) {
  return key % tableMaxSize;
}
