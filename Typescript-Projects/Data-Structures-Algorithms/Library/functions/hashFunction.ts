//---------------Hash funtion Type------------//

export type HashFunction = (key: number, hashConstant: number) => number;

//-------------Default Hash funtion------------//

export function defaultHashFunction(key: number, hashConstant: number) {
  return key % hashConstant;
}
