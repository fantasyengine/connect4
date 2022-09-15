/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
const width = 7;
const height = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
 // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  // make empty arrays inside board array and fill each array with null
  for (let y = 0; y < height; y++) {
    board.push([]);
    for (let x = 0; x < width; x++) {
      board[y].push(null);
    }
  }
  return board;
}

// Psuedo-Code - creating a function (makeBoard) containing a nested for loop to create the dimensions of our grid. 


/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
const htmlBoard = document.querySelector('#board');
  // comment - get the HTML board item to be able to be called upon later. 
  const top = document.createElement('tr');
  //create a table ro to be called upon
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
// give column top an attribute ID as column-top and then listen for event listener on TR

// for loop for cell creation
  for (let x = 0; x < width; x++) {
    //creates a new  td when headcell is called below
    const headCell = document.createElement("td");
    //set ID of x to a new td and then append td to tr
    headCell.setAttribute("id", x);
    top.append(headCell);
  } 
  //appends tr to the board
  htmlBoard.append(top);

  // makes main part of entire board
  for (let y = 0; y < height; y++) {
    //creates new tr when row gets called
    const row = document.createElement("tr");
    for (let x = 0; x < width; x++){
//create new td when you call cell
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      //append cell to row
      row.append(cell);
    }
    //append row to board
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = height - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}
/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.classList.add(`p${currPlayer}`);

  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }


  // place piece in board and add to HTML table
  board[y][x] = currPlayer;
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
if (board.every(row => row.every(cell => cell))){
  return endGame('Tie!');
}

  // switch players
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < height &&
        x >= 0 &&
        x < width &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
//ways to win above 

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
