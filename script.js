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

function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

function generateCards() {
        const numPairs = (gridSize * gridSize) / 2;
        const cardValues = [];
        for (let i = 0; i < numPairs; i++) {
          cardValues.push(String.fromCharCode(65 + i), String.fromCharCode(65 + i)); // A, B, C, etc.
        }
        return shuffle(cardValues);
      }
      

function createBoard() {
        gameBoard.innerHTML = '';
        const cardValues = generateCards();
      
        cardValues.forEach((value, index) => {
          const cardElement = document.createElement('div');
          cardElement.classList.add('card');
          cardElement.dataset.index = index;
          cardElement.dataset.value = value;
          cardElement.addEventListener('click', flipCard);
          gameBoard.appendChild(cardElement);
        });
      
        gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
      }
