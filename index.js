/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
   for (let i= 0; i < games.length; i++) {

        // create a new div element, which will become the game card
        const gameCard = document.createElement("div")

        // add the class game-card to the list
        gameCard.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        gameCard.innerHTML = `
        <img src = "${games[i].img}" alt = "${games[i]}.name" class = "game-img">
        <h3>${games[i].name}</h3>
        <p>${games[i].description}</p>
        <p>Pledged: $${games[i].pledged.toLocaleString()}</p>
        <p>Goal: $${games[i].goal.toLocaleString()}</p>
        <p>Backers: ${games[i].backers}</p>
        `;

        // append the game to the games-container
        gamesContainer.appendChild(gameCard);
    }   
}
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total,cbts) => {
    return total+cbts.backers
},0) 

// set the inner HTML using a template literal and toLocaleString to get a number with commas

contributionsCard.innerHTML = `<h3>Total Contributors: ${totalContributions.toLocaleString()}</h3>`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised"); 

const totalRaised = GAMES_JSON.reduce((total, raised) => {
    return total+raised.pledged
},0)

// set inner HTML using template literal

raisedCard.innerHTML = `<h3>Total Raised: $${totalRaised.toLocaleString()} </h3>`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.reduce((total) => {
    return total + 1
},0)

gamesCard.innerHTML = `<h3>Total Number of Games: ${totalGames.toLocaleString()}</h3>`

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal

const checkUnderFunded = GAMES_JSON.filter(game => game.pledged < game.goal);

    // use the function we previously created to add the unfunded games to the DOM
addGamesToPage(checkUnderFunded);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal

    const checkFunded = GAMES_JSON.filter(game => game.pledged > game.goal);
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(checkFunded);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn")
const fundedBtn = document.getElementById("funded-btn")
const allBtn = document.getElementById("all-btn")

// add event listeners with the correct functions to each button

unfundedBtn.addEventListener("click",filterUnfundedOnly);
fundedBtn.addEventListener("click",filterFundedOnly);
allBtn.addEventListener("click",showAllGames);
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator

const raisedStatement = (unfundedGamesCount === 0)
  ? `A total of $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.length} games. Currently, all games have been fully funded!`
  : `A total of $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.length} games. Currently, 
  ${unfundedGamesCount} game remains unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container

const descriptionParagraph = document.createElement("p");
descriptionParagraph.textContent = raisedStatement;
descriptionContainer.appendChild(descriptionParagraph);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});
console.log(sortedGames);

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame] = sortedGames;

// Creating elements to display the top 2 games
const firstGameElement = document.createElement("div");
firstGameElement.innerHTML = `
    <img src="${firstGame.img}" alt="${firstGame.name}" class="game-img">
    <h3>${firstGame.name}</h3>
    <p>Pledged: $${firstGame.pledged.toLocaleString()}</p>
    <p>Goal: $${firstGame.goal.toLocaleString()}</p>
`;

const secondGameElement = document.createElement("div");
secondGameElement.innerHTML = `
    <img src="${secondGame.img}" alt="${secondGame.name}" class="game-img">
    <h3>${secondGame.name}</h3>
    <p>Pledged: $${secondGame.pledged.toLocaleString()}</p>
    <p>Goal: $${secondGame.goal.toLocaleString()}</p>
`;

// Appending the elements to the corresponding containers
firstGameContainer.appendChild(firstGameElement);
secondGameContainer.appendChild(secondGameElement);