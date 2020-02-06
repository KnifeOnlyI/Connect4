const BOARD_SIZE = 7;
const board = [];

const boardHTML = document.querySelector("#board");
const controlsHTML = document.querySelector("#controls");

let currentPlayerHTML;
let gameEnded = false;

window.onload = initGame;