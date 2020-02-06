const BOARD_SIZE = 7;
const board = [];

const boardHTML = document.querySelector("#board");
const controlsHTML = document.querySelector("#controls");

let currentPlayerHTML;
let gameEnded = false;

let gameId = '';
let playerColor = 'red';
let playerTurn = 'red';
let unsubscribe;

window.onload = initGame;