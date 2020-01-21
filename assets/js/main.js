var gameField = document.getElementById('gameCards');
gameField.addEventListener('click', handleClick);

function handleClick(event) {
  if (event.target.className.indexOf('card-back') === -1) {
    return;
  }
  //console.log(event);
  var hideCard = event.target;
  hideCard.className += 'hidden';
}
