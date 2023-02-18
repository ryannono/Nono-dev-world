// ---------------- imports ---------------- //

import {writeFileSync} from 'fs';
import {heapSort} from '../heapSort';
import {insertionSort} from '../insertion-sort';
import {mergeSort} from '../merge-sort';
import {quickSort} from '../quick-sort';
import {convertArrayToCSV} from 'convert-array-to-csv';
import * as CPURuntimeTestArrays from './CPURuntimeTestArrays.json';

// ------------------ type ------------------ //

type sortAlg = 'heapSort' | 'insertionSort' | 'mergeSort' | 'quickSort';

// ------------- test functions ------------- //

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

async function generateCSVString(algorithm: sortAlg): Promise<string> {
  // generate a table object from all license pages
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
