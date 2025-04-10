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

// Set up the timer
function startTimer() {
  timer = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    timeElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, 1000);
}

//Stop the timer
function stopTimer() {
  clearInterval(timer);
}

//Shuffle cards
function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

//Generate cards for board based on grid size
function generateCards() {
        const numPairs = (gridSize * gridSize) / 2;
        const cardValues = [];
        for (let i = 0; i < numPairs; i++) {
          cardValues.push(String.fromCharCode(65 + i), String.fromCharCode(65 + i)); // A, B, C, etc.
        }
        return shuffle(cardValues);
      }
      
//Create the board
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

//Card flipping logic
function flipCard(event) {
  if (isGameOver || flippedCards.length === 2) return;

  const card = event.target;
  if (card.classList.contains('flipped') || matchedCards.includes(card)) return;

  card.classList.add('flipped');
  card.textContent = card.dataset.value;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

//Check if flipped cards match
function checkMatch() {
  const [cardOne, cardTwo] = flippedCards;
  moves++;
  movesElement.textContent = moves;

  if (cardOne.dataset.value === cardTwo.dataset.value) {
    cardOne.classList.add('matched');
    cardTwo.classList.add('matched');
    matchedCards.push(cardOne, cardTwo);
    flippedCards = [];

    if (matchedCards.length === cards.length) {
      isGameOver = true;
      stopTimer();
      setTimeout(() => alert('You won!'), 500);
    }
  } else {
    setTimeout(() => {
      cardOne.classList.remove('flipped');
      cardTwo.classList.remove('flipped');
      cardOne.textContent = '';
      cardTwo.textContent = '';
      flippedCards = [];
    }, 1000);
  }
}

//Reset game
function resetGame() {
  moves = 0;
  seconds = 0;
  minutes = 0;
  matchedCards = [];
  flippedCards = [];
  isGameOver = false;
  movesElement.textContent = moves;
  timeElement.textContent = '00:00';
  createBoard();
  startTimer();
}

//Set difficulty
easyButton.addEventListener('click', () => {
  gridSize = 4; // Easy: 4x4 grid
  resetGame();
});
      
mediumButton.addEventListener('click', () => {
  gridSize = 6; // Medium: 6x6 grid
  resetGame();
});
      
hardButton.addEventListener('click', () => {
  gridSize = 8; // Hard: 8x8 grid
  resetGame();
});
      
// Start the game
  resetGame();