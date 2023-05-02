/*
script.js
Module 5 Assignment
Name: Brittany Kyncl
Date: 4.4.23
Course: CSD360
Script for Randomized double dice roll functionality utilizing JS switch statement to display the various results to page
Such as:
 "Snake Eyes";  2 
 "Box Cars";  12 
 "You Win";  7 or 11 
 "total";  All remaining values 
 Program also creates animation effect for dice based on random numbers generated
*/
// Function to "roll dice" and populate 2 random integers 1-6 for total and display
function diceRoll() {
    // Generate two random numbers and assign to variables
    const random1 = Math.floor((Math.random() * 6) + 1);
    const random2 = Math.floor((Math.random() * 6) + 1);
    // Assign generated numbers to cooresponding form display
    document.diceForm.dice1.value = random1;
    document.diceForm.dice2.value = random2;
    // Assign resulting sum to total variable
    const total = random1 + random2;

    // Switch statement to display resulting sum variable to toal form value and dependent string displays
    switch(total) {
        case 2: // Case sum of 2
            document.diceForm.total.value = total + " Snake Eyes"; /* 2 */
            break;
        case 7: // Case sum of 7 || sum of 11
        case 11:
            document.diceForm.total.value = total + " You Win!"; /* 7 or 11 */
            break;
        case 12: // Case sum of 12
            document.diceForm.total.value = total + " Box Cars"; /* 12 */
            break;
        default: // Case default display of total sum 
            document.diceForm.total.value = total; /* All remaining values */
    }
    // Parse both randomly generated dice number results as parameters to dice animation display
    animateDice(random1, random2);
}
// Function with dice face value paramenter(num) to return transformation value
function diceTransformValue(num) {
    // Switch to check possible value of num 1-6 and return correct dice face transformation
    switch (num) {
        case 1:
            return 'rotateX(0deg) rotateY(0deg)';
        case 6:
            return 'rotateX(180deg) rotateY(0deg)';
        case 2:
            return 'rotateX(-90deg) rotateY(0deg)';
        case 5:
            return 'rotateX(90deg) rotateY(0deg)';
        case 3:
            return 'rotateX(0deg) rotateY(90deg)';
        case 4:
            return 'rotateX(0deg) rotateY(-90deg)';
        default:
            return '';
    }
}

// Select all class dice elements and store in dice variable
const dice = document.querySelectorAll('.dice');

// Function to display dice animation taking in the two random number dice results generated in diceRoll() as parameters
function animateDice(random1, random2 ){
    // for each to loop through dice array executing function on each dice element
    dice.forEach((die, index) => {
        // Set animation property of current element
        die.style.animation = 'rolling 1.5s';
        // setTimeout to delay the following switch execution for 1550 milliseconds until above animation is completed
        setTimeout(() => {
            // Switch statement to apply animation based on index
            switch (index) {
                case 0: // Case index 0 : apply animation to dice 1
                    // Display returned transform value from parsing dice 1 rand num var to diceTransformValue() function 
                    die.style.transform = diceTransformValue(random1);
                    break;
                case 1: // Case index 1 : apply animation to dice 2
                    // Display returned transform value from parsing dice 2 rand num var to diceTransformValue() function 
                    die.style.transform = diceTransformValue(random2);
                    break;
                default:
                    break;
            }
            // set animation back to none after transformation has been applied
            die.style.animation = 'none';
        },1550); // end of time delay function (extra 50 milliseconds is intentional to allow for transition ease)
    });// end of for each loop
}
    
