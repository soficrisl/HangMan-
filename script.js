const keyboardButtons = document.querySelector(".keyboard-buttons");
const attempsText = document.querySelector(".attemps-counter");

const wordDisplay = document.querySelector(".word-display")

let currentWord, countFails = 0;
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

const initGame = (button, clickedLetter) => {
    // Booleano para verificar si la letra se clickeada esta en la palabra actual
    let letterFound = false;


    for (let i = 0; i < currentWord.length; i++) {
        let letter = currentWord[i];
        if (letter === clickedLetter) {
            letterFound = true;

            // Obtenemos el elemento li que corresponde a la letra clickeada
            let listItem = wordDisplay.querySelectorAll("li")[i];

            // La letra aparece 
            listItem.innerText = letter;

            listItem.classList.add("guessed");
        }
    }

    if (!letterFound) {
        countFails++;
    }
    
    //Actualizamos el contenido del html
    attempsText.innerText = `Attemps: ${countFails} / ${maxFails}`;
}

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardButtons.appendChild(button);

    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)))
}

getWord();
