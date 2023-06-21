# CS260 Startup Project

## Specification

### Elevator Pitch

- I am going to make a trivia game website. There will be different triva question packs that have themes.

### Key Features

- There will be a login screen and high scores screen and the main part will be cards with questions and buttons to choose your answer.

![Login](images/LoginSmall.png)

### Technologies

- I will use these technologies in the following ways:

- **HTML** - For the structure of the website
- **CSS** - To style the buttons, cards, and other elements
- **JavaScript** - This will be the gears working in the background to run the appropriate functions to run the game
- **Service** - This will manage the requests and data going in and out for the various function calls
- **DB** - This will store the information for login credentials, trivia questions, high scores etc...
- **Login** - To register users and securely store their credentials
- **WebSocket** - Shows new high scores as they come in
- **React** - Ported to the react web framework

## HMTL Deliverable

- I created the html to provide the general structure for my web application
- I provided placdholders for all the necessary technologies/functions

## CSS Deliverable

- I added basic styling to my .html pages
- The buttons, menus, etc.. have been styled

## JavaScript Deliverable

- Wrote JS functions that handle the start of the game when start button is pressed
- Functions that display the question
- Functions that read the input answer and determine if it is correct or not
- Functions to display result of quiz questions

## Service Deliverable

- Added a server to the project by updating the index.js and index.html files with endpoints
- Added a third party endpoint call in the about.js/about.html

## DB Deliverable

- Added a database
- Store scores in database with the player name
- Retrieve score and display in high scores

## Login Deliverable

- Added a login page with a new user registration
- Password is encrypted and stored in the database

## WebSocket Deliverable

- Wrote a lot of the code to handle the web socket and displaying the names of other active players. It doesn't work all the way, but I just turned it in to see if I could get partial credit.

## React Deliverable

//TODO
