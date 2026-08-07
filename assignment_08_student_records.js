// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 8
// =============================================================================
//
// TASK: Student Record Management System
//
// Build a console-based program that stores and manages student information.
// Each student is represented as a JavaScript object containing:
//
//   - name   : the student's full name  (string)
//   - id     : a unique student ID number (number, e.g. 20240001)
//   - scores : an array of scores from multiple assessments (e.g. [75, 88, 90])
//
// Example object:
//   { name: "Alice Mensah", id: 20240001, scores: [78, 85, 90] }
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_08_student_records.js
//
// -----------------------------------------------------------------------------
// FEATURES YOUR PROGRAM MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Add a Student
//      - Ask the user to enter the student's name and ID.
//      - Ask how many scores to enter, then collect each score one by one.
//      - Save the student object and confirm it was added.
//
//   2. Display All Students
//      - Print a formatted table showing every student's:
//          Name, ID, individual scores, and their average score.
//      - If no students have been added yet, print a message saying so.
//
//   3. Calculate Average Score for a Specific Student
//      - Ask the user to enter a student ID.
//      - Find the student and print their average score.
//      - If the ID is not found, print an error message.
//
//   4. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ================================
//      STUDENT RECORD SYSTEM MENU
//   ================================
//   1. Add student
//   2. Display all students
//   3. Calculate average score
//   4. Quit
//   Enter your choice (1-4):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Enter your choice (1-4): 1
//   Student name: Alice Mensah
//   Student ID: 20240001
//   How many scores? 3
//   Enter score 1: 78
//   Enter score 2: 85
//   Enter score 3: 90
//   Student "Alice Mensah" added successfully.
//
//   Enter your choice (1-4): 3
//   Enter student ID: 20240001
//   Alice Mensah's average score: 84.33
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Store all student records in an array of objects.
// - Average scores must be displayed to 2 decimal places (use .toFixed(2)).
// - Each feature MUST be in its own function (see scaffold below).
// - Handle invalid menu choices and missing student IDs gracefully.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================



let students = [];
 
// -----------------------------------------------------------------------------
// Menu display
// -----------------------------------------------------------------------------
 
function printMenu() {
  console.log("\n================================");
  console.log("   STUDENT RECORD SYSTEM MENU");
  console.log("================================");
  console.log("1. Add student");
  console.log("2. Display all students");
  console.log("3. Calculate average score");
  console.log("4. Quit");
}
 
// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------
 
function calculateAverage(scores) {
  const total = scores.reduce((sum, score) => sum + score, 0);
  return total / scores.length;
}
 
function findStudentById(id) {
  for (const student of students) {
    if (student.id === id) {
      return student;
    }
  }
  return null;
}
 
// -----------------------------------------------------------------------------
// Feature 1 — Add a student
// -----------------------------------------------------------------------------
 
function addStudent() {
  const name = readlineSync.question("Student name: ").trim();
 
  if (name === "") {
    console.log("Error: Student name cannot be empty.");
    return;
  }
 
  const id = Number(readlineSync.question("Student ID: "));
 
  if (!Number.isInteger(id)) {
    console.log("Error: Student ID must be a valid whole number.");
    return;
  }
 
  if (findStudentById(id) !== null) {
    console.log("Error: A student with that ID already exists.");
    return;
  }
 
  const scoreCount = Number(readlineSync.question("How many scores? "));
 
  if (!Number.isInteger(scoreCount) || scoreCount <= 0) {
    console.log("Error: Number of scores must be a positive integer.");
    return;
  }
 
  const scores = [];
  for (let i = 0; i < scoreCount; i++) {
    let score;
 
    while (true) {
      score = Number(readlineSync.question(`Enter score ${i + 1}: `));
 
      if (!Number.isNaN(score)) {
        break;
      }
 
      console.log("Please enter a valid number.");
    }
 
    scores.push(score);
  }
 
  students.push({ name, id, scores });
  console.log(`Student "${name}" added successfully.`);
}
 
// -----------------------------------------------------------------------------
// Feature 2 — Display all students
// -----------------------------------------------------------------------------
 
function displayAllStudents() {
  if (students.length === 0) {
    console.log("No students have been added yet.");
    return;
  }
 
  console.log("\nName            ID          Scores              Average");
  console.log("----------------------------------------------------------");
 
  for (const student of students) {
    const average = calculateAverage(student.scores).toFixed(2);
    const name = student.name.padEnd(16);
    const id = String(student.id).padEnd(12);
    const scores = student.scores.join(", ").padEnd(20);
 
    console.log(`${name}${id}${scores}${average}`);
  }
}
 
// -----------------------------------------------------------------------------
// Feature 3 — Calculate average score for a specific student
// -----------------------------------------------------------------------------
 
function calculateAverageForStudent() {
  const id = Number(readlineSync.question("Enter student ID: "));
  const student = findStudentById(id);
 
  if (student === null) {
    console.log("Error: No student found with that ID.");
    return;
  }
 
  const average = calculateAverage(student.scores).toFixed(2);
  console.log(`${student.name}'s average score: ${average}`);
}
 
// -----------------------------------------------------------------------------
// Main menu loop
// -----------------------------------------------------------------------------
 
function main() {
  let running = true;
 
  while (running) {
    printMenu();
    const choice = readlineSync.question("Enter your choice (1-4): ").trim();
 
    if (choice === "1") {
      addStudent();
    } else if (choice === "2") {
      displayAllStudents();
    } else if (choice === "3") {
      calculateAverageForStudent();
    } else if (choice === "4") {
      console.log("Goodbye!");
      running = false;
    } else {
      console.log("Error: Please enter a number between 1 and 4.");
    }
  }
}
 
main();