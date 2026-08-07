// =============================================================================
const readlineSync = require("readline-sync");
 
// Determines the letter grade for a given score.
// Returns null if the score is out of the valid 0-100 range.
function getGrade(score) {
  if (score < 0 || score > 100) {
    return null;
  }
 
  if (score >= 80) {
    return "A";
  } else if (score >= 70) {
    return "B";
  } else if (score >= 60) {
    return "C";
  } else if (score >= 50) {
    return "D";
  } else {
    return "F";
  }
}
 
function main() {
  const input = readlineSync.question("Enter student score (0-100): ");
  const score = Number(input);
 
  if (Number.isNaN(score)) {
    console.log("Error: Please enter a valid number.");
    return;
  }
 
  const grade = getGrade(score);
 
  if (grade === null) {
    console.log("Error: Score must be between 0 and 100.");
  } else {
    console.log(`Grade: ${grade}`);
  }
}
 
main();