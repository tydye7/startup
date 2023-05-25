function login(event) {
    event.preventDefault();
  
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    // Perform authentication logic here
    // Example: Make an API call to verify the username and password
  
    // If authentication is successful, redirect the user to the play.html screen
    var authenticated = true; // Replace with your authentication check
  
    if (authenticated) {
      window.location.replace("play.html");
      isLoggedIn = true;
    } else {
      alert("Invalid username or password. Please try again.");
    }
  }
  
  function logout() {
    // Perform logout logic here
    // Example: Clear any stored authentication tokens or session data
  
    // Reload the index.html page to display the login form again
    window.location.reload();
  }
  