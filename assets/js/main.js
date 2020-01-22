var firstCardClicked = null;
var secondCardClicked = null;
var firstCardClasses, secondCardClasses;
var maxMatches = 9;
var matches = 0;
var gameField = document.getElementById('gameCards');
gameField.addEventListener('click', handleClick);

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
    if (firstCardClasses === secondCardClasses) {
      gameField.addEventListener('click', handleClick);
      firstCardClicked = null;
      secondCardClicked = null;
      matches++;
      if (matches === maxMatches) {
        document.getElementById('congrats-message').classList.remove('hidden');
      }
    } else {
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