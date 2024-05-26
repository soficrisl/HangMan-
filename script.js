/*Teclado*/
const keyboardButtons = document.querySelector(".keyboard-buttons");
const attempsText = document.querySelector(".attemps-counter");
const winText = document.querySelector(".victory-counter");
const currentScore = document.querySelector(".score-counter");
const wordDisplay = document.querySelector(".word-display");


/*Imagen*/
const hangmanImage = document.getElementById("hangmanImage");
/*Pregame*/
const pregame = document.querySelector(".pregame-modal"); 
const button1 = document.getElementById("level1"); 
const button2 = document.getElementById("level2"); 
const button3 = document.getElementById("level3"); 
/*During Game*/
const duringame = document.querySelector(".duringGame-modal"); 
const playnext = document.querySelector(".play-next"); 

/*After game*/
const gameover = document.querySelector(".postgame-modal"); 
const playAgain = document.querySelector(".play-again"); 


const getWord = () => {
    // Tomamos una palabra aleatoria en relacion al tamagno de la lista
    let smallList = wordList[index_w];
    const word = smallList[Math.floor(Math.random() * smallList.length)];
    currentWord = word.toUpperCase();
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

const resetGame = () => { 
    hits = []; 
    countFails = 0;
    currentWord = ""; 
    hangmanImage.src = `images/hangman-${0}.svg`; 
    winText.innerText = `Victory: ${winCount}`;

    attempsText.innerText = `Times: ${0} / ${maxFails}`;
    keyboardButtons.querySelectorAll("button").forEach(btn => btn.disabled = false); 
    keyboardButtons.querySelectorAll("button").forEach(btn => btn.style.backgroundColor = "#aab095"); 
}

const finalReset = () => {
    winCount = 0; 
    count = 0; 
    total_fails = 0; 
    failed_rounds = 0; 
    round = 0; 
    index_w = 0; 
    round_counter = 0;
    pregame.classList.remove("nshow"); 
    initialize_game();  
}

const finalReset = () => {
    winCount = 0; 
    count = 0; 
    total_fails = 0; 
    failed_rounds = 0; 
    round = 0; 
    index_w = 0; 
    round_counter = 0;
    pregame.classList.remove("nshow"); 
    initialize_game();  

}


const gameOver = () => {
    playAgain.disabled = false;
    const t2 = gameover.querySelector("h2"); 
    const b = gameover.querySelector('b'); 
    b.innerText = currentWord; 
    const score = gameover.querySelector('spam');
    console.log("total-fails: " + total_fails);
    let final_score = round*600 - total_fails*100;
    score.innerHTML = final_score.toString(); 
    if (winCount == round-1) {
        t2.innerHTML = "You won!"; 
    } else {
        t2.innerHTML = "Game Over!"; 
    }
    gameover.classList.remove("nshow"); 
    playAgain.addEventListener("click", function () {
        playnext.disabled = true; 
        duringame.classList.add("nshow"); 
        gameover.classList.add("nshow"); 
        finalReset(); 
    }) 

}

const duringGame = (isVictory, button) => {
    round_counter++; 
    console.log(round_counter);
    console.log(round); 
    console.log(currentWord); 
    playnext.disabled = false; 
    const t1 = duringame.querySelector ("h2"); 
    const b = duringame.querySelector("b");
    b.innerText = currentWord; 
    if (!isVictory) {
        console.log("por lo menos entra en la funcion"); 
        t1.innerHTML = "You did not get it!" 
    } else {
        t1.innerHTML = "You got it!"
    }
    duringame.classList.remove("nshow");
    playnext.addEventListener("click", function() {
        duringame.classList.add("nshow"); 
        playnext.disabled = true;
        console.log(round_counter);
        console.log(round); 
        resetGame(); 
        if (round == round_counter) {
            gameOver(); 
        }else {
            getWord();
        }})
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
            listItem.classList.add("letter-guessed");      
        }
    }

    if (!letterFound) {
        countFails++;
        total_fails++;
        
        hangmanImage.src = `images/hangman-${countFails}.svg`
    } {
    
        button.disabled = true;
        button.style.backgroundColor = '#006A4E';
    
    //Actualizamos el contenido del html
    attempsText.innerText = `Times: ${countFails} / ${maxFails}`; 
    console.log(countFails + ":" + maxFails); 
    console.log(round); 
    let  nscore = 600*round - total_fails*100;
    currentScore.innerHTML =  `Score: ${nscore}`; 
    if (countFails === maxFails) { 
        return duringGame(false);
    }
    if (hits.length === currentWord.length) {
        winCount++;
        return duringGame(true);
    }
}
}

for (let i = 65; i <= 90; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    button.className = "keyboard-button";
    keyboardButtons.appendChild(button);
    button.addEventListener("click", e => guessing(e.target, String.fromCharCode(i))); 

}

const initialize_game = () => {
    duringame.classList.add("nshow"); 
    gameover.classList.add("nshow"); 
    button1.disabled = false; 
    button2.disabled = false; 
    button3.disabled = false; 
    let labelLevel = document.querySelector(".level-title");

    
    button1.addEventListener("click", function ()  {
        round = 3; 
        index_w = 0;
        labelLevel.innerText = `Level ${index_w + 1}`;
        startgame(); 
        button2.disabled = true; 
        button3.disabled = true; 
    }); 
    button2.addEventListener("click", function ()  {
        round = 4; 
        index_w = 1; 
        labelLevel.innerText = `Level ${index_w + 1}`;
        button1.disabled = true; 
        button3.disabled = true;
        startgame(); 
    }); 
    button3.addEventListener("click", function ()  {
        round = 5; 
        index_w = 2; 
        labelLevel.innerText = `Level ${index_w + 1}`;
        startgame(); 
        button1.disabled = true; 
        button2.disabled = true;
    }); 
}

const startgame = () => {
    pregame.classList.add("nshow"); 
    button1.disabled = true; 
    button2.disabled = true; 
    button3.disabled = true; 
    currentScore.innerHTML =  `Score: ${round*600}`;
    getWord();  
}

let currentWord = '', countFails = 0, hits = [];
const maxFails = 6;  
let winCount = 0; 
let count = 0; 
let total_fails = 0; 
let failed_rounds = 0; 
let round = 0; 
let index_w = 0; 
let round_counter = 0; 
initialize_game(); 