$(document).ready(function(){

  var cardsArray = [];
  var valuesArray = [1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12];

  function randomize(array) {
    var currentItem = array.length, tempValue, randomItem;

    while (0 !== currentItem) {
      randomItem = Math.floor(Math.random() * currentItem);
      currentItem -= 1;
      tempValue = array[currentItem];
      array[currentItem] = array[randomItem];
      array[randomItem] = tempValue;
    }
    return array;
  }

  function renderCards() {
    var finalsArray = randomize(valuesArray);
    var outputCollection = [];

    finalsArray.forEach(function(element, index){
      var template = '<li id="card-'+index+'" class="card"><div class="front"></div><div class="back"><span class="number">'+element+'</span></div></li>';
      outputCollection.push(template);
    });
    var finalHTML = outputCollection.join('');
    $('.cards').html($(finalHTML));
  }

  function resetCards() {
    var cardsCompared = $('.card.selected');
    cardsCompared.removeClass('selected equal not-equal');
    cardsArray = [];
    cardsIds = [];
  }

  function resetOnlyCards() {
    resetCards();
    renderCards();
  }

  function resetGame() {
    resetCards();
    renderCards();
    $('header').show();
  }

  function valueCompare() {
    var cardsCompared = $('.card.selected');

    if (cardsArray[0] === cardsArray[1]) {
      cardsCompared.addClass('equal');
      window.setTimeout(function(){
        cardsCompared.addClass('hide')
      }, 2000);
    } else if (cardsArray[0] !== cardsArray[1]) {
      cardsCompared.addClass('not-equal');
    }
    window.setTimeout(resetCards, 1600);
  }

  // EVENTS
  $('.start').on('click', function() {
    $('header').hide();
  });

  $('.cards').on('click', '.card:not(.selected)', function() {
    var cardText = $(this).find('.number').text();
    cardsArray.push(parseInt(cardText, 10));
    $(this).addClass('selected');
    if (cardsArray.length > 1) {
      valueCompare();
    }
  });

  $('.reset-game').on('click', function(e) {
    e.preventDefault();
    resetGame();
  });

  $('.reset-cards').on('click', function(e) {
    e.preventDefault();
    resetOnlyCards();
  });

  // BUILD IT
  renderCards();
});
