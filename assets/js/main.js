var firstCardClicked = null;
var secondCardClicked = null;
var firstCardClasses, secondCardClasses;
var cardTotal;
var matches = 0;
var gameField = document.getElementById('gameCards');
var games = document.getElementById('games').textContent;
var attempts = document.getElementById('attempts').textContent;
var minutes = document.getElementById('minutes').textContent;
var seconds = document.getElementById('seconds').textContent;
var finalTime = document.createElement('p');
var resetButton = document.getElementById('reset');
var timer;
var cards = [
  'spotify',
  'itunes',
  'pandora',
  'amazon',
  'google',
  'tidal',
  'iheart',
  'deezer',
  'livexlive',
];
var fullDeck;
var startButton = document.getElementById('start-game');

startButton.addEventListener('click', getSizeOfBoard);
startButton.addEventListener('click', startGame);


function getSizeOfBoard(e) {
  var selectElement = e.target.previousElementSibling;
  var boardSize = selectElement.value;
  if (boardSize === 'sm-board') {
    cardTotal = 3;
  } else if (boardSize === 'md-board') {
    cardTotal = 6;
  } else if (boardSize === 'lg-board') {
    cardTotal = 9;
  }
  differentCards(cards);
  fullDeck = [];
  for (var i = 0; i < cardTotal; i++) {
    for (var j = 0; j <= 1; j++) {
      fullDeck.push(cards[i]);
    }
  }
}

function handleClick(event) {
  if (event.target.className.indexOf('card-back') === -1) {
    return;
  }
  var hideCard = event.target;
  hideCard.classList.add('hidden');
  if (firstCardClicked === null) {
    firstCardClicked = event.target;
    firstCardClasses = firstCardClicked.previousElementSibling.className;
  } else {
    gameField.removeEventListener('click', handleClick);
    secondCardClicked = event.target;
    secondCardClasses = secondCardClicked.previousElementSibling.className;
    attempts++;
    document.getElementById('attempts').textContent = attempts;
    if (firstCardClasses === secondCardClasses) {
      gameField.addEventListener('click', handleClick);
      firstCardClicked = null;
      secondCardClicked = null;
      matches++;
      displayAccuracy();
      if (matches === cardTotal) {
        var cardFronts = document.querySelectorAll('.card');
        for (var i = 0; i < cardFronts.length; i++) {
          cardFronts[i].classList.add('card-animation');
        }
        games++;
        document.getElementById('games').textContent = games;
        clearInterval(timer);
        finalTimer();
        setTimeout(function () {
          document.getElementById('congrats-message').classList.remove('hidden');
          }, 5000);
      }
    } else {
      displayAccuracy();
      setTimeout(function(){
        firstCardClicked.classList.remove('hidden');
        secondCardClicked.classList.remove('hidden');
        gameField.addEventListener('click', handleClick);
        firstCardClicked = null;
        secondCardClicked = null;
      }, 1500);
    }
  }
}

function createCards() {
  for (var i = 0; i < fullDeck.length; i++) {
    var newElement = document.createElement('div');
    document.getElementById('gameCards').appendChild(newElement);
    newElement.classList.add('card');
    if (fullDeck.length === 6) {
      newElement.classList.add('col-4');
      newElement.classList.add('col-6-ldscape');
      newElement.classList.add('small-height');
    } else if (fullDeck.length === 12) {
      newElement.classList.add('col-3');
      newElement.classList.add('col-4-ldscape');
      newElement.classList.add('medium-height');
    } else if (fullDeck.length === 18) {
      newElement.classList.add('col-2');
      newElement.classList.add('col-4-small');
      newElement.classList.add('col-3-medium');
      newElement.classList.add('large-height');
    }
  }
  var frontBack = document.querySelectorAll('.card');
  for (var k = 0; k < frontBack.length; k++) {
    var newCardFront = document.createElement('div');
    var newCardBack = document.createElement('div');
    frontBack[k].appendChild(newCardFront);
    frontBack[k].appendChild(newCardBack);
    newCardFront.classList.add('card-front');
    newCardBack.classList.add('card-back');
  }
}

function shuffle() {
  differentCards(fullDeck);
  var newCard = document.querySelectorAll('.card-front');
  for (var j = 0; j < newCard.length; j++) {
    newCard[j].classList.add(fullDeck[j]);
  }
}

function differentCards(array) {
  var currentIndex = array.length;
  var temporaryValue, randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    --currentIndex;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
}

function resetCards() {
  var newBool = document.getElementById('gameCards').hasChildNodes();
  while (newBool) {
    var deleteElement = document.querySelector('.card');
    if (deleteElement) {
      document.getElementById('gameCards').removeChild(deleteElement);
    } else {
      break;
    }
  }
}

function resetGame(event) {
  if (event.target.id.indexOf('reset') === -1) {
    return;
  }
  attempts = 0;
  matches = 0;
  document.getElementById('attempts').textContent = attempts;
  document.getElementById('accuracy').textContent = 0 + '%';
  document.getElementById('congrats-message').classList.add('hidden');
  resetCards();
  createCards();
  shuffle();
  document.getElementById('congrats-message').removeChild(finalTime);
  timer = setInterval(timerStart, 1000);
}

function displayAccuracy() {
  document.getElementById('accuracy').textContent = (Math.trunc((matches / attempts) * 10000) / 100) + '%';
}

function timerStart() {
  if (seconds === 59) {
    document.getElementById('minutes').textContent = ++minutes;
    seconds = 0;
    document.getElementById('seconds').textContent = '0' + seconds;
  } else if (seconds >= 9) {
    document.getElementById('seconds').textContent = ++seconds;
  } else {
    document.getElementById('seconds').textContent = '0' + ++seconds;
  }
}

function finalTimer() {
  if (minutes > 1) {
    finalTime.textContent = 'Total Time: ' + minutes + ' minutes' + ' and ';
  } else if (minutes === 1) {
    finalTime.textContent = 'Total Time: ' + minutes + ' minute' + ' and ';
  } else {
    finalTime.textContent = 'Total Time: ';
  }
  secondsTimer();
  document.getElementById('congrats-message').appendChild(finalTime);
}

function secondsTimer() {
  var secondsMessage;
  if (seconds > 1) {
    secondsMessage = seconds + ' seconds.';
  } else if (seconds === 1) {
    secondsMessage = seconds + ' second.';
  } else if (seconds === 0) {
    secondsMessage = 'no seconds!';
  }
  finalTime.textContent += secondsMessage;
}

function startGame() {
  timer = setInterval(timerStart, 1000);
  document.getElementById('start-message').classList.add('hidden');
  createCards();
  shuffle();
  gameField.addEventListener('click', handleClick);
  resetButton.addEventListener('click', getSizeOfBoard);
  resetButton.addEventListener('click', resetGame);
}
