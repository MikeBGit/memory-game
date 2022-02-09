window.addEventListener('load', displayMenu);
// function createCard(){ 
//     $("main").append(`<div class="card"></div>`)
// }


// function loopToMakeCards(amountOfCards){
//     for(i=0;i<amountOfCards;i++){
//         createCard()
//     }
// }

// loopToMakeCards(35);
let roboHash = "https://robohash.org/"
let roboSize = "?size=150x140"
let roboSet;
let imgCounter = 0;
let randomImgId;
let idsUSed = [];
let arrayOfNumbers = [];

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

let difficulty;
let rows;
let columns;



function promptTable() {
  
  switch(difficulty) {
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
}

function showTable() {
  let myBody = document.getElementsByTagName("main")[0];
  myBody.innerHTML = " ";
  myBody.style.background = "#C1B283";
  myBody.style.marginLeft = "100px";
  let container = document.createElement("div");


  // make an array of <spans> with URL + IDs
  let object = {}

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
  
      // swap elements array[i] and array[j]
      // we use "destructuring assignment" syntax to achieve that
      // you'll find more details about that syntax in later chapters
      // same can be written as:
      // let t = array[i]; array[i] = array[j]; array[j] = t
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
  console.log(arrayOfNumbers);
  console.log(object);
  let arrayOfNumberCount = 0;

  // Loop that styles and appends each element to the dom to form the table

  for (i = 0; i < rows; i++) {
    let newParagraph = document.createElement("p");
    for (j = 0; j < columns; j++) {
      // element creation
      let newSpan = document.createElement("span");

      
      newSpan.style.backgroundImage = `url(${object[arrayOfNumbers[arrayOfNumberCount]].url})`
      newSpan.id = `${object[arrayOfNumbers[arrayOfNumberCount]].id}`;
     
      // Span Css
      newSpan.style.display = "inline-block";
      newSpan.style.minWidth = "150px";
      newSpan.style.minHeight = "130px";
      newSpan.style.border = "1px solid black";
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





// promptTable();

function displayMenu() {
  $(".container").html('<div class="contentBox"> <h2><br>---------- </h2> <h3>Difficulty</h3> <form class="centerText" action="/main.js"> <select name="difficulty" id="difficulty" class="formMargin"> <option value="easy">Easy</option> <option value="medium">Medium</option> <option value="hard">Hard</option> <option value="haveFunGuessing">Have Fun Guessing</option> </select> <br><h3>Game Size</h3> <select name="size" id="size" class="formMargin"> <option value="small">Small 4x4</option> <option value="medium">Medium 6x6</option> <option value="large">Large 8x8</option> </select> <br><h3>Players</h3> <select name="players" id="players" class="formMargin"> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select> <br><h3>Card Images</h3> <select name="imageSet" id="imageSet" class="formMargin"> <option value="1">Mixed Bag</option> <option value="2">Robots</option> <option value="3">Robo Heads</option> <option value="4">KITTIES!</option> </select> <br><input name="playButton" type="button" id="playButton" value="Play!" class="btn btn-success playBtn mt-4"> </form> <div class="centerText"> <button type="button" id="btnShowInstructions" class="btn btn-info">How to Play</button> </div><div id="instructions"> <div class="col-6 offset-3 pt-5"> <h2 class="text-center">How to Play</h2> <h3 class="pt-3">To Win the Game</h3> <p class="pt-2">This is a dangerously-fun game to test your memory-- you have limited attempts to match all the cards face.</p><h3 class="pt-3">Levels of Difficulty</h3> <ul class="pt-2"> <li>Easy - Find 8 pairs</li><li>Medium - Find 10 pairs</li><li>Hard - Find 11 pairs</li></ul> <div class="text-center pt-3"> <button id="btnCloseInstructions" class="btn btn-primary">Back to Menu</button> </div></div></div>')

  $("#btnShowInstructions").click(showInstructions);
  $("#btnCloseInstructions").click(closeInstructions);
  $("#playButton").click(function(){
    difficulty = $("#difficulty").val();
    promptTable();
  });
}

function showInstructions() {
  $("#instructions").css("display", "block");
  console.log("asda")
}

function closeInstructions() {
  $("#instructions").hide();
}

// event listeners


