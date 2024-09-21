const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const resultDisplay = document.getElementById('result');
const resultMessage = document.getElementById('result-message');
const newGameButton = document.getElementById('new-game');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill('');

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(clickedCell, clickedCellIndex) {
    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;
    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        resultMessage.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (!gameState.includes('')) {
        resultMessage.textContent = 'It\'s a draw!';
        gameActive = false;
    }

    if (!gameActive) {
        showResult();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function showResult() {
    resultDisplay.classList.remove('hidden');
    board.classList.add('hidden');
}

function handleReset() {
    gameActive = true;
    currentPlayer = 'X';
    gameState.fill('');
    cells.forEach(cell => {
        cell.textContent = '';
    });
    resultDisplay.classList.add('hidden');
    board.classList.remove('hidden');
}

function handleNewGame() {
    handleReset();
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(cell, index));
});

resetButton.addEventListener('click', handleReset);
newGameButton.addEventListener('click', handleNewGame);
