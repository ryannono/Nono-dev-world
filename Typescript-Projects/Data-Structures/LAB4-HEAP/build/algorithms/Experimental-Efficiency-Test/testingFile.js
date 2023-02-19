"use strict";
// ---------------- imports ---------------- //
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const heap_sort_1 = require("../heap-sort");
const insertion_sort_1 = require("../insertion-sort");
const merge_sort_1 = require("../merge-sort");
const quick_sort_1 = require("../quick-sort");
const convert_array_to_csv_1 = require("convert-array-to-csv");
const CPURuntimeTestArrays = require("./CPURuntimeTestArrays.json");
// ------------- test functions ------------- //
/**
 * It takes a string as an argument and returns a function
 * @param {sortAlg} algorithm - The sorting algorithm to use.
 * @returns A function
 */
function chooseSortAlg(algorithm) {
    switch (algorithm) {
        case 'insertionSort':
            return insertion_sort_1.insertionSort;
        case 'heapSort':
            return heap_sort_1.heapSort;
        case 'mergeSort':
            return merge_sort_1.mergeSort;
        default:
            return quick_sort_1.quickSort;
    }
}
/**
 * It takes in a sorting algorithm, runs it on a collection of test arrays, and returns a table of the
 * results
 * @param {sortAlg} algorithm - sortAlg - This is the sorting algorithm that you want to test.
 * @returns An object with two properties: tableHeader and tableResults.
 */
function getTable(algorithm) {
    const tableHeader = ['Input Size', 'CPU Time (milliseconds)'];
    const tableResults = [];
    const testArrayCollection = JSON.parse(JSON.stringify(CPURuntimeTestArrays));
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
async function generateCSVString(algorithm) {
    // generate a table object from test results
    const table = getTable(algorithm);
    const header = table.tableHeader;
    const body = table.tableResults;
    // generate csv string from table
    const csvString = (0, convert_array_to_csv_1.convertArrayToCSV)(body, {
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
async function getTestResult(algorithm) {
    const csvString = await generateCSVString(algorithm);
    const filePath = `src/algorithms/Experimental-Efficiency-Test/CPURuntimeLogs/${algorithm}-CPURuntimeLog.csv`;
    (0, fs_1.writeFileSync)(filePath, csvString);
    return filePath;
}
// --------------- main --------------- //
getTestResult('insertionSort')
    .then(() => getTestResult('heapSort'))
    .then(() => getTestResult('mergeSort'))
    .then(() => getTestResult('quickSort'));
//# sourceMappingURL=testingFile.js.map