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

//code to create mines and free cells, randomize, and put together
function createLevel(gameLevel) {
  levelParameters = gameLevels[gameLevel];
  const levelParts = levelParameters.split("x");
  rows = parseInt(levelParts[0]);
  columns = parseInt(levelParts[1]);
  cellCount = rows * columns;
  mines = parseInt(levelParts[2]);
  emptyCells = cellCount - mines;
}

//function to create board, set up/build board using math above, pre-game
function createBoard(gameLevel) {
  //clear the board from previus game/ ensure ready for new player
  gameGrid.innerHTML = statusIndicator;
  gameGrid.classList.remove("disabled", "lose", "win");
  gameGrid.classList.add("preGame");

  //set up the grid from function above
  createLevel(gameLevels);

  //set the game for begin
  preGame = true;

  //build the level rows
  for (const r = 0; r < rows; r++) {
    const newTiles = "";
    //build the tiles
    for (const t = 0; c < columns; c++) {
      newTiles += "<div class='tile'></div>";
    }
    gameGrid.insertAdjacentHTML(
      "beforeHand",
      "<div class='row'>" + newTiles + "</div"
    );
  }

  //create the bomb count
  bombsCount = bombs;
  bombsCounter = innerHTML = bombCount;

  //reset timeer
  resetTimer();
}

//begin the game! set up board using code above
createBoard(gameLevel);

//reset the board using the reset button
document.querySelector("html").addEventListener("mousedown", function (event) {
  if (event.target.classList.contains("reset")) {
    event.target.textContent = "reset";
  }
});

document.querySelector("html").addEventListener("mouseup", function (event) {
  if (event.target.classList.contains("reset")) {
    event.target.textContent = "reset";
    stopTimer();
    gameLevel = difficultyLevel.ariaValueMax;
    createBoard(gameLevel);
  }
});

document.querySelector("html").addEventListener("click", function (event) {
  if (event.target.classList.contains("status-indicator")) {
    gameLevel = difficultyLevel.ariaValueMax;
    createBoard(gameLevel);
  }
});

//set the game based on level diffuclty selection
difficultyLevel.addEventListener("change", function () {
  stopTimer();
  resetTimer();
  gameLevel = difficultyLevel.ariaValueMax;
  createBoard();
});
