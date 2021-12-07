'use strict'
const PACMAN = '😷';

var gPacman;
function createPacman(board) {
    // TODO
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    // TODO: use getNextLocation(), nextCell
    if (!gGame.isOn) return
    // console.log(gPacman.location);
    var nextLocation = getNextLocation(ev)
    var nextCell = gBoard[nextLocation.i][nextLocation.j]


    if (nextCell === WALL) return;
    if (nextCell === GHOST) {
        if (!gPacman.isSuper) {
            gameOver(`Sorry... You Lost\nYoure Score:${gGame.score}`);
            renderCell(gPacman.location, EMPTY)
            return;
        } else {
            killGhost(nextLocation)
        }
    }


    if (nextCell === FOOD){
        updateScore(1)
     gFoodCount--
     checkVictory()
    }
    
    if (nextCell === SUPERFOOD) {
        
        if (gPacman.isSuper) return;
        gFoodCount--
        eatSuperFood()

    }

    if (nextCell === CHERRY) {
        updateScore(10)
    }

    // TODO: moving from current position:
    // TODO: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // TODO: update the DOM
    renderCell(gPacman.location, EMPTY)
    // TODO: Move the pacman to new location
    // TODO: update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // TODO: update the DOM
    renderCell(gPacman.location, PACMAN)
}


function getNextLocation(eventKeyboard) {

    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    // TODO: figure out nextLocation
    switch (eventKeyboard.key) {
        case 'ArrowUp':
            nextLocation.i--
            break
        case 'ArrowDown':
            nextLocation.i++
            break
        case 'ArrowRight':
            nextLocation.j++
            break
        case 'ArrowLeft':
            nextLocation.j--
            break
        default:
            return null

    }

    return nextLocation;
}


function eatSuperFood() {
    checkVictory()
    gPacman.isSuper = true
    updateScore(1)
    setTimeout(function () {
        gPacman.isSuper = false
        resetGhost()
    }, 5000)

}
