"use strict";
// ---------------- heapSort ---------------- //
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCSVFile = void 0;
const heapSort_1 = require("./algorithms/heapSort");
const convert_array_to_csv_1 = require("convert-array-to-csv");
const fs = require('fs');
// --------------- generators --------------- //
function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
function getRandomArray(size) {
    const array = new Array(size);
    for (let k = 0; k < array.length; k++) {
        array[k] = getRandomArbitrary(0, size);
    }
    return array;
}
function getTable() {
    const tableHeader = ['Input Size', 'CPU Time (milliseconds)'];
    const tableResults = [];
    let i = 8;
    while (i <= 2 ** 20) {
        const array = getRandomArray(i);
        const startTime = new Date().getTime();
        (0, heapSort_1.heapSort)(array);
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
async function generateCSVString() {
    // generate a table object from all license pages
    const table = getTable();
    const header = table.tableHeader;
    const body = table.tableResults;
    // generate csv string from table
    const csvString = (0, convert_array_to_csv_1.convertArrayToCSV)(body, {
        header: header,
        separator: ',',
    });
    return csvString;
}
async function generateCSVFile() {
    const csvString = await generateCSVString();
    const filePath = 'CPURuntimeLog.csv';
    fs.writeFileSync(filePath, csvString);
    return filePath;
}
exports.generateCSVFile = generateCSVFile;
generateCSVFile();
//# sourceMappingURL=heapSortTest.js.map