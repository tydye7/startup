// function login(event) {
//     event.preventDefault();
  
//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;
  
//     // Perform authentication logic here
//     // Example: Make an API call to verify the username and password
  
//     // If authentication is successful, redirect the user to the play.html screen
//     const authenticated = true; // Replace with your authentication check
  
//     if (authenticated) {
//       localStorage.setItem("username", username); // Store the username locally
//       window.location.replace("play.html");
//       isLoggedIn = true;
//     } else {
//       alert("Invalid username or password. Please try again.");
//     }
//   }
  
// function logout() {
//   // Perform logout logic here
//   // Example: Clear any stored authentication tokens or session data

//   // Remove the username from local storage
//   localStorage.removeItem("username");

//   // Reload the index.html page to display the login form again
//   window.location.reload();
// }
  
const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 4000; // Use the port specified in the environment variable or 3000 as default

app.use(express.json());
app.use(express.static('public'));

// Authentication endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  // Perform authentication logic here
  // Example: Make an API call to verify the username and password
  
  // If authentication is successful, redirect the user to the play.html screen
  const authenticated = true; // Replace with your authentication check
  
  if (authenticated) {
    res.redirect(`/play?username=${username}`);
  } else {
    res.status(401).json({ success: false, message: "Invalid username or password. Please try again." });
  }
});

app.get('/play', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'play.html'));
});

app.use((_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
