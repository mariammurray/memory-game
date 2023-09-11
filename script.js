const gameContainer = document.getElementById("game");
let matched=0;
let first=null;
let second=null;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function handleCardClick(e) {
  let card = e.target;
  if (!first){
    card.style.backgroundColor=card.classList[0];
    first=card;
  } else if (!second){
    if (card==first){return;} //ensuring clicking the same card twice will not count
    second=card;
    card.style.backgroundColor=card.classList[0];
  }
  //checking for a match once two cards are selected, after 1 second
  if (first && second) {
    setTimeout(function(){
      if (first.style.backgroundColor!=second.style.backgroundColor){
        first.style.backgroundColor="";
        second.style.backgroundColor="";
      } else {
        first.removeEventListener("click", handleCardClick);
        second.removeEventListener("click", handleCardClick);
        matched+=2;
        if (matched==COLORS.length){finish();}
      }
      first=null;
      second=null;

    },1000);
  } 
}
//adding a message and a restart button once the game is completed
function finish(){
  const completedMessage=document.getElementById("completedMessage");
  const congratsText=document.createElement("p");
  congratsText.innerText="You Win!";
  const button=document.createElement("BUTTON");
  button.innerHTML="Restart";
  button.addEventListener("click", restart);
  completedMessage.appendChild(congratsText);
  completedMessage.appendChild(button);

}

function restart(){
  location.reload();
}


// when the DOM loads
createDivsForColors(shuffledColors);
