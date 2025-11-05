// Declare const url with the JSON resource
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

// Declare const cards selecting the div with id "cards"
const cards = document.querySelector('#cards');

// Async function to fetch data
async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  // console.table(data.prophets); // Commented out after testing
  displayProphets(data.prophets); // Send the prophets array to display function
}

// Call the function to test
getProphetData();

// Function expression to display prophets
const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    // Create elements to add to the div.cards element
    let card = document.createElement('section');
    card.classList.add('card'); // Add class for styling
    let fullName = document.createElement('h3');
    let birthdate = document.createElement('p');
    let birthplace = document.createElement('p');
    let portrait = document.createElement('img');

    // Build the h3 content out to show the prophet's full name
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;
    // Build birthdate paragraph
    birthdate.textContent = `Date of Birth: ${prophet.birthdate}`;
    // Build birthplace paragraph
    birthplace.textContent = `Place of Birth: ${prophet.birthplace}`;
    // Build the image portrait by setting all the relevant attributes
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    // Append the section(card) with the created elements (details above image)
    card.appendChild(fullName);
    card.appendChild(birthdate);
    card.appendChild(birthplace);
    card.appendChild(portrait);

    cards.appendChild(card);
  }); // end of arrow function and forEach loop
}