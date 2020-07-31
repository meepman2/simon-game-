
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = new Array();
var i = 0;
var userPattern = new Array();
var level = 0;

//*****************functions*****************//

function playSound(name){
  var songsong = "sounds/" + name + ".mp3";
  var audio = new Audio(songsong);
  audio.play();
}

function animatePress(currentColour){
  var s = "#" + currentColour;
  $(s).addClass("pressed");
  setTimeout(function(){
    $(s).removeClass("pressed");
}, 100);
}

function startOver() {
  userPattern = [];
  gamePattern = [];
  level = 0;
}

function nextSequence() {
  var randomNumber = Math.floor((Math.random()*4));
      randomChosenColour = buttonColours[randomNumber];
      gamePattern.push(randomChosenColour);
      console.log(gamePattern);
      var lvl = "level " + level;
      $("#level-title").html(lvl);
      var rand = "#"+randomChosenColour;
      $(rand).fadeOut(100).fadeIn(100);
      playSound(randomChosenColour);
      level++;
      setTimeout(function () {
      checkSolution();
    }, 4000);
}

function checkSolution() {
  if(JSON.stringify(gamePattern)==JSON.stringify(userPattern)){
      userPattern = [];
      nextSequence();
  }
  else{
    $("body").addClass("game-over");
    $("#level-title").html("GAME OVER");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);
    setTimeout(function () {
      startOver();
      $("#level-title").html("Press A Key To Restart");
    }, 1000);

  }
}

// ******************main**************************//

$(".btn").click(function (event){
    var userChosenColor = event.target.id;
    userPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
});

document.addEventListener("keydown", function (event) {
if(event.key == "a" && level == 0){
  nextSequence();
}
});
