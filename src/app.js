const BOARD_SIZE = 7;

const boardHTML = document.querySelector("#board");
const controlsHTML = document.querySelector("#controls");

let board = [];

let gameEnded = false;

let gameId = '';
let playerColor = 'red';
let playerTurn = 'red';
let unsubscribe;
let counterTimeout;
let lastMove;

let gameChat = [];

window.onload = initGame;