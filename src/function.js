function setCharAt(str, index, chr) {
    if (index > str.length - 1) {
        return str;
    }

    return str.substr(0, index) + chr + str.substr(index + 1);
}

function subscribe(id) {
    unsubscribe = gamesStore.doc(id).onSnapshot((snap) => {
        playerTurn = snap.data().player;

        console.debug(playerTurn, playerColor);

        if (snap.data().ready) {
            loading('waiting', false);
            document.querySelector('#info-alert-text').innerText = 'Have fun !';
        }

        document.querySelector('#player-color').classList.value = `token ${playerColor}`;
        document.querySelector('#player-turn').classList.value = `token ${playerTurn}`;

        board = snap.data().grid;
        drawBoard();

        gameEnded = snap.data().winner !== '';

        if (gameEnded) {
            document.querySelector('#info-alert-text').innerText = `${snap.data().winner} won !`;
        }

        setChat(snap.data().chat);
    });
}

function loading(type, state) {
    document.querySelectorAll(`.spinner-${type}`).forEach((loader) => {
        loader.style.display = state ? 'inline-block' : 'none';
    });
}

function newGame() {
    loading('newgame', true);

    if (unsubscribe) unsubscribe();

    gamesStore
        .add({
            player: 'red',
            grid: new Array(BOARD_SIZE).fill('0'.repeat(BOARD_SIZE)),
            winner: '',
            ready: false,
            chat: []
        })
        .then((snap) => {
            gameId = snap.id;
            document.querySelector('#game-id').value = snap.id;
            playerColor = 'red';
            document.querySelector('#player-color').classList.value = `token ${playerColor}`;
            document.querySelector('#player-turn').classList.value = `token ${playerColor}`;
            subscribe(snap.id);
            loading('newgame', false);

            loading('waiting', true);
            document.querySelector('#info-alert-text').innerText =
                'Please wait for your opponent to connect.';
        });
}

function connect() {
    loading('connect', true);

    if (unsubscribe) unsubscribe();

    const writtenId = document.querySelector('#game-id').value;

    gamesStore
        .doc(writtenId)
        .get()
        .then((snap) => {
            gameId = snap.id;
            playerColor = 'yellow';
            document.querySelector('#player-color').classList.value = `token ${playerColor}`;
            document.querySelector('#player-turn').classList.value = `token ${
                playerColor === 'red' ? 'yellow' : 'red'
            }`;
            subscribe(snap.id);

            return gamesStore.doc(writtenId).update({
                ready: true
            });
        })
        .then(() => {
            loading('connect', false);
        })
        .catch((e) => {
            gameId = '';
            console.error('unable to connect to game ' + writtenId, e);
            document.querySelector('#game-id').value = '';
            loading('connect', false);
        });
}

/**
 * @param column {number}
 */
function putInColumn(column) {
    if (playerColor !== playerTurn) return;

    let firstAvailableRow = -1;

    for (let i = BOARD_SIZE - 1; i >= 0; i--) {
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
        } else {
            board[firstAvailableRow] = setCharAt(board[firstAvailableRow], column, 'Y');

            playerTurn = 'red';

            gameEnded = gameIsEnded('Y', firstAvailableRow, column);
        }

        document.querySelector('#player-turn').classList.value = `token ${
            playerColor === 'red' ? 'yellow' : 'red'
        }`;

        if (gameEnded) {
            gamesStore.doc(gameId).delete();
        } else {
            gamesStore.doc(gameId).set({
                player: playerColor === 'red' ? 'yellow' : 'red',
                grid: board,
                winner: gameEnded ? playerColor : '',
            });
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

    document.querySelector('#info-alert-text').innerText =
        'Press "New game" to host a game, then copy the ID to you friend or paste an ID in the field then press connect to play.';
}