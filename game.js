var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour); //sound play correspond to the btn clicked
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1); //call checkAnswer() after use has choe thier answer
});

function checkAnswer(currentLevel) {

  //to check if most recent user answer is same as game pattern and log"success" otherwise "wrong"
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    // If the user got the most recent answer right, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      
        //call nextSequence() after 1000ms delay
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  } else {
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
  
    startOver();
    }
}

function nextSequence() {

  //Once nextSequence triggered, reset the userClickPattern to an empty array ready for the next level
  userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);

  var randomNumber = Math.floor(Math.random() * 4); //random number
  var randomChosenColour = buttonColours[randomNumber]; //random color from buttonColours
  gamePattern.push(randomChosenColour); //add random color to gamePattern

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100); //animate flash

  playSound(randomChosenColour); //sound play according  to the random color
}

function playSound(name) {
  var audio = new Audio(name + ".mp3"); //play sound function
  audio.play();
}

// animatio when any color clicked
function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}

function startOver() {

    // reset the values
    level = 0;
    gamePattern = [];
    started = false;

}
