
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
let roboSize = "?size=150x140";
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
  displayMsgandScoreboard();
  addEventListeners();
}

function showTable() {
  let myBody = document.getElementsByTagName("body")[0];
  myBody.innerHTML = " ";
  myBody.style.background = "#C1B283";
  myBody.style.marginTop = "100px";
  myBody.style.marginLeft = "100px";
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

function displayMsgandScoreboard() {
  $("body").prepend($("<div id=\"intro\"><p id=\"msg\"></p><p id=\"scoreBoard\"></p></div><br>"))
  $("#msg").text("Choose a pair of similar cards");
}

function flipCard() {

  if (selectedCards.push(this) == 2) {
    if (selectedCards[0].style.backgroundImage == selectedCards[1].style.backgroundImage) {
      console.log("CONGRATS!!! You fliped similar cards");
      $("#scoreBoard").text(++score);
      $(selectedCards[0]).off("click");
      $(selectedCards[1]).off("click");
      // TODO disable both image displays
    }
    else {
      console.log("Fliped cards are not similar. Try again!!!");
      // TODO flip back cards
    }
    selectedCards = [];
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

function addEventListeners() {
  $("p span").on("click", flipCard);
}



promptTable();


