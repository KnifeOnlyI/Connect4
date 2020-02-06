/**
 * @param color {string}
 * @param row {number}
 * @param column {number}
 */
function checkAtRight(color, row, column) {
    let nb = 0;
    let currentColumn = column + 1;

    // Check at right
    while (currentColumn < BOARD_SIZE) {
        if (board[row][currentColumn] === color) {
            nb++;
        } else {
            break;
        }

        currentColumn++;
    }

    return nb;
}

/**
 * @param color {string}
 * @param row {number}
 * @param column {number}
 */
function checkAtLeft(color, row, column) {
    let nb = 0;
    let currentColumn = column - 1;

    // Check at right
    while (currentColumn >= 0) {
        if (board[row][currentColumn] === color) {
            nb++;
        } else {
            break;
        }

        currentColumn--;
    }

    return nb;
}

/**
 * @param color {string}
 * @param row {number}
 * @param column {number}
 */
function checkAtBottom(color, row, column) {
    let nb = 0;
    let currentRow = row + 1;

    // Check at bottom
    while (currentRow < BOARD_SIZE) {
        if (board[currentRow][column] === color) {
            nb++;
        } else {
            break;
        }

        currentRow++;
    }

    return nb;
}

/**
 * @param color {string}
 * @param row {number}
 * @param column {number}
 */
function checkAtTopRight(color, row, column) {
    let nb = 0;
    let currentRow = row - 1;
    let currentColumn = column + 1;

    // Check at bottom
    while ((currentRow >= 0) && (currentColumn < BOARD_SIZE)) {
        if (board[currentRow][currentColumn] === color) {
            nb++;
        } else {
            break;
        }

        currentRow--;
        currentColumn++;
    }

    return nb;
}

/**
 * @param color {string}
 * @param row {number}
 * @param column {number}
 */
function checkAtBottomLeft(color, row, column) {
    let nb = 0;
    let currentRow = row + 1;
    let currentColumn = column - 1;

    // Check at bottom
    while ((currentRow < BOARD_SIZE) && (currentColumn >= 0)) {
        if (board[currentRow][currentColumn] === color) {
            nb++;
        } else {
            break;
        }

        currentRow++;
        currentColumn--;
    }

    return nb;
}

/**
 * @param color {string}
 * @param row {number}
 * @param column {number}
 */
function checkAtTopLeft(color, row, column) {
    let nb = 0;
    let currentRow = row - 1;
    let currentColumn = column - 1;

    // Check at bottom
    while ((currentRow >= 0) && (currentColumn >= 0)) {
        if (board[currentRow][currentColumn] === color) {
            nb++;
        } else {
            break;
        }

        currentRow--;
        currentColumn--;
    }

    return nb;
}

/**
 * @param color {string}
 * @param row {number}
 * @param column {number}
 */
function checkAtBottomRight(color, row, column) {
    let nb = 0;
    let currentRow = row + 1;
    let currentColumn = column + 1;

    // Check at bottom
    while ((currentRow < BOARD_SIZE) && (currentColumn < BOARD_SIZE)) {
        if (board[currentRow][currentColumn] === color) {
            nb++;
        } else {
            break;
        }

        currentRow++;
        currentColumn++;
    }

    return nb;
}

/**
 * @param color {string}
 * @param row {number}
 * @param column {number}
 *
 * @return {boolean} TRUE if game is ended, FALSE otherwise
 */
function gameIsEnded(color, row, column) {
    let nbAtRight = checkAtRight(color, row, column);
    let nbAtLeft = checkAtLeft(color, row, column);
    let nbAtBottom = checkAtBottom(color, row, column);
    let nbAtTopRight = checkAtTopRight(color, row, column);
    let nbAtBottomLeft = checkAtBottomLeft(color, row, column);
    let nbAtTopLeft = checkAtTopLeft(color, row, column);
    let nbAtBottomRight = checkAtBottomRight(color, row, column);

    return (
        (nbAtRight + nbAtLeft + 1) >= 4 ||
        (nbAtBottom + 1) >= 4 ||
        (nbAtTopRight + nbAtBottomLeft + 1) >= 4 ||
        (nbAtTopLeft + nbAtBottomRight + 1) >= 4
    );
}