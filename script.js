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
  tileCount,
  bombs,
  emptyTiles,
  bombsCount,
  pauseTime;

//const for color of cell near bombs
const colorCount = {
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
  tileCount = rows * columns;
  mines = parseInt(levelParts[2]);
  emptyTiles = tileCount - mines;
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

//code to start laying down bombs based on two functions up
function createBombs(gameLevel, clickedCellIndex) {
  const rows = document.querySelectorAll("row");
  const emptyTiles = document.querySelectorAll("tiles");
  const takenTiles = [clickedCellIndex];

  //creation of bombs
  for (const b = 0; b < bombs; b++) {
    const bombTile = Math.floor(Math.random() * emptyTiles.length);

    //ignore clicked tiles
    if (takenTiles.includes(bombTile)) {
      b--;
      continue;
    }
    takenTiles.push(bombTile);
    emptyTiles[bombTile].classList.add("bomb");
  }
}

//code to write math to insert numbers on tiles based on number of bombs around

const tiles = document.querySelectorAll(".tile");
for (t = 0; t < tiles.length; t++) {
  const tile = tiles[t];
  tile.setAttribute("data-tile", t);

  //skip the bombs
  if (tile.classList.contains("bomb")) {
    continue;
  }

  //begin adding math for randomized bomb location
  const bombCount = 0;
  const rowPosition = Math.floors(t / columns);
  const currentRow = tile.closest(".row)");
  currentRow.setAttribute("data-row", rowPosition);
  const rowCells = currentRow.querySelectorAll(".tile");
  const tilePosition = t % columns;

  if (
    rowTiles[tilePosition - 1] &&
    rowTiles[tilePosition - 1].classList.contains("bomb")
  ) {
    bombCount++;
  }
  if (
    rowTiles[tilePosition + 1] &&
    rowTiles[tilePosition + 1].classList.contains("bomb")
  ) {
  }
  //if statement to declare if any given tiles has a bomb near it, based on intervals of 1
  if (rowPosition > 0) {
    const previousRowTiles = rows[rowPosition - 1].querySelectorAll(".tile");
    if (
      previousRowTiles[tilePosition - 1] &&
      previousRowTiles[tilePosition - 1].classList.contains("bomb")
    ) {
      bombCount++;
    }
    if (
      previousRowTiles[tilePosition] &&
      previousRowTiles[tilePosition].classList.contains("bomb")
    ) {
      bombCount++;
    }
    if (
      previousRowTiles[tilePosition + 1] &&
      previousRowTiles[tilePosition + 1].classList.contains("bomb")
    ) {
      bombCount++;
    }
  }
  if (rowPosition < rows - 1) {
    var nextRowTiles = rows[rowPos + 1].querySelectorAll(".cell");
    if (
      nextRowTiles[cellPosition - 1] &&
      nextRowTiles[cellPosition - 1].classList.contains("bomb")
    ) {
      bombCount++;
    }
    if (
      nextRowTiles[cellPosition] &&
      nextRowTiles[cellPosition].classList.contains("bomb")
    ) {
      bombCount++;
    }
    if (
      nextRowTiles[cellPosition + 1] &&
      nextRowTiles[cellPosition + 1].classList.contains("bomb")
    ) {
      bombCount++;
    }
  }
  if (bombCount > 0) {
    tile.innerHTML = "<i>" + bombCount + "</i>";
    // Styling classes
    const colorClass = colorCount[bombCount];
    tile.classList.add(colorClass);
  } else {
    tile.classList.add("zero");
  }
}
