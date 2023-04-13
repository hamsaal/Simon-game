var level = 1;
var comparisonCounter = 0;
var a = "Level"
var previouspressedButtons = [];
var pressedButtons = [];
var tobepressedButtons = [];
var finalCheck = 0;
var cancelprevioushistory = 0;

function history() {
  previouspressedButtons.push(tobepressedButtons[0]);
  tobepressedButtons.length = 0;
  pressedButtons.length = 0;
}

function failedhistory() {
  previouspressedButtons.length = 0;
  pressedButtons.length = 0;
  tobepressedButtons.length = 0;
  level = 1;
}

function comparison1() {
if (pressedButtons[0] == tobepressedButtons[0]){
      ++level;
      $("h1").text(a + " " + level);
      history();
      animate();
}
else {
      faultdetected();
      failedhistory();
    }
}

function comparison2(){
if (finalCheck === 1){
    comparisonCounter = 0
    if(pressedButtons[pressedButtons.length-1] == tobepressedButtons[0]){
    ++level;
    cancelprevioushistory = 0;
    $("h1").text(a + " " + level);
    finalCheck = 0;
    history();
    animate();
    }
    else{
    failedhistory();
    faultdetected();
    finalCheck = 0;
    }
}
else if(pressedButtons[comparisonCounter] == previouspressedButtons[comparisonCounter] && pressedButtons.length === previouspressedButtons.length) {
      finalCheck = 1;
      comparsionCounter = 0;
      cancelprevioushistory =1;
    }
else{
  faultdetected();
  failedhistory();
}
}





function faultdetected() {
  var wrong = new Audio("sounds/wrong.mp3");
  wrong.play();
  $("h1").text("Gameover press a key to continue");
  $("body").addClass("game-over");
  setTimeout(() => {
    $("body").removeClass("game-over");
  }, "100")
  counter = 0;
}




function randomTarget() {
  var randomButton = Math.floor(Math.random() * 4);
  var randomBtn = $(".btn")[randomButton];
  return randomBtn;
}

function animate() {
  var reqButton = randomTarget();
  $(reqButton).fadeOut(500);
  $(reqButton).fadeIn();
  tobepressedButtons.push(reqButton.classList[1]);
}


var counter = 0;
// FUNCTION TO ADD ANIMATIONS AND SOUND TO OUR BUTTONS
function animateandsound(buttons) {
  for (var i = 1; i < 2; i++) {
    if (buttons[i].includes("green")) {
      var green = new Audio("sounds/green.mp3");
      green.play();
      $(".green").addClass("pressed");
      setTimeout(() => {
        $(".green").removeClass("pressed");
      }, "100")

    } else if (buttons[i].includes("blue")) {
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      $(".blue").addClass("pressed");
      setTimeout(() => {
        $(".blue").removeClass("pressed");
      }, "100")
    } else if (buttons[i].includes("yellow")) {
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      $(".yellow").addClass("pressed");
      setTimeout(() => {
        $(".yellow").removeClass("pressed");
      }, "100")
    } else if (buttons[i].includes("red")) {
      var red = new Audio("sounds/red.mp3");
      red.play();
      $(".red").addClass("pressed");
      setTimeout(() => {
        $(".red").removeClass("pressed");
      }, "100")
    } else {
      alert("fuckoff");
    }
  }
}

// Function to start the game


// event listners
$(document).on("keydown", function() {
  if (counter === 0) {
    failedhistory();
    animate();
    $("h1").text(a + " " + level);
    counter = 1;
  }
});
$(".btn").on("click", function(e) {
  var classes = this.classList;
  if (counter === 0) {
    animateandsound(classes);
    faultdetected();


  }
  else {
    var buttonpressed = this;

    pressedButtons.push(buttonpressed.classList[1]);
    animateandsound(classes);
    if(level === 1){
      comparison1();
    }
    else if((cancelprevioushistory === 0) && (pressedButtons.length < previouspressedButtons.length)){
        if(pressedButtons[comparisonCounter] == previouspressedButtons[comparisonCounter]){
          ++comparisonCounter;
        }
        else{
          faultdetected();
          failedhistory();
        }
      }
    else{
      comparison2();}

  }
});
