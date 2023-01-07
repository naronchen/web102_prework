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
        for (let i = 0; i < games.length; i++){

        // create a new div element, which will become the game card
            let div = document.createElement('div');
            let img = document.createElement('img');
        // add the class game-card to the list
            div.classList.add("game-card");
            img.classList.add("game-img");
            // div.append(img); why it doesnt work when i put here?


        // set the inner HTML using a template literal to display some info 
        // about each game
            img.src = `${games[i].img}`;
            div.append(img);
            div.innerHTML += `<h3> ${games[i].name} </h1>
                            <p> ${games[i].description} </p>
                            <p> Backers: ${games[i].backers} </p>`;
            
           

        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        // append the game to the games-container
            gamesContainer.append(div);

    }

}
// addGamesToPage(GAMES_JSON);
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const Contributions_Cnt = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.backers;}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.textContent = `${Contributions_Cnt.toLocaleString('en-US')}`;


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const Total_Raised = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.pledged;}, 0);

// set inner HTML using template literal
raisedCard.textContent = `$${Total_Raised.toLocaleString('en-US')}`;



// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.textContent = `${GAMES_JSON.length}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfunded = GAMES_JSON.filter( (game) => {
        return game.goal > game.pledged;
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfunded);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let funded = GAMES_JSON.filter( (game) => {
        return game.goal <= game.pledged;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(funded);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button

// let unfunded_btn = document.getElementById("unfunded-btn");
// unfunded_btn.addEventListener('click', function(event){
//     filterUnfundedOnly();
// });

// let funded_btn = document.getElementById("funded-btn");
// funded_btn.addEventListener('click', function(event){
//     filterFundedOnly();
// });

// let all_btn = document.getElementById("all-btn");
// all_btn.addEventListener('click', function(event){
//     showAllGames();
// });

// this is bad if I decide to change the arrangment of css
let btn_container = document.getElementById("button-container");
let click_func = [filterUnfundedOnly, filterFundedOnly, showAllGames];
for (let i = 0; i < click_func.length; i++){
    btn_container.children[i].addEventListener('click', function(event){
        click_func[i]();
    });
}

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unfunded = GAMES_JSON.filter( (game) => {
    return game.goal > game.pledged;
});
let num_unfunded = unfunded.length;

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of $${Total_Raised.toLocaleString('en-US')} has be raised for ${GAMES_JSON.length} games. Currently,
${num_unfunded} games remains unfunded. ${num_unfunded>0?"we need your help!": "Thanks a lot!"}`;

// create a new DOM element containing the template string and append it to the description container
let p = document.createElement("p");
p.textContent = displayStr;
descriptionContainer.append(p);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item