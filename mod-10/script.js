/*
script.js
Module 10 Assignment 
Name: Brittany Kyncl
DDate: 5.2.23
Course: CSD360
OVERVIEW
*/
const selectBox = document.querySelector(".select-box");
const selectXbtn = document.querySelector(".playerX");
const selectObtn = document.querySelector(".playerO");
const playBoard = document.querySelector(".playboard");
const boxes = document.querySelectorAll("section span");
const players = document.querySelector(".players");
const results = document.querySelector(".results");
const winText = document.querySelector("win-text");
const replay = document.querySelector("btn");

let playerX = "X";
let playerO = "O";
let playerSign = "X";
let winnerFound = false;

window.onload = () => {
    for (let i=0; i < boxes.length; i++) {
        boxes[i].setAttribute("onclick", "clickedBox(this)");
    }

    selectXbtn.addEventListener('click', function() {
        selectBox.classList.add('hide');
        playBoard.classList.add('show');
    });
    
    selectObtn.addEventListener('click', function() {
        selectBox.classList.add('hide');
        playBoard.classList.add('show');
        players.setAttribute("class", "players active player")
    });
}



// User click function
function clickedBox(element) {

    if(players.classList.contains("player")) {
        element.innerHTML = playerO;
        element.classList.add("o");
        players.classList.add("active");
        playerSign = "O";
    }else {
        element.innerHTML = playerX;
        element.classList.add("x");
        players.classList.add("active");
        playerSign = "X";
    }
    element.setAttribute("id", playerSign);
    returnWinner();
    element.style.pointerEvents = "none"; 
    playBoard.style.pointerEvents = "none"; 

    if (!winnerFound) {
        let randomDelayTime = ((Math.random() * 1000) + 200).toFixed();
        setTimeout(() => {
            npc();
        }, randomDelayTime);
    }
    
}
// NPC click function
function npc() {
    
    playerSign = "O";
    let array = []; // store unselected box indexes in array

    for (let i=0; i < boxes.length; i++) {
        if(boxes[i].textContent == "") { // if span has no txt
            array.push(i); // push unclicked boxes to array
        }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)]; // Get random index from array
    boxes[randomBox]
    if(array.length > 0) {
        if(players.classList.contains("player")) {
            boxes[randomBox].innerHTML = playerX;
            boxes[randomBox].classList.add("x");
            players.classList.remove("active");
            playerSign = "X";
        }else {
            boxes[randomBox].innerHTML = playerO;
            boxes[randomBox].classList.add("o");
            players.classList.remove("active");
            playerSign = "O";
        }
        boxes[randomBox].setAttribute("id", playerSign);
        returnWinner();
        
    }
    boxes[randomBox].style.pointerEvents = "none";
    playBoard.style.pointerEvents = "auto"; 
    playerSign = "X";
}
function getClass(idname) {
    return document.querySelector(".box" + idname).id;
}
function checkClass(val1, val2, val3, sign) {
    if(getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign)
    return true;
}

function returnWinner() {
    if(checkClass(1,2,3, playerSign) || checkClass(4,5,6, playerSign) || checkClass(6,7,8, playerSign) || checkClass(1,4,7, playerSign)
    || checkClass(2,5,8, playerSign) || checkClass(3,6,9, playerSign) || checkClass(1,5,9, playerSign) || checkClass(3,5,7, playerSign)){
        console.log(playerSign);
        winnerFound = true;

        setTimeout(() => {
            playBoard.classList.remove("show");
            results.classList.add("show");
        }, 700);
    }
}

const paracontainer = document.querySelector(".para-container");
paracontainer.addEventListener("mousemove", mouseParallax);
window.addEventListener("scroll", scrollParallax);
// Function for parallax animation on mouse over in header display
function mouseParallax(e) {
    document.querySelectorAll(".object").forEach(object =>{
        var moving_value = object.getAttribute("data-value");
        var x = e.clientX * moving_value/150;
        var y = e.clientY * moving_value/150;

        object.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
    });
}

function scrollParallax() {
    const scrollPosition = window.scrollY;
    document.querySelectorAll(".object").forEach(object => {
        const depth = object.getAttribute("data-value");
        const translateY = scrollPosition * (depth - 4);
        object.style.transform = `translateY(${translateY}px)`;
    });
}