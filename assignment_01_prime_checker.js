// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 1
// =============================================================================
//
// TASK: Prime Number Checker
// =============================================================================
console.log("Program started");
const readlineSync = require('readline-sync');

/**
 * Checks whether a given number is prime.
 * @param {number} num - The number to check.
 * @returns {boolean} true if prime, false otherwise.
 */
function isPrime(num) {
  // Numbers less than 2 are not prime
  if (num < 2) {
    return false;
  }

  // Check for divisors from 2 up to the square root of num
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false; // Found a divisor, not prime
    }
  }

  return true; // No divisors found, it's prime
}

function main() {
  const number = readlineSync.questionInt('Enter a number: ');

  if (isPrime(number)) {
    console.log(`${number} is a prime number.`);
  } else {
    console.log(`${number} is NOT a prime number.`);
  }
}

main();