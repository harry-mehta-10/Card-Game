let moves = 0;
let flippedCards = [];
const cardValues = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCardElement(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.addEventListener('click', handleCardClick);
    return card;
}

function handleCardClick() {
    const card = this;

    if (!card.classList.contains('face-up') && flippedCards.length < 2) {
        card.classList.add('face-up');

        const cardValue = parseInt(card.dataset.value);
        const newImage = getRandomCardImage(cardValue);
        card.style.backgroundImage = `url(${newImage})`;

        flippedCards.push(card);

        if (flippedCards.length === 2) {
            moves++;
            document.getElementById('moves').textContent = moves;
            checkForMatch();
        }
    }
}

function getRandomCardImage(value) {
    return `Assets/card${value}.png`;
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    const value1 = card1.dataset.value;
    const value2 = card2.dataset.value;

    if (value1 === value2) {
        flippedCards = [];
        checkForWin();
    } else {
        setTimeout(() => {
            card1.classList.remove('face-up');
            card2.classList.remove('face-up');
            card1.style.backgroundImage = `url('./Assets/card.jpg')`;
            card2.style.backgroundImage = `url('./Assets/card.jpg')`;
            flippedCards = [];
            checkForWin();
        }, 1000);
    }
}

function checkForWin() {
    const allCards = document.querySelectorAll('.card');
    if (Array.from(allCards).every(card => card.classList.contains('face-up'))) {
        alert(`Congratulations! You won in ${moves} moves.`);
        resetGame();
    }
}

function resetGame() {
    moves = 0;
    document.getElementById('moves').textContent = moves;

    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
        card.classList.remove('face-up');
    });

    shuffledCards = shuffle(cardValues);
    renderCards(shuffledCards);
}

function renderCards(cardValues) {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';

    cardValues.forEach(value => {
        const card = createCardElement(value);
        gameContainer.appendChild(card);
    });
}

document.getElementById('reset-btn').addEventListener('click', resetGame);

let shuffledCards = shuffle(cardValues);
renderCards(shuffledCards);
