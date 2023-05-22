/*
script.js
Module 10 Assignment 
Name: Brittany Kyncl
DDate: 5.6.23
Course: CSD360
JS code for DOM manipulation style changes based on user interaction
To display header parallax effect on mouse move and scroll action
To change game board display based on user clicks and events
*/

// Get references to DOM elements
const paracontainer = document.querySelector(".para-container");
const userMenu = document.querySelector(".select-box");
const playerXChoice = document.querySelector(".options .playerX");
const playerOChoice = document.querySelector(".options .playerO");
const gameDisplay = document.querySelector(".playboard");
const gameBoxes = document.querySelectorAll("section span");
const players = document.querySelector(".players");
const results = document.querySelector(".results");
const winText = document.querySelector(".win-text");
const replay = document.querySelector(".btn");

// Define game variables
let playerX = "X";
let playerO = "O";
let currentPlayer = "X";
let npcPlay = true;

// Add Event listener on parallax container for mousemovement
paracontainer.addEventListener("mousemove", mouseParallax);
// Add Event listener on window for parallax scroll movement action display
window.addEventListener("scroll", scrollParallax);

// Set event listeners for game elements
window.onload = () => {
    // loop through game boxes to add onclick event listener
    for (let i=0; i < gameBoxes.length; i++) {
        gameBoxes[i].setAttribute("onclick", "clickedBox(this)");
    }

    // add click event listnener to playerchoice
    playerXChoice.addEventListener('click', function() {
        userMenu.classList.add('hide'); // hide the user menu
        gameDisplay.classList.add('show'); // hide the user menu
    });
    
    // add click event listnener to playerchoice
    playerOChoice.addEventListener('click', function() {
        userMenu.classList.add('hide'); // hide the user menu
        gameDisplay.classList.add('show'); // hide the user menu
        players.setAttribute("class", "players active player"); // set player O as active as player X is default
    });
}

// click listener to end of game replay button
replay.onclick = () => {
    window.location.reload(); //reload the page
}

// Function for parallax animation on mouse over in header display
function mouseParallax(e) {
    // loop through all objects with the class "object"
    document.querySelectorAll(".object").forEach(object =>{
        // Get the moving value of the object
        var moving_value = object.getAttribute("data-value");
        // Calculate the X and Y position of the object based on the mouse position and the moving value
        var x = e.clientX * moving_value/150;
        var y = e.clientY * moving_value/150;

        // Set the transform style of the object to move it to the calculated X and Y positions
        object.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
    });
}
// Function for parallax animation on scroll in header display
function scrollParallax() {
    // Set the transform style of the object to move it to the calculated X and Y positions
    const scrollPosition = window.scrollY;
    // Loop through all objects with the class "object"
    document.querySelectorAll(".object").forEach(object => {
        // Get the moving value of the object
        var moving_value = object.getAttribute("data-value");

        // Calculate the Y position of the object based on the scroll position and the moving value
        // only moving Y position for scroll animation
        var translateY = scrollPosition * (moving_value - 4.5);

        // Set the transform style of the object to move it to the calculated Y position
        object.style.transform = `translateY(${translateY}px)`;
    });
}

// User click function for game user game interaction
function clickedBox(element) {
    // Set the current player based on the active player class on the players element
    currentPlayer = players.classList.contains("player") ? "O" : "X";
    players.classList.toggle("active");                             // toggle the active class on players
    element.innerHTML = currentPlayer === "O" ? playerO : playerX;  // set clicked box to current player symbol
    element.classList.add(currentPlayer.toLowerCase());             //add style class of player symbol for box to display
    element.setAttribute("id", currentPlayer);                      //set ID of the clicked box to current player
    element.style.pointerEvents = "none";                           // disable pointer events to prevent clicks in between turns
    gameDisplay.style.pointerEvents = "none";
    //check for winner
    returnWinner();

    // generate random time delay for NPC response to simulate real game play
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(() => {
        npc(npcPlay); // call NPC player function
    }, randomDelayTime);

}
// NPC click function for NPC game interaction
function npc(npcPlay) {
    if (!npcPlay) return; // check if NPC play is disabled

    currentPlayer = "O";
    let array = [];       // store unselected box indexes in array

    // iterate through game boxes and add unselected boxes
    for (let i=0; i < gameBoxes.length; i++) {
        if(gameBoxes[i].textContent == "") { // if span has no txt
            array.push(i); // push unclicked gameBoxes to array
        }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)]; // Get random index from array
    gameBoxes[randomBox]

    if(array.length > 0) { //check for at least one open box
        // Set the current player based on the active player class on the players element
        currentPlayer = players.classList.contains("player") ? "X" : "O";           
        players.classList.toggle("active");                                         // toggle the active class on players
        gameBoxes[randomBox].innerHTML = currentPlayer === "X" ? playerX : playerO; // set clicked box to current player symbol
        gameBoxes[randomBox].classList.add(currentPlayer.toLowerCase());            //add style class of player symbol for box to display
        gameBoxes[randomBox].setAttribute("id", currentPlayer);                     //set ID of the clicked box to current player
        // check for winner
        returnWinner();  
    }
    // disable pointer events to prevent clicks in between turns
    gameBoxes[randomBox].style.pointerEvents = "none";
    gameDisplay.style.pointerEvents = "auto"; 
    currentPlayer = "X";
    
}
// function to get the state of a box and it's ID
function getBoxState(idname) {
    return document.querySelector(".box" + idname).id;
}

// Function to check if the boxes with given values have the same state as the current player
// Returns true if all boxes have the same state, false otherwise
function checkBoxes(val1, val2, val3, currentPlayer) {
    return [val1, val2, val3].every(val => getBoxState(val) === currentPlayer);
}
// function to check for winning player and display game result or draw result
function returnWinner() {
    // Define all possible win combinations
    const winCombinations = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
    
    //iterate through win combinations 
    for(let i = 0; i < winCombinations.length; i++) {
        const [a, b, c] = winCombinations[i];
        
        // Check if the current player has marked all the boxes in a winning combination
        if(checkBoxes(a, b, c, currentPlayer)) {
            npcPlay = false; // if win found NPC play is halted by sending false flag to npc()
            npc(npcPlay);

            // set display to a delat timer
            setTimeout(() => {
                gameDisplay.classList.remove("show"); // hide the gameboard
                results.classList.add("show");         // show the results display
            }, 900);

            // Display the winner's character in the results container
            winText.innerHTML = `Player ${currentPlayer} Wins!`;
            return;
        }
    }
    // Check if all boxes have been marked and no winner is found for draw outcome
    let allClassesNonEmpty = true;
    for (let i = 1; i <= 9; i++) {
        if (getBoxState(i) === "") {
            allClassesNonEmpty = false;
            break;
        }
    }
    if (allClassesNonEmpty) { // If all boxes are marked and no winner is found halt npc play
        npcPlay = false;
        npc(npcPlay);

        setTimeout(() => {
            gameDisplay.classList.remove("show");
            results.classList.add("show");
        }, 900);

        // Display the draw result in the results container
        winText.textContent = `Match is Drawn!`;
    }
}