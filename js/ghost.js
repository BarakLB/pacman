'use strict'
const GHOST = '&#9781;';

var gGhosts = []
var gKilledGhosts = []
var gIntervalGhosts;

function createGhost(board) {
    // DONE
    var ghost = {
        location: {
            i: 5,
            j: 6
        },
        currCellContent: FOOD,
        color: getRandomColor()
    }

    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    // DONE: 3 ghosts and an interval
    gGhosts = []
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    // DONE: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    // TODO: figure out moveDiff, nextLocation, nextCell
    var moveDiff = getMoveDiff()
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j,
    }

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // TODO: return if cannot move
    if (nextCell === WALL) return
    if (nextCell === GHOST) return
    // TODO: hitting a pacman?  call gameOver
    if (nextCell === PACMAN) {
        gameOver(`Sorry... You Lost!\nYoure Score:${gGame.score}`)
        return
    }

    // TODO: moving from current position:
    // TODO: update the model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // TODO: update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // TODO: Move the ghost to new location
    // TODO: update the model
    ghost.location = nextLocation
    ghost.currCellContent = nextCell
    gBoard[ghost.location.i][ghost.location.j] = GHOST
    // TODO: update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 100);
    if (randNum <= 25) {
        return { i: 0, j: 1 }
    } else if (randNum <= 50) {
        return { i: -1, j: 0 }
    } else if (randNum <= 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function getGhostHTML(ghost) {
    if (gPacman.isSuper) return `<span style="background-color:hotpink">${GHOST}</span>`
    else return `<span style="background-color:${ghost.color};">${GHOST}</span>`
}

function getGhostIdxByLoc(nextLocation) {
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === nextLocation.i &&
            gGhosts[i].location.j === nextLocation.j) return i
    }
    return -1
}


function resetGhost() {
    for (var i = 0; i < gKilledGhosts.length; i++) {
        gGhosts.push(gKilledGhosts[i])
    }
    gKilledGhosts = []

}

function killGhost(nextLocation) {
  
    var ghostToKillIdx = getGhostIdxByLoc(nextLocation)
    if (ghostToKillIdx === -1) return
    var ghostToKill = gGhosts[ghostToKillIdx]
    if (ghostToKill && ghostToKill.currCellContent === FOOD) {
        ghostToKill.currCellContent === EMPTY
        updateScore(3)
        
    }
    gGhosts.splice(ghostToKillIdx, 1)
    gKilledGhosts.push(ghostToKill);
     
    console.log(gKilledGhosts);
}
