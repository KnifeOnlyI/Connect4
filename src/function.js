function setCharAt(str, index, chr) {
    if (index > str.length - 1) {
        return str;
    }

    return str.substr(0, index) + chr + str.substr(index + 1);
}

/**
 * @param column {number}
 */
function putInColumn(column) {
    let firstAvailableRow = -1;

    for (let i = (BOARD_SIZE - 1); i >= 0; i--) {
        if (board[i][column] === '0') {
            firstAvailableRow = i;
            break;
        }
    }

    if (firstAvailableRow !== -1) {
        if (currentPlayerHTML.innerText === 'red') {
            board[firstAvailableRow] = setCharAt(board[firstAvailableRow], column, 'R');

            currentPlayerHTML.innerText = 'Yellow';

            gameEnded = gameIsEnded('R', firstAvailableRow, column);

            if (gameEnded) {
                window.alert('Red player win. Fatality !');
            }
        } else {
            board[firstAvailableRow] = setCharAt(board[firstAvailableRow], column, 'Y');
            currentPlayerHTML.innerText = 'red';

            gameEnded = gameIsEnded('Y', firstAvailableRow, column);

            if (gameEnded) {
                window.alert('Yellow player win. Fatality !');
            }
        }

        drawBoard();
    }
}

function initControls() {
    // Generate control buttons
    for (let i = 0; i < BOARD_SIZE; i++) {
        const th = document.createElement('th');
        const button = document.createElement('button');

        button.onclick = () => {
            if (!gameEnded) {
                putInColumn(i);
            }
        };

        th.className = 'text-center';

        th.appendChild(button);
        controlsHTML.appendChild(th);
    }
}

function initBoard() {
    for (let i = 0; i < BOARD_SIZE; i++) {
        let rowContent = '';

        for (let j = 0; j < BOARD_SIZE; j++) {
            rowContent += '0';
        }

        board.push(rowContent);
    }

    drawBoard();
}

function drawBoard() {
    boardHTML.innerHTML = '';

    // Generate the game map
    for (let i = 0; i < BOARD_SIZE; i++) {
        const tr = document.createElement('tr');

        for (let j = 0; j < BOARD_SIZE; j++) {
            const td = document.createElement('td');

            if (board[i][j] === 'Y') {
                td.className = 'yellow';
            } else if (board[i][j] === 'R') {
                td.className = 'red';
            }

            tr.appendChild(td);
        }

        boardHTML.appendChild(tr);
    }
}

function initGame() {
    initControls();
    initBoard();

    currentPlayerHTML = document.getElementById('currentPlayer');
    currentPlayerHTML.innerText = 'Yellow';
}