var context = document.getElementById('puzzle').getContext('2d');

var img = new Image();
img.src = "https://source.unsplash.com/random/600x600";
img.addEventListener('load', drawTiles, false);

var boardSize = document.getElementById('puzzle').width; //  600px
var tileCount = document.getElementById('scale').value; // 3

var tileSize = boardSize / tileCount; // 200 px

var clickLoc = new Object;
clickLoc.x = 0;
clickLoc.y = 0;

var emptyLoc = new Object;
emptyLoc.x = 0;
emptyLoc.y = 0;

solved = false;

var boardParts;
setBoard();

// if the scale change re draw
document.getElementById('scale').onchange = function () {
  tileCount = this.value;
  tileSize = boardSize / tileCount; //200px
  setBoard();
  drawTiles();
};

//take the position of puzzle p i click 
document.getElementById('puzzle').onclick = function (e) {
 //get intger x value
  clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / tileSize);
  console.log(clickLoc.x);
 
  //get intger y value
  clickLoc.y = Math.floor((e.pageY - this.offsetTop) / tileSize);
  console.log(clickLoc.y);
  if (distance(clickLoc.x, clickLoc.y, emptyLoc.x, emptyLoc.y) == 1) {
    slideTile(emptyLoc, clickLoc);
    drawTiles();
  }
  if (solved) {
    setTimeout(function () {
      Swal.fire(
        'Good job!',
        '',
        'success',
        
        onclick =function refreshPage(){
          window.location.reload();
      } 
      );
      
    }, 1000);
  }
};
//draw the board
function setBoard() {
  boardParts = new Array(tileCount);
  for (var i = 0; i < tileCount; ++i) {
    boardParts[i] = new Array(tileCount);
    for (var j = 0; j < tileCount; ++j) {
      boardParts[i][j] = new Object;
      boardParts[i][j].x = (tileCount - 1) - i;
      boardParts[i][j].y = (tileCount - 1) - j;

    }
  }
  emptyLoc.x = 0;
  emptyLoc.y = 0;

}

function drawTiles() {
  //clear the epmty square 
  context.clearRect(0, 0, boardSize, boardSize);
  for (var i = 0; i < tileCount; ++i) {
    for (var j = 0; j < tileCount; ++j) {
      var x = boardParts[i][j].x;
      var y = boardParts[i][j].y;
      if (i != emptyLoc.x || j != emptyLoc.y || solved == true) {
        // each part of the image(image, sx, sy, sw, sh, dx, dy, dw, dh)
        context.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize,
          i * tileSize, j * tileSize, tileSize, tileSize);
          
      }
    }
  }
}

function distance(x1, y1, x2, y2) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}
//move the sected peise to the empty square 
function slideTile(toLoc, fromLoc) {
  if (!solved) {
    boardParts[toLoc.x][toLoc.y].x = boardParts[fromLoc.x][fromLoc.y].x;
    boardParts[toLoc.x][toLoc.y].y = boardParts[fromLoc.x][fromLoc.y].y;
    boardParts[fromLoc.x][fromLoc.y].x = tileCount - 1;
    boardParts[fromLoc.x][fromLoc.y].y = tileCount - 1;
    toLoc.x = fromLoc.x;
    toLoc.y = fromLoc.y;
    checkSolved();
  }
}

function checkSolved() {
  var flag = true;
  for (var i = 0; i < tileCount; ++i) {
    for (var j = 0; j < tileCount; ++j) {
      if (boardParts[i][j].x != i || boardParts[i][j].y != j) {
        flag = false;
      }
    }
  }
  solved = flag;
}
