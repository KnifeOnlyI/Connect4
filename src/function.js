/**
 * @param column {number}
 */
let putInColumn = (column) => {
    let firstAvailableRow = -1;

    for (let i = (BOARD_SIZE - 1); i >= 0; i--) {
        if (!board[i][column].className) {
            firstAvailableRow = i;
            break;
        }
    }

    if (firstAvailableRow !== -1) {
        if (currentPlayerHTML.innerText === 'red') {
            board[firstAvailableRow][column].className = 'red';
            currentPlayerHTML.innerText = 'Yellow';

            gameEnded = gameIsEnded('red', firstAvailableRow, column);

            if (gameEnded) {
                window.alert('Red player win. Fatality !');
            }
        } else {
            board[firstAvailableRow][column].className = 'yellow';
            currentPlayerHTML.innerText = 'red';

            gameEnded = gameIsEnded('yellow', firstAvailableRow, column);

            if (gameEnded) {
                window.alert('Yellow player win. Fatality !');
            }
        }
    }
};

let initGame = () => {
    const tbody = document.getElementById('board');
    const thead_tr = document.getElementById('control');

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
        thead_tr.appendChild(th);
    }

    // Generate the game map
    for (let i = 0; i < BOARD_SIZE; i++) {
        board.push([]);
        const tr = document.createElement('tr');

        for (let j = 0; j < BOARD_SIZE; j++) {
            const td = document.createElement('td');

            tr.appendChild(td);

            board[i].push(td);
        }

        tbody.appendChild(tr);
    }

    currentPlayerHTML = document.getElementById('currentPlayer');
    currentPlayerHTML.innerText = 'Yellow';
};