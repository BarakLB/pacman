'use strict'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' ';
const SUPERFOOD = '🥩'
const CHERRY = '🍒'

var gFoodCount = 60;
var gCherryInterval;
var gBoard;
var gGame = {
    score: 0,
    isOn: false
}

function init() {
    closeModal();
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true
    gFoodCount = 60
}

function buildBoard() {
    const SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
            }
        }
    }
    board[1][1] = SUPERFOOD
    board[1][SIZE - 2] = SUPERFOOD
    board[SIZE - 2][1] = SUPERFOOD
    board[SIZE - 2][SIZE - 2] = SUPERFOOD
    board[SIZE - 2][SIZE - 2] = SUPERFOOD
    gCherryInterval = setInterval(() => {
        var idx = findEmptyCell()
        if (!idx) return
        board[idx.i][idx.j] = CHERRY
        renderCell(idx, CHERRY)
    }, 15000);
    return board;
}

function checkVictory() {
    if (gFoodCount === 0) {
        gameOver(`We Have a Winner!\nYoure Score:${gGame.score}`)
    }
}

function updateScore(diff) {
    // TODO: update model and dom
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
    // console.log('gGame.score:', gGame.score);

}

function gameOver(str) {
    console.log('Game Over');
    clearInterval(gIntervalGhosts)
    renderCell(gPacman.location, '🪦')
    gGame.isOn = false
    gGame.score = 0
    openModal(str)
    clearInterval(gCherryInterval)
    // TODO
}

function openModal(string) {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'block'
    elModal.style.backgroundColor = getRandomColor()
    var elModalP = document.querySelector('.modal p')
    elModalP.innerText = string
}

function closeModal() {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
}

function findEmptyCell() {
    const SIZE = 10;
    var emptyCells = []
    for (var i = 0; i < SIZE - 1; i++) {
        for (var j = 0; j < SIZE - 1; j++) {
            // var randJ = getRandomInt(0,SIZE-1)
            if (gBoard[i][j] === EMPTY) emptyCells.push({ i, j })
        }
    }
    var randIdx = getRandomInt(0, emptyCells.length)
    // console.log(emptyCells[randIdx])
    return emptyCells[randIdx]
}