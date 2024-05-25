const keyboardButtons = document.querySelector(".keyboard-buttons");
const attempsText = document.querySelector(".attemps-counter");

const wordDisplay = document.querySelector(".word-display");
const hangmanImage = document.getElementById("hangmanImage");

let currentWord, countFails = 0, hits = [];
let totalscore = 10000;
let maxWords = 0;

const maxFails = 6;

const getWord = () => {
    // Tomamos una palabra aleatoria en relacion al tamagno de la lista
    const { word } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);

    // Creamos una variable string vacia para guardar los li del html
    // Tendremos tantos elementos li como letras en la palabra, los pisos del ahorcado
    let listItemsString = "";

    for (let i = 0; i < word.length; i++) {
        listItemsString += `<li class="letter"></li>`;
    }

    //Actualizamos el contenido del html
    wordDisplay.innerHTML = listItemsString;
}

const nextWord = (prevScore) => {
    if (maxWords === 1) {
        console.log("Go to arcade table")
        gameOver();
    }
    else {
        console.log("next score" + prevScore)
        maxWords += 1;
        hits = new Array();
        countFails = 0;
        play()
    }
}

const gameOver = () => {
    window.location.href = "score.html";

}

const initGame = (button, clickedLetter) => {
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
        totalscore -= 100;
        console.log(totalscore)
        hangmanImage.src = `images/hangman-${countFails}.svg`
    }

    //Actualizamos el contenido del html
    attempsText.innerText = `Attemps: ${countFails} / ${maxFails}`;

    if (countFails === maxFails) {
        console.log("Perdiste")
        return gameOver();
    }

    if (hits.length === currentWord.length) {
        return nextWord(totalscore);
    }
}

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardButtons.appendChild(button);

    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)))
}

const play = () => {
    getWord();
}

play();

