// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');


 
// -----------------------------------------------------------------------------
// Input / Output helpers
// -----------------------------------------------------------------------------
 
// Reads an M x N matrix from the user, one row per line, values space-separated.
function readMatrix(rows, cols, label) {
  const matrix = [];
 
  for (let i = 0; i < rows; i++) {
    let row;
 
    while (true) {
      const line = readlineSync.question(`Enter row ${i + 1} of ${label}: `);
      row = line.trim().split(/\s+/).map(Number);
 
      if (row.length !== cols || row.some(Number.isNaN)) {
        console.log(`Please enter exactly ${cols} valid numbers separated by spaces.`);
      } else {
        break;
      }
    }
 
    matrix.push(row);
  }
 
  return matrix;
}
 
// Prompts for a positive integer dimension.
function readDimension(promptText) {
  let value;
 
  while (true) {
    value = Number(readlineSync.question(promptText));
 
    if (Number.isInteger(value) && value > 0) {
      break;
    }
 
    console.log("Please enter a positive whole number.");
  }
 
  return value;
}
 
// Displays a matrix in a neat, aligned grid.
function printMatrix(matrix) {
  const widest = Math.max(
    ...matrix.flat().map((value) => String(value).length)
  );
 
  for (const row of matrix) {
    const line = row.map((value) => String(value).padStart(widest)).join("  ");
    console.log(line);
  }
}
 
// -----------------------------------------------------------------------------
// Part A — Transpose
// -----------------------------------------------------------------------------
 
function transposeMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];
 
  for (let c = 0; c < cols; c++) {
    const newRow = [];
 
    for (let r = 0; r < rows; r++) {
      newRow.push(matrix[r][c]);
    }
 
    result.push(newRow);
  }
 
  return result;
}
 
function runTranspose() {
  const rows = readDimension("Enter number of rows: ");
  const cols = readDimension("Enter number of columns: ");
  const matrix = readMatrix(rows, cols, "the matrix");
 
  console.log("\nOriginal Matrix:");
  printMatrix(matrix);
 
  console.log("\nTransposed Matrix:");
  printMatrix(transposeMatrix(matrix));
}
 
// -----------------------------------------------------------------------------
// Part B — Addition
// -----------------------------------------------------------------------------
 
function addMatrices(a, b) {
  const rows = a.length;
  const cols = a[0].length;
  const result = [];
 
  for (let r = 0; r < rows; r++) {
    const newRow = [];
 
    for (let c = 0; c < cols; c++) {
      newRow.push(a[r][c] + b[r][c]);
    }
 
    result.push(newRow);
  }
 
  return result;
}
 
function runAddition() {
  const rows = readDimension("Enter number of rows: ");
  const cols = readDimension("Enter number of columns: ");
 
  console.log("\n-- Matrix A --");
  const a = readMatrix(rows, cols, "Matrix A");
 
  console.log("\n-- Matrix B --");
  const b = readMatrix(rows, cols, "Matrix B");
 
  console.log("\nMatrix A:");
  printMatrix(a);
 
  console.log("\nMatrix B:");
  printMatrix(b);
 
  console.log("\nA + B:");
  printMatrix(addMatrices(a, b));
}
 
// -----------------------------------------------------------------------------
// Part C — Multiplication
// -----------------------------------------------------------------------------
 
function multiplyMatrices(a, b) {
  const rowsA = a.length;
  const colsA = a[0].length;
  const colsB = b[0].length;
  const result = [];
 
  for (let r = 0; r < rowsA; r++) {
    const newRow = [];
 
    for (let c = 0; c < colsB; c++) {
      let sum = 0;
 
      for (let k = 0; k < colsA; k++) {
        sum += a[r][k] * b[k][c];
      }
 
      newRow.push(sum);
    }
 
    result.push(newRow);
  }
 
  return result;
}
 
function runMultiplication() {
  const rowsA = readDimension("Enter number of rows for Matrix A: ");
  const colsA = readDimension("Enter number of columns for Matrix A (= rows of Matrix B): ");
  const colsB = readDimension("Enter number of columns for Matrix B: ");
 
  console.log("\n-- Matrix A --");
  const a = readMatrix(rowsA, colsA, "Matrix A");
 
  console.log("\n-- Matrix B --");
  const b = readMatrix(colsA, colsB, "Matrix B");
 
  console.log("\nMatrix A:");
  printMatrix(a);
 
  console.log("\nMatrix B:");
  printMatrix(b);
 
  console.log("\nA x B:");
  printMatrix(multiplyMatrices(a, b));
}
 
// -----------------------------------------------------------------------------
// Main menu
// -----------------------------------------------------------------------------
 
function main() {
  console.log("Matrix Operations");
  console.log("1. Transpose a matrix");
  console.log("2. Add two matrices");
  console.log("3. Multiply two matrices");
 
  const choice = readlineSync.question("Choose an option (1-3): ").trim();
 
  if (choice === "1") {
    runTranspose();
  } else if (choice === "2") {
    runAddition();
  } else if (choice === "3") {
    runMultiplication();
  } else {
    console.log("Invalid choice. Please run the program again and enter 1, 2, or 3.");
  }
}
 
main();
 