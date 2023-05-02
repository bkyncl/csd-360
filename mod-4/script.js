/*
script.js
Module 4 Assignment
Name: Brittany Kyncl
Date: 3.30.23
Course: CSD360
Starting with the following JavaScript:
    var i = 842;
    document.write(i + i % 3 / 7 - 2 + 7 ** 3);
Using parentheses to modify the output line to alter the result of 1183.2857142857142 to the following list of outputs.
    341.14285714285717
    1185.4
    842.0011574074074
    113.28571428571433
    343.2
    841.75 
*/
// Set var i
var i = 842;

// Original expression
document.getElementById("1").innerHTML = "= " + (i + i % 3 / 7 - 2 + 7 ** 3); //1183.2857142857142
// Modified expressions using only parentheses
document.getElementById("2").innerHTML = "= " + ((i + i) % 3 / 7 - 2 + 7 ** 3); //341.14285714285717
document.getElementById("3").innerHTML = "= " + (i + i % 3 / (7 - 2) + 7 ** 3); //1185.4
document.getElementById("4").innerHTML = "= " + (i + i % 3 / (7 - 2 + 7) ** 3); //842.0011574074074
document.getElementById("5").innerHTML = "= " + (i + i % 3 / 7 - (2 + 7) ** 3); //113.28571428571433
document.getElementById("6").innerHTML = "= " + ((i + i) % 3 / (7 - 2) + 7 ** 3); //343.2
document.getElementById("7").innerHTML = "= " + (i + i % 3 / (7 - (2 + 7)) ** 3); //841.75

// For testing purposes
// console.log(i + i % 3 / 7 - 2 + 7 ** 3); //1183.2857142857142
// console.log((i + i) % 3 / 7 - 2 + 7 ** 3); //341.14285714285717
// console.log(i + i % 3 / (7 - 2) + 7 ** 3); //1185.4
// console.log(i + i % 3 / (7 - 2 + 7) ** 3); //842.0011574074074
// console.log(i + i % 3 / 7 - (2 + 7) ** 3); //113.28571428571433
// console.log((i + i) % 3 / (7 - 2) + 7 ** 3); //343.2
// console.log(i + i % 3 / (7 - (2 + 7)) ** 3); //841.75