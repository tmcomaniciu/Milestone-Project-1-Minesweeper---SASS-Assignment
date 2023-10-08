//Main Game JS
document.addEventListener("DOMContentLoaded", function () {
  //game info here
});

// Model Menu JS
document.addEventListener("DOMContentLoaded", function () {
  showStartMenu();
});
function showStartMenu() {
  var startMenu = document.getElementById("startMenu");
  startMenu.style.display = "block";
}

function startGame() {
  //start game
  alert("Game is Starting!");
}

//Main Game JS

//declare variables (to be used as html classes)
var document, body, gameBoard, gamegrid;
gameTimer, time, preGame;

//initialize game
function initializeGame() {
  const document = document;
  const body = document.body;
  //select elementd with querySelector
  const documentElement = document.documentElement;
  const bodyElement = document.body;
  //add class to the body
  bodyElement.classList.add("loadGame");
}

//start game code
const gameBoard = document.getElementById("gameBoard");
const gameGrid = document.getElementById("gameGrid");
const gameTimer = document.getElementById("gameTimer");
const bombCount = document.getElementById("bombCount");
const difficultyLevel = document.getElementById("difficultyLevel");
const levels = {
  easy: "9x9x10",
  normal: "16x16x44",
  hard: "16x30x90",
};
//declare board variables
const gameLevel = difficultyLevel.val;
var levelParameters,
  rows,
  rowsElements,
  columns,
  cellCount,
  bombs,
  emptyCells,
  bombsCount,
  pauseTime;

//const for color of cell near bombs
const bombCountColor = {
  0: "",
  1: "blue",
  2: "green",
  3: "red",
  4: "dark-blue",
};

//timer constants
const time = 0;
const timer = false;
const preGame = true;

//code to create levels based on diffulty level pulled from board size in const = levels

function createLevel(gameLevel) {}
