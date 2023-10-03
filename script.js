document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const flagsLeft = document.querySelector("#flags-left");
  const result = document.querySelector("#result");
  let width = 10;
  let bombAmount = 20;
  let flags = 0;
  let squares = [];
  let isGameOver = false;

  //create the board. startng with standard board, will add different levels later
  function createBoard() {
    //place bombs on tiles randomly
    const bombsArray = Array(bombAmount).fill("💣");
    const emptyArray = Array(width * width - bombAmount).fill("valid");

    console.log(bombsArray);
    console.log(emptyArray);

    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.setAttribute("id", i);
      grid.appendChild(square);
      squares.push(square);
    }
  }
  createBoard();

  //add flag to mark bombs - done with right clikc
  //   function addFlag(square) {}

  //   //click on board to reveal numbers abd/or bombs
  //   function click(square) {}

  //   //tell user that game is over
  //   function gameOver(square) {
  //     result.innerHTML = "BOOM💥! Game Over🤬!";
  //     isGameOver = true;
  //   }
});
