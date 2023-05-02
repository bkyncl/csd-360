/*
script.js
Module 9 Assignment 
Name: Brittany Kyncl
DDate: 4.28.23
Course: CSD360
For this assignment, create a function titled counter that takes an array of numbers as the 
parameter. The function is then to return an array holding the numbers of negative elements, zeros, and values greater than zero in the given array parameter.
*/

// Define empty arrays to store user input and randomly generated numbers
var userNumbersArray = [];
var randomArray = [];

// Select HTML elements that will be updated during script runtime
const results = document.getElementById("results");
const arrayDiv = document.getElementById("array");

// Initialize a variable to track whether user input or random numbers are being counted
var randSelection;

// Display an array of numbers to the HTML element with the "array" ID
function displayArray(arr) {
    arrayDiv.textContent = arr.join(", ");
}

// Listen for a key press event on the "numbers" input field, and if the key pressed is "Enter"
const numbersInput = document.getElementById("numbers");
numbersInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") { // enter key pressed
        event.preventDefault(); // prevent form submission
        addUserNumbers();
    }
});

// Add the numbers entered by the user to the userNumbersArray
function addUserNumbers() {
    randSelection = false;
    const numbersInput = document.getElementById("numbers");
    const numbers = numbersInput.value.split(",");
    const regex = /^-?\d*\.?\d+$/; // regex pattern to match floats or decimal entries
    for (let i = 0; i < numbers.length; i++) {
        const trimmedNumber = numbers[i].trim();
        if (trimmedNumber === "") { // skip empty values
            continue;
        }
        if (!regex.test(trimmedNumber)) { // check if input is a valid integer
            continue;
        }
        userNumbersArray.push(parseFloat(trimmedNumber));
    }
    // send generated array to displayArray to be displayed to user
    displayArray(userNumbersArray);
    // reset user input
    numbersInput.value = "";
}
// generate and return random array up to parameter limit length
function getRandomArray(limit) {
    randSelection = true;
    for(var i = 0; i <= limit; i++){
        const randomNum = Math.floor(Math.random() * 41) -20;
        randomArray.push(randomNum);
    }
    displayArray(randomArray);
}


// Display the results of the counter function to the "results" area
function counterResultFromDiv() {
    switch (randSelection) {
        case true:
          counter(randomArray);
          break;
        case false:
          counter(userNumbersArray);
          break;
        default:
          return;
      }
}

// Count the number of negative, zero, and positive values in an array parameter and return a key value pair collection of counter results
function counter(arr) {
    const counts = { negCount: 0, zeroCount: 0, posCount: 0 };
    for (let i = 0; i < arr.length; i++) {
        
        if (arr[i] < 0) {
            counts.negCount++;
        } else if (arr[i] === 0) {
            counts.zeroCount++;
        } else {
            counts.posCount++;
        }
    }
    // Display the counter results to the "results" area
    results.textContent = `Negative: ${counts.negCount}, Zero: ${counts.zeroCount}, Positive: ${counts.posCount}`;
    userNumbersArray = [];
    randomArray =[];
}

// Clear containers and collections
function clearContainer() {
    arrayDiv.textContent = "";
    results.textContent = "";
    userNumbersArray = [];
    randomArray =[];
}

