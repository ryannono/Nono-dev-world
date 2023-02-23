"use strict";
/**
 * It returns true if the length of the array is equal to the size of the set of the array
 * @param {string[]} sudokuLine - string[] - an array of strings, each string representing a row or
 * column in the sudoku
 * @returns A boolean value.
 */
function isHorizontallyCorrect(sudokuLine) {
    const horizontalSet = new Set();
    sudokuLine = sudokuLine.filter(val => {
        if (val !== '.') {
            horizontalSet.add(val);
            return true;
        }
        return false;
    });
    return sudokuLine.length === horizontalSet.size;
}
/**
 * We're going to loop through each row in the column we're checking, and if we find a duplicate, we'll
 * return false
 * @param {string[][]} sudokuBoard - The sudoku board that we're checking.
 * @param {number} columnToCheck - The column index that we want to check.
 * @returns A boolean value.
 */
function isVerticallyCorrect(sudokuBoard, columnToCheck) {
    const verticalSet = new Set();
    for (const row of sudokuBoard) {
        const currentElement = row[columnToCheck];
        if (verticalSet.has(currentElement))
            return false;
        if (currentElement !== '.')
            verticalSet.add(currentElement);
    }
    return true;
}
/**
 * It takes a board, a column index, and a row index, and returns a subgrid of the board
 * @param {string[][]} board - the board we're checking
 * @param {number} columnIndex - 0, 1, 2
 * @param {number} rowIndex - 0, 1, 2
 * @returns An array of 9 elements, each element is a string.
 */
function generateSubgrid(board, columnIndex, rowIndex) {
    const subgrid = [];
    while (subgrid.length < 9) {
        subgrid.push(board[columnIndex][rowIndex + subgrid.length / 3], board[columnIndex + 1][rowIndex + subgrid.length / 3], board[columnIndex + 2][rowIndex + subgrid.length / 3]);
    }
    return subgrid;
}
/**
 * It generates subgrids, filters out the '.' characters, and checks if the length of the subgrid is
 * equal to the size of the set of the subgrid
 * @param {string[][]} board - the sudoku board
 * @returns A boolean value.
 */
function subgridsAreCorrect(board) {
    const subgridSet = new Set();
    for (let columnIndex = 0, numColumn = board.length; columnIndex < numColumn; columnIndex += 3) {
        for (let rowIndex = 0, numRows = numColumn; rowIndex < numRows; rowIndex += 3) {
            const subgrid = generateSubgrid(board, columnIndex, rowIndex).filter(val => {
                if (val !== '.') {
                    subgridSet.add(val);
                    return true;
                }
                return false;
            });
            if (subgrid.length !== subgridSet.size)
                return false;
            subgridSet.clear();
        }
    }
    return true;
}
/**
 * We check that each row, column, and subgrid is correct
 * @param {string[][]} board - the sudoku board
 * @returns A boolean value.
 */
function isValidSudoku(board) {
    for (const row of board) {
        if (!isHorizontallyCorrect(row))
            return false;
    }
    for (let columnIndex = 0, numColumns = board[0].length; columnIndex < numColumns; columnIndex++) {
        if (!isVerticallyCorrect(board, columnIndex))
            return false;
    }
    return subgridsAreCorrect(board);
}
const testInputs = new Map([
    [
        1,
        [
            [
                ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
                ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
                ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
                ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
                ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
                ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
                ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
                ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
                ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
            ],
            true,
        ],
    ],
    [
        2,
        [
            [
                ['.', '.', '.', '.', '5', '.', '.', '1', '.'],
                ['.', '4', '.', '3', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '3', '.', '.', '1'],
                ['8', '.', '.', '.', '.', '.', '.', '2', '.'],
                ['.', '.', '2', '.', '7', '.', '.', '.', '.'],
                ['.', '1', '5', '.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '2', '.', '.', '.'],
                ['.', '2', '.', '9', '.', '.', '.', '.', '.'],
                ['.', '.', '4', '.', '.', '.', '.', '.', '.'],
            ],
            false,
        ],
    ],
]);
testInputs.forEach((testInput, key) => {
    console.log(`Testing test input #${key}`);
    console.log(`Result: ${isValidSudoku(testInput[0]) === testInput[1] ? 'Passed\n' : 'Failed\n'}`);
});
//# sourceMappingURL=sudoku.js.map