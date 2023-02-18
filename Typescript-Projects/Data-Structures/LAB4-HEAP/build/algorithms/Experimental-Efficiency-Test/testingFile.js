"use strict";
// ---------------- imports ---------------- //
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const heapSort_1 = require("../heapSort");
const insertion_sort_1 = require("../insertion-sort");
const merge_sort_1 = require("../merge-sort");
const quick_sort_1 = require("../quick-sort");
const convert_array_to_csv_1 = require("convert-array-to-csv");
const CPURuntimeTestArrays = require("./CPURuntimeTestArrays.json");
// ------------- test functions ------------- //
function chooseSortAlg(algorithm) {
    switch (algorithm) {
        case 'insertionSort':
            return insertion_sort_1.insertionSort;
        case 'heapSort':
            return heapSort_1.heapSort;
        case 'mergeSort':
            return merge_sort_1.mergeSort;
        default:
            return quick_sort_1.quickSort;
    }
}
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
async function generateCSVString(algorithm) {
    // generate a table object from all license pages
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