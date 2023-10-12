$(document).ready(function () {
  // Show pop-up on page load
  $("#instructions-popup").show();

  // Close pop-up when close button is clicked
  $(".close-popup").click(function () {
    $("#instructions-popup").hide();
  });
});

// Wait for the DOM to be fully loaded before executing the code
document.addEventListener("DOMContentLoaded", function () {
  // Declare variables for common DOM elements and game parameters
  var body, documentElement, board, grid, timer, time, unstarted;

  // Initialize the Minesweeper game
  function _init() {
    // Cache some common DOM queries for code efficiency
    var documentElement = document;
    var body = document.body;
    body.classList.add("loaded");

    // Minesweeper game initialization and setup
    var $board = $("#board");
    var $grid = $("#grid");
    var $timer = $("#timer");
    var $mineCounter = $("#minecounter");
    var $levelSelect = $("#level");
    var levels = {
      easy: "9x9x10",
      medium: "16x16x44",
      hard: "16x30x99",
    };
    var level = $levelSelect.val();
    var levelParameters,
      rows,
      $rows,
      columns,
      cellCount,
      mines,
      freeCells,
      mineTally,
      pauseTime,
      beginnerHighScore = 99,
      intermediateHighScore = 499,
      expertHighScore = 999;
    var countColors = {
      0: "",
      1: "blue",
      2: "green",
      3: "red",
      4: "dark-blue",
      5: "maroon",
      6: "turquoise",
      7: "purple",
      8: "dark-grey",
    };

    // Time-related variables
    time = 0;
    timer = false;
    unstarted = true;
    var statusIndicator = '<div class="status-indicator"></div>';

    // Function to set the Minesweeper game level
    function setLevel(level) {
      levelParameters = levels[level];
      rows = parseInt(levelParameters.split("x")[0]);
      columns = parseInt(levelParameters.split("x")[1]);
      cellCount = rows * columns;
      mines = levelParameters.split("x")[2];
      freeCells = cellCount - mines;
    }

    // Function to set up the Minesweeper game board
    function setBoard(level) {
      // Clear Grid for a new game, after win/loss, before the initial game
      $grid
        .html(statusIndicator)
        .removeClass("disabled lose win")
        .addClass("unstarted");

      // Set Up Grid for a new start
      setLevel(level);

      // Set unstarted condition
      unstarted = true;

      // Build Rows
      for (r = 0; r < rows; r++) {
        var newCells = "";
        // Build Cells
        for (c = 0; c < columns; c++) {
          newCells += '<div class="cell"></div>';
        }
        $grid.append('<div class="row">' + newCells + "</div>");
      }

      // Set Minecounter
      mineTally = mines;
      $mineCounter.html(mineTally);

      // Set Timer
      resetTimer();
    }

    // Set initially
    setBoard(level);

    // Event listeners for reset button and status indicator
    $("html")
      .on("mousedown", ".reset", function () {
        $(this).text("Reset");
      })
      .on("mouseup", ".reset", function () {
        $(this).text("Reset");
        stopTimer();
        level = $levelSelect.val();
        setBoard(level);
      });

    $("html").on("click", ".status-indicator", function () {
      level = $levelSelect.val();
      setBoard(level);
    });

    // Event listener for level change
    $levelSelect.on("change", function () {
      stopTimer();
      resetTimer();
      level = $levelSelect.val();
      setBoard(level);
    });

    // Function to lay mines on the Minesweeper board
    function layMines(level, clickedCellIndex) {
      $rows = $(".row");
      var freeCells = $(".cell");
      var takenCells = [clickedCellIndex];

      // Lay Mines
      for (m = 0; m < mines; m++) {
        var mineCell = Math.floor(Math.random() * Math.floor(freeCells.length));
        // If it happens to be the clicked cell, skip it
        if ($.inArray(mineCell, takenCells) > -1) {
          m--;
          continue;
        }
        takenCells.push(mineCell);
        $(freeCells[mineCell]).addClass("mine");
      }

      // Identify Cell Numbers
      var $cells = $(".cell");
      for (c = 0; c < $cells.length; c++) {
        var $cell = $($cells[c]);
        $cell.attr("data-cell", c);
        // Skip if it's a mine
        if ($cell.is(".mine")) {
          continue;
        }

        // Count adjacent mines
        var mineCount = 0;
        var rowPos = Math.floor(c / columns);
        var $currentRow = $cell.closest(".row");
        $currentRow.attr("data-row", rowPos);
        var rowCells = $currentRow.find(".cell");
        var cellPos = c % columns;

        if ($(rowCells[cellPos - 1]).is(".mine")) {
          mineCount++;
        }
        if ($(rowCells[cellPos + 1]).is(".mine")) {
          mineCount++;
        }

        if (rowPos > 0) {
          var prevRowCells = $($rows[rowPos - 1]).find(".cell");
          if ($(prevRowCells[cellPos - 1]).is(".mine")) {
            mineCount++;
          }
          if ($(prevRowCells[cellPos]).is(".mine")) {
            mineCount++;
          }
          if ($(prevRowCells[cellPos + 1]).is(".mine")) {
            mineCount++;
          }
        }

        if (rowPos < rows - 1) {
          var nextRowCells = $($rows[rowPos + 1]).find(".cell");
          if ($(nextRowCells[cellPos - 1]).is(".mine")) {
            mineCount++;
          }
          if ($(nextRowCells[cellPos]).is(".mine")) {
            mineCount++;
          }
          if ($(nextRowCells[cellPos + 1]).is(".mine")) {
            mineCount++;
          }
        }

        // Display mine count or mark as zero
        if (mineCount > 0) {
          $cell.html("<i>" + mineCount + "</i>");
          // Styling classes based on mine count
          var colorClass = countColors[mineCount];
          $cell.addClass(colorClass);
        } else {
          $cell.addClass("zero");
        }
      }
    }

    // Click cell to start the game
    $("html")
      .off("click", "#grid.unstarted .cell")
      .on("click", "#grid.unstarted .cell", function (e) {
        $grid.removeClass("unstarted");
        if (unstarted && !$(e.target).is(".mine")) {
          layMines(level, $(".cell").index(this));
          timer = window.setInterval(startTimer, 1000);
          unstarted = false;
        }
      });

    // Timer Functions
    function resetTimer() {
      $timer.html("000");
      time = 0;
    }

    function startTimer() {
      time++;
      // Format and display the timer
      if (time < 10) {
        $timer.html("00" + time);
      } else if (time > 9 && time < 100) {
        $timer.html("0" + time);
      } else {
        $timer.html(time);
      }
    }

    function stopTimer() {
      // Stop the timer
      window.clearInterval(timer);
    }

    // Pause and unpause timer when the window loses or gains focus
    function pauseTimer() {
      stopTimer();
      pauseTime = parseInt($("#timer").html());
    }

    function unpauseTimer() {
      time = pauseTime;
      timer = window.setInterval(startTimer, 1000);
      pauseTime = false;
    }

    // Pause when the window loses focus
    $(window)
      .on("blur", function () {
        pauseTimer();
      })
      .on("focus", function () {
        if (pauseTime) {
          unpauseTimer();
        }
      });

    // Check Cell
    function checkCell($cell) {
      if (!$cell.is(".mine") && !$cell.is(".revealed")) {
        cellClick($cell, "reveal");

        if ($cell.is(".zero")) {
          $cell.trigger("click");
        }
      }
    }

    // Clicking on a cell (left and right click handling)
    function cellClick($cell, action) {
      // If Flagging
      if (action === "flag" && !$cell.is(".revealed")) {
        if ($cell.is(".flagged")) {
          $cell.removeClass("flagged");
          $cell.addClass("maybe");
          mineTally++;
          updateMinecounter(mineTally);
        } else if ($cell.is(".maybe")) {
          $cell.removeClass("maybe");
          var flag = $cell.find(".flag");
          flag.remove();
        } else {
          $cell.addClass("flagged");
          $cell.append('<span class="flag"></span>');
          mineTally--;
          updateMinecounter(mineTally);
        }
        // If Revealing
      } else if (action === "reveal") {
        $cell.addClass("revealed");

        // If it's a mine, you lose!
        if ($cell.is(".mine")) {
          lose();
        }

        statusCheck();
      } else if (action === "clear") {
        if (!$cell.is(".revealed") || $cell.is(".zero")) {
          return;
        }

        clearClick($cell);
      }
    }

    // Update Minecounter
    function updateMinecounter(mineTally) {
      if (mineTally < 10) {
        $mineCounter.html("0" + mineTally);
      } else {
        $mineCounter.html(mineTally);
      }
    }

    // Clicking on a Zero cell
    function zeroClick($cell) {
      var cellPos = $cell.prevAll().length;
      var $currentRow = $cell.closest(".row");
      var rowPos = parseInt($currentRow.attr("data-row"));
      var rowCells = $currentRow.find(".cell");

      checkCell($(rowCells[cellPos - 1]));
      checkCell($(rowCells[cellPos + 1]));

      if (rowPos > 0) {
        var prevRowCells = $($rows[rowPos - 1]).find(".cell");
        checkCell($(prevRowCells[cellPos - 1]));
        checkCell($(prevRowCells[cellPos]));
        checkCell($(prevRowCells[cellPos + 1]));
      }

      if (rowPos < rows) {
        var nextRowCells = $($rows[rowPos + 1]).find(".cell");
        checkCell($(nextRowCells[cellPos - 1]));
        checkCell($(nextRowCells[cellPos]));
        checkCell($(nextRowCells[cellPos + 1]));
      }
    }

    // Clicking on a number to clear free cells
    function clearClick($cell) {
      var cellPos = $cell.prevAll().length;
      var $currentRow = $cell.closest(".row");
      var rowPos = parseInt($currentRow.attr("data-row"));
      var rowCells = $currentRow.find(".cell");
      var adjacentCells = [];
      var correctClear = true;
      var adjacentMines = 0;
      var adjacentFlags = 0;
      var i;
      adjacentCells.push($(rowCells[cellPos - 1]));
      adjacentCells.push($(rowCells[cellPos + 1]));

      if (rowPos > 0) {
        var prevRowCells = $($rows[rowPos - 1]).find(".cell");
        adjacentCells.push($(prevRowCells[cellPos - 1]));
        adjacentCells.push($(prevRowCells[cellPos]));
        adjacentCells.push($(prevRowCells[cellPos + 1]));
      }

      if (rowPos < rows) {
        var nextRowCells = $($rows[rowPos + 1]).find(".cell");
        adjacentCells.push($(nextRowCells[cellPos - 1]));
        adjacentCells.push($(nextRowCells[cellPos]));
        adjacentCells.push($(nextRowCells[cellPos + 1]));
      }

      for (i = 0; i < adjacentCells.length; i++) {
        // add to mine count
        if ($(adjacentCells[i]).is(".mine")) {
          adjacentMines++;
        }
        // add to flag count
        if ($(adjacentCells[i]).is(".flagged")) {
          adjacentFlags++;
        }
      }

      if (adjacentFlags === adjacentMines) {
        for (i = 0; i < adjacentCells.length; i++) {
          if ($(adjacentCells[i]).is(".mine")) {
            if ($(adjacentCells[i]).is(".flagged")) {
              continue;
            } else {
              $(adjacentCells[i]).addClass("revealed");
              correctClear = false;
            }
          } else if ($(adjacentCells[i]).is(".flagged")) {
            correctClear = false;
            $(adjacentCells[i]).addClass("incorrect");
            lose();
          }
        }

        if (correctClear) {
          for (i = 0; i < adjacentCells.length; i++) {
            if (!$(adjacentCells[i]).is(".mine")) {
              if ($(adjacentCells[i]).is(".zero")) {
                zeroClick($(adjacentCells[i]));
              }
              cellClick($(adjacentCells[i]), "reveal");
            }
          }
        }
      } else {
        return;
      }
    }

    // Check status to determine if the player has won
    function statusCheck() {
      if ($(".cell.revealed").length == freeCells) {
        stopTimer();
        var winTime = $("#timer").html();
        $grid.addClass("disabled win");
        resetHighScore(level, winTime);
      }
    }

    // Handle game loss
    function lose() {
      $grid.addClass("disabled lose");
      stopTimer();
    }

    // Clicking on a cell (left and right click handling)
    $("html").on("click", ".cell", function (e) {
      e.preventDefault();
      var action = "reveal";
      var $cell = $(this);

      if (e.altKey || e.which === 3) {
        action = "flag";
      } else if ($cell.is(".revealed") || (e.which === 1) & (e.which === 3)) {
        action = "clear";
      }

      if ($cell.is(".flagged") && !e.altKey) {
        return;
      }

      if ($cell.is(".zero")) {
        zeroClick($cell);
      }

      cellClick($cell, action);
    });

    // Handle mouse down and up events on a cell
    $("html")
      .on("mousedown", ".cell:not(.revealed,.flagged)", function (e) {
        if (!e.altKey && e.which !== 3) {
          $(this).addClass("mousedown");
        }
      })
      .on("mouseup mouseleave", ".cell.mousedown", function () {
        $(this).removeClass("mousedown");
      });

    // Info Panel functionality
    // Function to reset or update the high score
    function resetHighScore(level, winTime) {
      if (localStorage.getItem(level)) {
        if (winTime < localStorage.getItem(level)) {
          localStorage.setItem(level, winTime);
          populateHighScore(level, winTime, true);
        }
      } else {
        localStorage.setItem(level, winTime);
        populateHighScore(level, winTime, true);
      }
    }

    // Function to display the high score
    function populateHighScore(level, highScore, highlight) {
      if (!$("#highscore").length) {
        $board
          .find(".bottom")
          .append(
            '<div id="highscore"><h4>High Scores</h4><ul><li class="easy"></li><li class="medium"></li><li class="hard"></li></ul><div><button id="score-reset" class="score-reset">Clear Scores</button></div></div>'
          );
      }
      if (highlight === true) {
        $("#highscore .highlight:not(." + level + ")").removeClass("highlight");
        $("#highscore ." + level).addClass("highlight");
      }
      var highScoreDisplay = parseInt(highScore, 10);
      $("#highscore ." + level).html(
        "<span>" + level + "</span>: " + highScoreDisplay + " seconds"
      );
    }

    // Function to clear all high scores
    function clearScores() {
      localStorage.clear();
      $("#highscore").remove();
    }

    // Event listener for clicking on the score reset button
    $("html").on("click", "#score-reset", clearScores);
  }

  // Call the initialization function
  _init();
});
