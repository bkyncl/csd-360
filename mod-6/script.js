/*
script.js
Module 6 Assignment 
Name: Brittany Kyncl
Date: 4.16.23
Course: CSD360
functions to calculate each number in the fibonacci sequence.
There are three different methods used to generate the Fibonacci number, recursive/forloop/whileloop
then a forloop is used to display the entire sequence where each iteration calls the specified method 
to generate the Fibonacci number for each desired index up to desired termination index.
*/

// variables to hold element ID's for updating their values using innerHTML
var methodname = document.getElementById("method-name");
var resultContainer = document.getElementById("result-container");

// function to generate fibonacci number using recursion
function recursionFibonacci(index) {
    if (index < 2 ) {
        return index;
    }
    return recursionFibonacci(index-1) + recursionFibonacci(index-2);
}
// function to generate fibonacci number using for loop
function forloopFibonacci(index) {
    if (index == 1 || index == 2) {
        return 1;
    }
    var num1 = 1;
    var num2 = 1;
    for(var i = 2; i < index; i++) {
        var sum = num1 + num2;
        num1 = num2;
        num2 = sum;
    }
    return num2;
}
// function to generate fibonacci number using a while loop
function whileloopFibonacci(index) {
    if(index == 1 || index == 2) {
        return 1;
    }
    var num1 = 1;
    var num2 = 1;
    var sum;
    var i = 2;
    while (i < index)  {
        sum = num1 + num2;
        num1 = num2;
        num2 = sum;
        i++;
    }
    return num2;
}
// function to display entire fibonacci sequence by taking in method as parameter and displaying
// each number returned by inner method call for each iteration up to 30 
function displayFibonacci(method, name) {
    // Display parameter method name
    methodname.innerHTML = name;
    // Retrieve the source code for the method function
    var sourceCode = method.toString();
    // Wrap the source code in <pre> tags to display it as preformatted text
    var formattedSourceCode = "<pre>" + sourceCode + "</pre>";
    // display preformatted source code
    resultContainer.innerHTML = formattedSourceCode + "<br>";
    // loop to print entire fibonacci sequence via inner method call using parsed method
    for(var i=1; i <= 30; i++ ) {
        var num = method(i);
        resultContainer.innerHTML +=i + " - " + num + "<br>";
    }
}