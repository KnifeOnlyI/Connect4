function setCharAt(str, index, chr) {
    if (index > str.length - 1) {
        return str;
    }

    return str.substr(0, index) + chr + str.substr(index + 1);
}

function subscribe(id) {
    unsubscribe = gamesStore.doc(id).onSnapshot((snap) => {
        console.debug('snap.data()', snap.data());
        playerTurn = snap.data().player;
        document.getElementById('currentPlayer').innerText = playerTurn;
        console.debug('next turn', playerTurn);
    });
}

function loading(state) {
    document.querySelectorAll('.spinner-border').forEach((loader) => {
        loader.style.display = state ? 'inline-block' : 'none';
    });
}

function newGame() {
    loading(true);

    if (unsubscribe) unsubscribe();

    gamesStore
        .add({
            player: 'red',
            grid: new Array(BOARD_SIZE).fill('0'.repeat(BOARD_SIZE)),
            winner: '',
        })
        .then((snap) => {
            gameId = snap.id;
            document.querySelector('#game-id').value = snap.id;
            playerColor = 'red';
            document.querySelector('#playerColor').innerText = playerColor;
            subscribe(snap.id);
            loading(false);
        });
}

function connect() {
    loading(true);

    if (unsubscribe) unsubscribe();

    const writtenId = document.querySelector('#game-id').value;

    console.debug('attempting to connect to', writtenId);

    gamesStore
        .doc(writtenId)
        .get()
        .then((snap) => {
            gameId = snap.id;
            playerColor = 'yellow';
            document.querySelector('#playerColor').innerText = playerColor;
            subscribe(snap.id);
            loading(false);
        })
        .catch((e) => {
            gameId = '';
            console.error('unable to connect to game ' + writtenId, e);
            document.querySelector('#game-id').value = '';
            loading(false);
        });
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
        if (playerColor === 'red') {
            board[firstAvailableRow] = setCharAt(board[firstAvailableRow], column, 'R');

            playerTurn = 'yellow';

            gameEnded = gameIsEnded('R', firstAvailableRow, column);

            if (gameEnded) {
                window.alert('Red player win. Fatality !');
            }
        } else {
            board[firstAvailableRow] = setCharAt(board[firstAvailableRow], column, 'Y');

            playerTurn = 'red';

            gameEnded = gameIsEnded('Y', firstAvailableRow, column);

            if (gameEnded) {
                window.alert('Yellow player win. Fatality !');
            }
        }

        document.getElementById('currentPlayer').innerText = playerColor === 'red' ? 'yellow' : 'red';

        gamesStore.doc(gameId).set({
            player: playerColor === 'red' ? 'yellow' : 'red',
        });

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
    currentPlayerHTML.innerText = playerColor;
}