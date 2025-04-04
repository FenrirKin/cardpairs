const gameBoard = document.getElementById('game-board');
const movesElement = document.getElementById('moves');
const timeElement = document.getElementById('time');
const easyButton = document.getElementById('easy-btn');
const mediumButton = document.getElementById('medium-btn');
const hardButton = document.getElementById('hard-btn');

let cards = [];
let flippedCards = [];
let matchedCards = [];
let moves = 0;
let timer;
let seconds = 0;
let minutes = 0;
let isGameOver = false;
let gridSize = 4; // Default to 4x4 (medium)