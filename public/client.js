function displayRandomQuote() {
    fetch('https://api.quotable.io/random')
      .then(response => response.json())
      .then(data => {
        const quoteElement = document.getElementById('quote');
        quoteElement.textContent = data.content; // Update the quote element's text content
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  displayRandomQuote();
  