// window.addEventListener('load', displayMenu);
// function createCard(){ 
//     $("main").append(`<div class="card"></div>`)
// }


// function loopToMakeCards(amountOfCards){
//     for(i=0;i<amountOfCards;i++){
//         createCard()
//     }
// }

// loopToMakeCards(35);
let roboHash = "https://robohash.org/";
let roboSize = "?size=140x150";
let roboSet;
let imgCounter = 0;
let randomImgId;
let idsUSed = [];
let arrayOfNumbers = [];
let selectedCards = [];
let score = 0;

function rng1_4(){
  return Math.floor(Math.random() * 4) + 1;
}

function checkIfIdUniqueAndGenerateOne(){
  randomImgId = Math.floor(Math.random() * 100) + 1;
  if(!idsUSed.includes(randomImgId)){
    idsUSed.push(randomImgId);
  } else{
    checkIfIdUniqueAndGenerateOne();
  }
}

function generateRandomImageURL(){
  if(imgCounter>1){
    // Restart counter and make new Robothard
    
    imgCounter = 0
  }
  if(imgCounter == 1){
    // Use Previous Robot
    imgCounter++
    return `${roboHash}${roboSet}${randomImgId}${roboSize}`
  }
  roboSet = `set_set${rng1_4()}/`
  imgCounter++
  checkIfIdUniqueAndGenerateOne()
  return `${roboHash}${roboSet}${randomImgId}${roboSize}`
}

let rows;
let columns;



function promptTable() {
 
  let difficulty = "easy";
  //prompt("Enter: 'Easy','Medium','Hard'");
  switch(difficulty.toLocaleLowerCase()) {
    case "easy":
      console.log("easy")
      rows = 4;
      columns = 4;
      break;
    case "medium":
      console.log("medium")
      rows = 4;
      columns = 6;
      break;
      case "hard":
        console.log("hard")
      rows = 4;
      columns = 8; 
      break;
    default:
      console.log("default")
      rows = 4;
      columns = 8;
  }

  showTable();
  // displayMsgandScoreboard();
  addEventListeners();
}

