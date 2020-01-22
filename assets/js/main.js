var firstCardClicked = null;
var secondCardClicked = null;
var firstCardClasses, secondCardClasses;
var maxMatches = 9;
var matches = 0;
var gameField = document.getElementById('gameCards');
gameField.addEventListener('click', handleClick);
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
    var attempts = document.getElementById('attempts').textContent;
    attempts++;
    document.getElementById('attempts').textContent = attempts;
    if (firstCardClasses === secondCardClasses) {
      gameField.addEventListener('click', handleClick);
      firstCardClicked = null;
      secondCardClicked = null;
      matches++;
      document.getElementById('accuracy').textContent = (Math.floor((matches / attempts) * 100)) + '%';
      if (matches === maxMatches) {
        document.getElementById('congrats-message').classList.remove('hidden');
      }
    } else {
      document.getElementById('accuracy').textContent = (Math.floor((matches / attempts) * 10000) / 100) + '%';
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
shuffle(cards);
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
  for (var i = 0; i < newCard.length; i++) {
    newCard[i].classList.add(array[i]);
  }
}
