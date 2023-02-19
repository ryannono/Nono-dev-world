// ---------------- imports ---------------- //

import {writeFileSync} from 'fs';
import {heapSort, heapSortOOP} from '../heap-sort';
import {insertionSort} from '../insertion-sort';
import {mergeSort} from '../merge-sort';
import {quickSort} from '../quick-sort';
import {convertArrayToCSV} from 'convert-array-to-csv';
import * as CPURuntimeTestArrays from './CPURuntimeTestArrays.json';

// ------------------ type ------------------ //

type sortAlg = 'heapSort' | 'insertionSort' | 'mergeSort' | 'quickSort';

// ------------- test functions ------------- //

/**
 * It takes a string as an argument and returns a function
 * @param {sortAlg} algorithm - The sorting algorithm to use.
 * @returns A function
 */
function chooseSortAlg(algorithm: sortAlg) {
  switch (algorithm) {
    case 'insertionSort':
      return insertionSort;

    case 'heapSort':
      return heapSort;

    case 'mergeSort':
      return mergeSort;

    default:
      return quickSort;
  }
}

/**
 * It takes in a sorting algorithm, runs it on a collection of test arrays, and returns a table of the
 * results
 * @param {sortAlg} algorithm - sortAlg - This is the sorting algorithm that you want to test.
 * @returns An object with two properties: tableHeader and tableResults.
 */
function getTable(algorithm: sortAlg) {
  const tableHeader = ['Input Size', 'CPU Time (milliseconds)'];
  const tableResults: string[][] = [];
  const testArrayCollection: number[][] = JSON.parse(
    JSON.stringify(CPURuntimeTestArrays)
  );

  console.log(tableHeader);
  testArrayCollection.forEach(array => {
    const sortingAlg = chooseSortAlg(algorithm);
    const inputSize = array.length;

    const startTime = new Date().getTime();
    sortingAlg(array);
    const endTime = new Date().getTime();

    const result = [String(inputSize), String(endTime - startTime)];
    console.log(result);
    tableResults.push(result);
  });

  return {
    tableHeader,
    tableResults,
  };
}

/**
 * It takes in a sorting algorithm, generates a table object from test results, converts the table
 * object to a csv string, and returns the csv string
 * @param {sortAlg} algorithm - sortAlg - the sorting algorithm to test
 * @returns A string of the csv file
 */
async function generateCSVString(algorithm: sortAlg): Promise<string> {
  // generate a table object from test results
  const table = getTable(algorithm);
  const header: string[] = table.tableHeader;
  const body: string[][] = table.tableResults;

  // generate csv string from table
  const csvString: string = convertArrayToCSV(body, {
    header: header,
    separator: ',',
  });

  return csvString;
}

/**
 * It generates a CSV file containing the CPU runtime of the algorithm for each input size
 * @param {sortAlg} algorithm - The sorting algorithm to test.
 * @returns A promise that resolves to a string.
 */
async function getTestResult(algorithm: sortAlg): Promise<string> {
  const csvString = await generateCSVString(algorithm);
  const filePath = `src/algorithms/Experimental-Efficiency-Test/CPURuntimeLogs/${algorithm}-CPURuntimeLog.csv`;

  writeFileSync(filePath, csvString);
  return filePath;
}

// --------------- main --------------- //

getTestResult('insertionSort')
  .then(() => getTestResult('heapSort'))
  .then(() => getTestResult('mergeSort'))
  .then(() => getTestResult('quickSort'));
