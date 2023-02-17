// ---------------- heapSort ---------------- //

import {heapSort} from './algorithms/heapSort';
import {convertArrayToCSV} from 'convert-array-to-csv';
const fs = require('fs');

// --------------- generators --------------- //

function getRandomArbitrary(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomArray(size: number) {
  const array = new Array(size);
  for (let k = 0; k < array.length; k++) {
    array[k] = getRandomArbitrary(0, size);
  }
  return array;
}

function getTable() {
  const tableHeader = ['Input Size', 'CPU Time (milliseconds)'];
  const tableResults: string[][] = [];

  let i = 8;
  while (i <= 2 ** 20) {
    const array = getRandomArray(i);
    const startTime = new Date().getTime();
    heapSort(array);
    const endTime = new Date().getTime();
    const result = [String(i), String(endTime - startTime)];
    tableResults.push(result);
    i *= 2;
  }

  return {
    tableHeader,
    tableResults,
  };
}

async function generateCSVString(): Promise<string> {
  // generate a table object from all license pages
  const table = getTable();
  const header: string[] = table.tableHeader;
  const body: string[][] = table.tableResults;

  // generate csv string from table
  const csvString: string = convertArrayToCSV(body, {
    header: header,
    separator: ',',
  });

  return csvString;
}

export async function generateCSVFile(): Promise<string> {
  const csvString = await generateCSVString();
  const filePath = 'CPURuntimeLog.csv';

  fs.writeFileSync(filePath, csvString);
  return filePath;
}

generateCSVFile();
