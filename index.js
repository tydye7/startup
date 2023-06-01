function login(event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    // Perform authentication logic here
    // Example: Make an API call to verify the username and password
  
    // If authentication is successful, redirect the user to the play.html screen
    const authenticated = true; // Replace with your authentication check
  
    if (authenticated) {
      localStorage.setItem("username", username); // Store the username locally
      window.location.replace("play.html");
      isLoggedIn = true;
    } else {
      alert("Invalid username or password. Please try again.");
    }
  }
  
function logout() {
  // Perform logout logic here
  // Example: Clear any stored authentication tokens or session data

  // Remove the username from local storage
  localStorage.removeItem("username");

  // Reload the index.html page to display the login form again
  window.location.reload();
}
  
const express = require('express');
const app = express();


app.use(function (req, res, next) {
    console.log('Time: %d', Date.now());
    next();
});

app.use(express.static('public'));

app.get('/api/hello', (req, res) => {
    res.send('msg: "Hello", number: 337');
    console.log("hello called");
});

app.get('*', (req, res) => {
    res.send("<h1>help i am lost</h1>");
});

app.listen(8080, () => {
    console.log('Server is running...');
});