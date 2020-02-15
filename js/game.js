const numDivs = 36;
const maxHits = 10;

let hits = 0;
let misses = 0;
let firstHitTime = getTimestamp();
let divSelector = $();

function endGame() {
  // FIXED FIXME: спрятать игровое поле сначала
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);

  $(".game-field").addClass("d-none");
  $("#hits").text(hits);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#score").text(hits + misses);
  $("#win-message").removeClass("d-none");
}

function round() {
  // FIXED FIXME: надо бы убрать "target" прежде чем искать новый
  $(divSelector).text("");
  $(divSelector).removeClass("target");

  divSelector = randomDivId();
  $(divSelector).removeClass("miss");
  $(divSelector).addClass("target");
  
  // DONE TODO: помечать target текущим номером
  $(divSelector).text(hits+1);
}

function handleClick(event) {
  // FIXED в round() FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    hits +=  1;
    round();
    if (hits === maxHits) {
      endGame();
    }
  }
  // DONE TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
  else {
    misses -= 1;
    $(event.target).addClass("miss");
  }
}

function startGame() {
// FIXED FIXME: тут надо определять при первом клике firstHitTime
  hits = 0;
  misses = 0;
  firstHitTime = getTimestamp();

  $(".game-field").off("click");
  $(".game-field").click(handleClick);
  $("#win-message").addClass("d-none");
  $(".game-field").removeClass("d-none");
  $(".game-field").removeClass("miss");

  round();
}
function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  $("#button-reload").click(startGame);
}

$(document).ready(init);
