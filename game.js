var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var userClickedPattern = [];

var level = 0;
var started = false;

var memeImages = [
    "memes/meme1.gif",
    "memes/meme2.gif",
    "memes/meme3.gif",
    "memes/meme4.gif"
];

var bgm = new Audio("sounds/bgm.mp3");
bgm.loop = true;

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
  
    playSound(userChosenColour);
    animatePress(userChosenColour);
  
    checkAnswer(userClickedPattern.length-1);
  });

$(document).keypress(function(event){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        bgm.play();
      }

});


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    var sound = new Audio("sounds/" + randomChosenColour + ".mp3");
    sound.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

  function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 1000);

        showRandomMeme();

        startOver();
    }
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    bgm.pause();
    bgm.currentTime = 0;
    $("#meme-container").fadeOut();
    $("#meme-container-right").fadeOut();
}
  
function showRandomMeme() {
    var randomMeme = memeImages[Math.floor(Math.random() * memeImages.length)];
    $("#meme-image").attr("src", randomMeme);
    $("#meme-image-right").attr("src", randomMeme);
    $("#meme-container").fadeIn();
    $("#meme-container-right").fadeIn();
}