window.onload = registerAllEventHandlers
function registerAllEventHandlers() {
    registerPositionClick()
    registerTurnIndicatorClick()
}
function print(...params) {
    console.log(...params)
}

const positions = Array.from(document.getElementsByClassName("position"))
const turnIndicator = document.getElementById("turn-indicator")
const winText = document.getElementById("win-text")

const Sign = {
    x: "<img class=\"img-fluid\" src=\"img/X.png\" alt=\"❌\">",
    o: "<img class=\"img-fluid\" src=\"img/O.png\" alt=\"⭕\">"
}

var gameState = [".", ".", ".", ".", ".", ".", ".", ".", "."]
var currentTurn = "x"

function registerPositionClick() {
    positions.forEach(position => {
        position.addEventListener("click", () => {
            main(positions, position)
        })
    });
}

function registerTurnIndicatorClick() {
    turnIndicator.addEventListener("click", flipTurn)
}
function flipTurn() {
    if (currentTurn === "x") {
        turnIndicator.innerHTML = Sign.o
        currentTurn = "o"
    } else if (currentTurn === "o") {
        turnIndicator.innerHTML = Sign.x
        currentTurn = "x"
    }
}

function main(positions, position) {
    turnIndicator.disabled = true
    if (gameState[position.id] != ".") {
        return
    }
    if (currentTurn === "x") {
        position.innerHTML = Sign.x
        gameState[position.id] = "x"
    } else if (currentTurn === "o") {
        position.innerHTML = Sign.o
        gameState[position.id] = "o"
    }
    flipTurn()
    print(gameState)
    checkVictory(positions)
}

function checkVictory(positions) {
    const winPatterns = [[0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]]
    for (const i in winPatterns) {
        const pat = winPatterns[i].map(pos => gameState[pos])  // returns the values of the gameState at the pattern positions
        if (pat[0] === pat[1] && pat[1] === pat[2]) {
            print(pat[0], pat[1], pat[2])
            if (pat[0] === "x") {
                applyVictory("x", pat, positions)
            } else if (pat[0] === "o") {
                applyVictory("o", pat, positions)
            }
        }
    }
}
function applyVictory(winner, pat, positions) {
    positions.forEach(position => {
        position.disabled = true
        if (pat.includes(Number(position.id))) {
            position.style.background = "green"
        }
    })
    turnIndicator.innerHTML = Sign[winner]
    turnIndicator.style.background = "green"
    winText.textContent = "Winner!"
    print(winner, pat)
}
