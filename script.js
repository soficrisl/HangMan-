const keyboardButtons = document.querySelector(".keyboard-buttons");
const attempsText = document.querySelector(".attemps-counter");
const wordDisplay = document.querySelector(".word-display");
const hangmanImage = document.getElementById("hangmanImage");
const pregame = document.querySelector(".pregame-modal"); 
const duringame = document.querySelector(".duringGame-modal"); 
const gameover = document.querySelector(".postgame-modal"); 
const playAgain = document.querySelector(".play-again"); 
let currentWord, countFails, hits;
const maxFails = 6;
const rounds = 5; 



const getWord = () => {
    // Tomamos una palabra aleatoria en relacion al tamagno de la lista
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word.toUpperCase();
    console.log(word);
    gameover.classList.remove("show"); 

    // Creamos una variable string vacia para guardar los li del html
    // Tendremos tantos elementos li como letras en la palabra, los pisos del ahorcado
    resetGame(); 
    
    let listItemsString = "";

    for (let i = 0; i < word.length; i++) {
        listItemsString += `<li class="letter"></li>`;
    }
    //Actualizamos el contenido del html
    wordDisplay.innerHTML = listItemsString;
}

const resetGame = () => {
    hits = []; 
    countFails = 0; 
    hangmanImage.src = `images/hangman-${0}.svg`; 
    attempsText.innerText = `Attemps: ${0} / ${maxFails}`;
    keyboardButtons.querySelectorAll("button").forEach(btn => btn.disabled = false); 
    gameover.classList.add("remove");
}


const gameOver = (isVictory) => {
    setTimeout(() => {
        gameover.classList.add("show"); 
    }, 300)
}

const guessing = (button, clickedLetter) => {
    // Booleano para verificar si la letra se clickeada esta en la palabra actual
    let letterFound = false;
    for (let i = 0; i < currentWord.length; i++) {
        let letter = currentWord[i];
        if (letter === clickedLetter) {
            letterFound = true;
            hits.push(letter)

            // Obtenemos el elemento li que corresponde a la letra clickeada
            let listItem = wordDisplay.querySelectorAll("li")[i];


            // La letra aparece 
            listItem.innerText = letter;

            listItem.classList.add("guessed");
        }
    }

    if (!letterFound) {
        countFails++;
        hangmanImage.src = `images/hangman-${countFails}.svg`
    } {
    
    button.disabled = true;
    //Actualizamos el contenido del html
    attempsText.innerText = `Attemps: ${countFails} / ${maxFails}`;
    if (countFails === maxFails) {
        return gameOver(false);
    }
    if (hits.length === currentWord.length) {
        return gameOver(true);
    }
}
}


for (let i = 65; i <= 90; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardButtons.appendChild(button);

    button.addEventListener("click", e => guessing(e.target, String.fromCharCode(i)))
}

getWord();
playAgain.addEventListener("click", getWord); 