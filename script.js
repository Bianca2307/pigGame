'use strict';


//Selecting elements
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

const diceElement = document.querySelector('.dice');
const btnRollDice = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

const current0Element = document.querySelector('#current--0');
const current1Element = document.querySelector('#current--1');



// const rollDice = function () {
//     let randomDice = Math.floor(Math.random() * 6) + 1;
//     current0Element.textContent = randomDice;

// }


//Starting conditions
score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add('hidden');


let currentScore, activePlayer, scores, playing;;

const init = function () {
    
    currentScore = 0;
    activePlayer = 0;
    scores = [0, 0];
    playing = true;

    current0Element.textContent = 0;
    current1Element.textContent = 0;
    score0Element.textContent = 0;
    score1Element.textContent = 0;

    diceElement.classList.add('hidden');
    player0Element.classList.remove('player--winner');
    player1Element.classList.remove('player--winner');


    player0Element.classList.add('player--active');
    player1Element.classList.remove('player--active');


   

   

}

init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer == 0 ? 1 : 0;
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
}

//Rolling dice functionality
btnRollDice.addEventListener('click', function () {


    if (playing) {
        //1.Generate a random number
        let randomDice = Math.floor(Math.random() * 6) + 1;


        //2.Set the dice
        diceElement.classList.remove('hidden');

        // switch (randomDice) {
        //     case 1: diceElement.src = "dice-1.png";
        //         break;

        //     case 2: diceElement.src = "dice-2.png";
        //         break;
        //     case 3: diceElement.src = "dice-3.png";
        //         break;
        //     case 4: diceElement.src = "dice-4.png";
        //         break;
        //     case 5: diceElement.src = "dice-5.png";
        //         break;
        //     case 6: diceElement.src = "dice-6.png";
        //         break;

        //     default: diceElement.classList.add('hidden');


        // } 
        diceElement.src = `dice-${randomDice}.png`;
        //3.Checked for rolled 1: if true, switch to next player


        if (randomDice !== 1) {
            currentScore = currentScore + randomDice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        } else {
            //switch to next player
            switchPlayer();


        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;
        // scores[1] = scores[1] + currentScore

        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];

        // 2. Check if player's score is >= 100
        if (scores[activePlayer] >= 20) {
            // Finish the game
            playing = false;
            diceElement.classList.add('hidden');

            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add('player--winner');
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove('player--active');
        } else {
            // Switch to the next player
            switchPlayer();
        }
    }
});



btnNew.addEventListener('click', init);