function showTable() {
  let myBody = document.getElementsByTagName("main")[0];
  myBody.innerHTML = " ";
  myBody.style.background = "#C1B283";
  let container = document.createElement("div");


  // make an array of <spans> with URL + IDs
  let object = {};

  function makeObjectToShuffle(){
    totalCards = rows * columns;
    for(i=0;i<totalCards;i++){
      url = generateRandomImageURL();
      object = {
        ...object,
        [i] : {
          "id": `${randomImgId}_${imgCounter}`,
          "url": url
        }
      }
    }  
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function makeNumberArray(){
    totalCards = rows * columns;
    for(i=0;i<totalCards;i++){
      arrayOfNumbers.push(i)
    }
  }
  makeNumberArray();

  makeObjectToShuffle();
  shuffle(arrayOfNumbers);
  
  let arrayOfNumberCount = 0;

  // Loop that styles and appends each element to the dom to form the table

  for (i = 0; i < rows; i++) {
    let newParagraph = document.createElement("p");
    
    for (j = 0; j < columns; j++) {
      // element creation

      let newSpan = document.createElement("span");

      newSpan.className = "container";

      
      newSpan.innerHTML = 
        `
          <div class="card" onclick="flip(event)">
            <div class="front"></div>
            <div class="back" style="background-image: url(${object[arrayOfNumbers[arrayOfNumberCount]].url})"></div>
          </div>
        `;
      newSpan.id = `${object[arrayOfNumbers[arrayOfNumberCount]].id}`;
     
      // Span Css
      newSpan.style.display = "inline-block";
      newSpan.style.minWidth = "140px";
      newSpan.style.minHeight = "150px";
      // newSpan.style.border = "1px solid black";
      newSpan.style.textAlign = "center";
      newSpan.style.paddingTop = "10px";
      
      newSpan.style.cursor = "pointer";
      // paragraph css
      newParagraph.style.margin = "0px";
      // Appending section

      newParagraph.appendChild(newSpan);
      container.appendChild(newParagraph);
      myBody.appendChild(container);
      arrayOfNumberCount++
    }
  }
}

function flipCard() {

  $( this ).css( 'pointer-events', 'none' );

  if (selectedCards.push(this) == 2) {

    if ($(selectedCards[0]).find('.back')[0].style.backgroundImage == $(selectedCards[1]).find('.back')[0].style.backgroundImage ) {

      console.log("CONGRATS!!! You fliped similar cards");

      $("#scoreBoard").text("Score: "+(++score));

      $(selectedCards[0]).off("click");
      $(selectedCards[0]).attr("onclick", "");
      

      $(selectedCards[1]).off("click");
      $(selectedCards[1]).attr("onclick", "");

      // Todo Give slight Delay , cause you find it and instantly it goes to checkmark?
      setTimeout(waitABit, 1000);
      $( document.body ).css( 'pointer-events', 'none' );
      function waitABit() {
        $(selectedCards[0]).find(".back")[0].style.backgroundImage = "url(images/greyCheckmark.png)"
        $(selectedCards[1]).find(".back")[0].style.backgroundImage = "url(images/greyCheckmark.png)"
        selectedCards = [];
        $( document.body ).css( 'pointer-events', 'auto' );
      }
    }

    else {
      //  DISABLE ALL INPUTS WHILE THIS GOING ON
      $( document.body ).css( 'pointer-events', 'none' );
      console.log("Fliped cards are not similar. Try again!!!");

      setTimeout(flipBack, 1500);
      function flipBack(){
        selectedCards[0].style.transform = "rotateY(0deg)";
        selectedCards[1].style.transform = "rotateY(0deg)";
        
        for(let card of selectedCards){
          
          card.style.pointerEvents = "auto"
        }
        selectedCards = [];
        $( document.body ).css( 'pointer-events', 'auto' );
       
      }
      
    }

  }

  else {

    $("#msg").text("Select a 2nd card");

    // TODO keep card fliped till the second card is also fliped

  }

  if (score == arrayOfNumbers.length / 2) {

    console.log("GAME OVER! YOU WON !");

    // TODO GAME OVER
    
  }
  
}




function displayMenu() {
  document.getElementById("conclusion").style.height = "0%";
  $("menu").show();
}

// promptTable();








function showWin() {
  $("#result").text("🎊 Good memory! 🎊");
  $("#message").text("You've successfully matched all the pairs with X tries left.");
}

function showLose() {
  $("#result").text("💀 Game over! 💀");
  $("#message").text(`Whoops, you ran out of attempts. You managed to find x pairs out of total pairs.`);
}

function showInstructions() {
  $("#instructions").show();
  console.log("asda")
}

function closeInstructions() {
  $("#instructions").hide();
}

function showConclusion() {
  document.getElementById("conclusion").style.height = "100%";
  console.log("h1")
}

showWin();
// event listeners

function addEventListeners() {
  $('.card').on("click", flipCard);
}

function flip(event){
  var element = event.currentTarget;
  
  if (element.className === "card") {
  if(element.style.transform == "rotateY(180deg)") {
  element.style.transform = "rotateY(0deg)";
  }
  else {
  element.style.transform = "rotateY(180deg)";
  }
}
};

$("#btnShowInstructions").click(showInstructions);
$("#btnCloseInstructions").click(closeInstructions);
$(".displayMenu").click(displayMenu)
$("h1").click(showConclusion)

$(".startGame").click(function(){
  $("menu").hide();
  difficulty = $("#difficulty").val();
  promptTable();
});


// Old code to build homepage
// function displayMenu() {
//   // $(".container").html('<div class="contentBox"> <h2><br>---------- </h2> <h3>Difficulty</h3> <form class="centerText"> <select name="difficulty" id="difficulty" class="formMargin"> <option value="easy">Easy</option> <option value="medium">Medium</option> <option value="hard">Hard</option> <option value="haveFunGuessing">Have Fun Guessing</option> </select> <br><h3>Game Size</h3> <select name="size" id="size" class="formMargin"> <option value="small">Small 4x4</option> <option value="medium">Medium 6x6</option> <option value="large">Large 8x8</option> </select> <br><h3>Players</h3> <select name="players" id="players" class="formMargin"> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select> <br><h3>Card Images</h3> <select name="imageSet" id="imageSet" class="formMargin"> <option value="1">Mixed Bag</option> <option value="2">Robots</option> <option value="3">Robo Heads</option> <option value="4">KITTIES!</option> </select> <br><input name="playButton" type="button" class="startGame btn btn-primary mt-3" id="playButton" value="Play!" class="btn btn-primary playBtn mt-4"> </form> <div class="centerText"> <button type="button" id="btnShowInstructions" class="btn btn-secondary">How to Play</button></div><div class="overlay" id="instructions"> <div class="col-4 offset-4 pt-5"> <h2 class="text-center pt-5 mt-5 display-2">How to Play</h2> <h3 class="pt-3">To Win the Game</h3> <p class="pt-4">This is a dangerously-fun game to test your memory-- you have limited attempts to match all the cards face.</p><h3 class="pt-3">Levels of Difficulty</h3> <ul class="pt-4"> <li>Easy - Find 8 pairs</li><li>Medium - Find 10 pairs</li><li>Hard - Find 11 pairs</li></ul> <div class="text-center pt-3"> <button id="btnCloseInstructions" class="btn btn-primary">Back to Menu</button> </div></div></div><div class="overlay text-center" id="conclusion"> <h2 id="result" class="display-2 pt-5 mt-5">🎊 Good memory! 🎊</h2> <p id="message" class="pt-2" >You\'ve successfully matched all the pairs with X tries left.</p><h3 class="pt-4">Do you wish to play again?</h3> <div class="text-center pt-3"> <button class="btn btn-primary startGame btn-lg mx-2">✔</button> <button class="btn btn-danger displayMenu btn-lg mx-2">🙅</button> </div></div>')

//   $("#btnShowInstructions").click(showInstructions);
//   $("#btnCloseInstructions").click(closeInstructions);
//   $(".displayMenu").click(displayMenu)
//   $("h1").click(showConclusion)

//   $(".startGame").click(function(){
//     difficulty = $("#difficulty").val();
//     promptTable();
//   });
// }