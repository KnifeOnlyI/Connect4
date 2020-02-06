const BOARD_SIZE = 7;

const board = [];

let currentPlayerHTML;

let gameId = '';
let playerColor = 'red';
let unsubscribe;

// TODO: Add endgame detection

/**
 * @param column {number}
 */
let putInColumn = (column) => {
    let firstAvailableRow = -1;

    for (let i = BOARD_SIZE - 1; i >= 0; i--) {
        if (!board[i][column].className) {
            firstAvailableRow = i;
            break;
        }
    }
    if (firstAvailableRow !== -1) {
        if (currentPlayerHTML.innerText === 'red') {
            board[firstAvailableRow][column].className = 'red';
            currentPlayerHTML.innerText = 'Yellow';
        } else {
            board[firstAvailableRow][column].className = 'yellow';
            currentPlayerHTML.innerText = 'red';
        }

        gamesStore.doc(gameId).set({
            player: playerColor,
        });
    }
};

function subscribe(id) {
    unsubscribe = gamesStore.doc(id).onSnapshot((snap) => {
        console.debug('in snap', snap.data().player);
        // Update only if turn is played byt the other player
        if (snap.data().player !== playerColor) {
            console.debug('other player played');
        }
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

window.onload = () => {
    const tbody = document.getElementById('board');
    const thead_tr = document.getElementById('control');

    // Generate control buttons
    for (let i = 0; i < BOARD_SIZE; i++) {
        const th = document.createElement('th');
        const button = document.createElement('button');

        button.onclick = () => {
            putInColumn(i);
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
    currentPlayerHTML.innerText = playerColor;
};
