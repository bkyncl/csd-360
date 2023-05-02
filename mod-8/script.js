/*
script.js
Module 8 Assignment 
Name: Brittany Kyncl
Date: 4.22.23
Course: CSD360
This program is designed to generate table data for display 
The first function generates data for a table that displays the square root, 
square, and cube of numbers within a specified range. The second function generates a 
multiplication table based on user input, displaying the products of numbers within a 
specified range. 
*/

// Append the rows to the first table body
document.getElementById("table-body").innerHTML = generateTableData();

// Display default multiplication table generation on window load
window.onload = multiplicationTable();

// Generate table data with values from 4 to 14
function generateTableData() {
    // Define the values to start and end at
    const start = 4;
    const end = 14;

    // Create the table rows using loop iteration
    var rows = "";
    for(var i = start; i <= end; i++) {
        // Calculate the square root, base 2, and base 3 of i
        const squareRoot = Math.sqrt(i).toFixed(2);
        const base2 = Math.pow(i, 2);
        const base3 = Math.pow(i, 3);
        // Append the values to the current row
        rows += `<tr>
            <td>${i}</td>
            <td>${squareRoot}</td>
            <td>${base2}</td>
            <td>${base3}</td>
        </tr>`;
    }
    return rows;
}

// Generate a multiplication table based on two user input values
function multiplicationTable() {
    // Get the start and end values from the user input
    var start = document.getElementById("number1").value;
    var end = document.getElementById("number2").value;

    if(start === "") {
        start = 1;
    }
    if(end === "") {
        end = 10;
    }

    // Create the first row of the table with the input values as column headers
    var table = '<tr><th></th>';
    for(var i = start; i <= end; i++) {
        table += `<th>${i}</th>`;
    }

    // Create the table rows using loop iteration, starting with the row headers
    table += '</tr>';
    for(var i = start; i <= end; i++) {
        // Add the row header value to the current row
        table += `<tr><th>${i}</th>`
        for(var j = start; j <= end; j++) {
            // Calculate the multiplication result and add it to the current row
            const result = j * i;
            table += `<td>${result}</td>`;
        }
        table += '</tr>';
    }

    // Check if the end value is greater than 50
    // Check if end value is greater than 50
    if (end > 37) {
        // Add class to the tbody element
        document.getElementById("table-body2").classList.add("small-font");
    } else {
        // Remove class if it was previously added
        document.getElementById("table-body2").classList.remove("small-font");
    }

    // Set the colspan of the headers to span the correct number of columns
    const headers = document.querySelectorAll(".multiply-header");
    headers.forEach(header => header.setAttribute("colspan", end - start + 2));

    // Append the rows to the second table body
    document.getElementById("table-body2").innerHTML = table;
}