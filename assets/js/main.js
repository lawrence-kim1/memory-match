var firstCardClicked = null;
var secondCardClicked = null;
var firstCardClasses, secondCardClasses;
var maxMatches = 9;
var matches = 0;
var gameField = document.getElementById('gameCards');
var games = document.getElementById('games').textContent;
var attempts = document.getElementById('attempts').textContent;
var resetButton = document.getElementById('reset');
var minutes = document.getElementById('minutes').textContent;
var seconds = document.getElementById('seconds').textContent;
var finalTime = document.createElement('p');
var cards = [
  'css-logo',
  'docker-logo',
  'gitHub-logo',
  'html-logo',
  'js-logo',
  'mysql-logo',
  'node-logo',
  'php-logo',
  'react-logo',
  'css-logo',
  'docker-logo',
  'gitHub-logo',
  'html-logo',
  'js-logo',
  'mysql-logo',
  'node-logo',
  'php-logo',
  'react-logo'
];
var timer = setInterval(timerStart, 1000);

createCards();
shuffle(cards);
gameField.addEventListener('click', handleClick);
resetButton.addEventListener('click', resetGame);

function handleClick(event) {
  if (event.target.className.indexOf('card-back') === -1) {
    return;
  }
  var hideCard = event.target;
  hideCard.className += ' hidden';
  if (firstCardClicked == null) {
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
      if (matches === maxMatches) {
        document.getElementById('congrats-message').classList.remove('hidden');
        games++;
        document.getElementById('games').textContent = games;
        clearInterval(timer);
        finalTimer();
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
  for (var i = 0; i < 18; i++) {
    var newElement = document.createElement('div');
    document.getElementById('gameCards').appendChild(newElement);
    newElement.classList.add('col-2');
    newElement.classList.add('card');
    newElement.classList.add('col-4-small');
    newElement.classList.add('col-3-medium');
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

function shuffle(array) {
  var currentIndex = array.length
  var temporaryValue, randomIndex;
  var newCard = document.querySelectorAll('.card-front');
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    --currentIndex;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  for (var j = 0; j < newCard.length; j++) {
    newCard[j].classList.add(array[j]);
  }
}

function resetCards() {
  var newCard = document.querySelectorAll('.card-front');
  var backCard = document.querySelectorAll('.card-back')
  for (var i = 0; i < newCard.length; i++) {
    newCard[i].className = 'card-front';
  }
  for (i = 0; i < backCard.length; i++) {
    backCard[i].classList.remove('hidden');
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
  shuffle(cards);
  minutes = 0;
  seconds = 0;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = '0' + seconds;
  document.getElementById('congrats-message').removeChild(finalTime);
  setInterval(timerStart, 1000);
}

function displayAccuracy() {
  document.getElementById('accuracy').textContent = (Math.trunc((matches / attempts) * 10000) / 100) + '%';
}

function timerStart() {
  if (seconds == 59) {
    minutes++;
    document.getElementById('minutes').textContent = minutes;
    seconds = 0;
    document.getElementById('seconds').textContent = '0' + seconds;
  } else if (seconds >= 9) {
    ++seconds;
    document.getElementById('seconds').textContent = seconds;
  } else {
    ++seconds;
    document.getElementById('seconds').textContent = '0' + seconds;
  }
}

function finalTimer() {
  if (minutes > 1) {
    finalTime.textContent = 'Final Time: ' + minutes + ' minutes' + ' and ';
  } else if (minutes === 1) {
    finalTime.textContent = 'Final Time: ' + minutes + ' minute' + ' and ';
  } else {
    finalTime.textContent = 'Final Time: ';
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
