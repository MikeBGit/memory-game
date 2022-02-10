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
  displayMsgandScoreboard();
  addEventListeners();
}

function showTable() {
  let myBody = document.getElementsByTagName("body")[0];
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
  console.log(arrayOfNumbers);
  console.log(object);
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

function displayMsgandScoreboard() {
  $("body").prepend($("<div id=\"intro\"><p id=\"msg\"></p><p id=\"scoreBoard\"></p></div><br>"))
  $("#msg").text("Choose a pair of similar cards");
}



function flipCard() {

  if (selectedCards.push(this) == 2) {

    console.log("selected", selectedCards)

    if ($(selectedCards[0]).find('.back')[0].style.backgroundImage == $(selectedCards[1]).find('.back')[0].style.backgroundImage) {

      console.log("CONGRATS!!! You fliped similar cards");

      $("#scoreBoard").text("Score: "+(++score));

      $(selectedCards[0]).off("click");
      $(selectedCards[0]).attr("onclick", "");
      

      $(selectedCards[1]).off("click");
      $(selectedCards[1]).attr("onclick", "");

      // Todo Give slight Delay , cause you find it and instantly it goes to checkmark?
      $(selectedCards[0]).find(".back")[0].style.backgroundImage = "url(images/greyCheckmark.png)"
      $(selectedCards[1]).find(".back")[0].style.backgroundImage = "url(images/greyCheckmark.png)"
      selectedCards = [];


    }

    else {
      $( document.body ).css( 'pointer-events', 'none' );
    
      console.log("Fliped cards are not similar. Try again!!!");

      setTimeout(myGreeting, 1500);
      function myGreeting(){
        console.log(selectedCards[0].style.transform = "rotateY(0deg)")
        console.log(selectedCards[1].style.transform = "rotateY(0deg)")
        // TODO DISABLE ALL INPUTS WHILE THIS GOING ON
        console.log("All the cards?", $("span").find("card"))
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

function addEventListeners() {

  $('.card').on("click", flipCard);

}


promptTable();


function flip(event){
  var element = event.currentTarget;
  console.log("flipped", element)
  console.log("selected2", selectedCards)
  if (element.className === "card") {
  if(element.style.transform == "rotateY(180deg)") {
  element.style.transform = "rotateY(0deg)";
  }
  else {
  element.style.transform = "rotateY(180deg)";
  }
}
};