// API key for the OMDb API
const apiKey = 'cd79f2ed';

// Function to handle search button click event
function handleSearch() {
  const searchInput = document.getElementById('search-input');
  const searchTerm = searchInput.value.trim();
  if (searchTerm === '') {
    alert('Please enter a movie title');
    return;
  }

  const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerm)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.Response === 'True') {
        if (data.Search && data.Search.length > 0) {
          openResultsPage(data.Search);
        } else {
          displayNoResultsMessage();
        }
      } else {
        alert(data.Error);
      }
    })
    .catch(error => {
      console.log('Error:', error);
      alert('An error occurred while fetching data from the API');
    });
}

// Function to open results page in a new window or tab
function openResultsPage(results) {
  const resultsJson = JSON.stringify(results);
  const newWindow = window.open('', '_blank');
  newWindow.document.write(`
    <html>
      <head>
        <title>Search Results</title>
        
        
      </head>
      <body>
      <style>
      * {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font-weight: normal;
      background: none;
      box-sizing: border-box;
      text-decoration: none;
      color: #fff;
      display: flexbox;
    }
    
    .star {
      color: yellow;
    }
    
    ol,
    ul {
      list-style: none;
    }
    
    :root {
      --color-primary: #eef5db;
      --color-secondary: #050f1a;
      --color-dark: #0a2239;
      --radius: 20px;
      --radius-small: 10px;
      --font: 500 1.1rem 'Poppins', sans-serif;
      --font-mobile: 400 0.9rem 'Poppins', sans-serif;
    }
    
    body {
      background: rgb(4, 19, 42);
      background: linear-gradient(90deg, rgba(4, 19, 42, 1) 0%, rgba(0, 0, 0, 0.95) 50%, rgba(4, 19, 42, 1) 100%);
      display: flex;
    
    }
    header {
      background: var(--color-secondary);
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 90;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 30px;
      background-color: orangered;
    }

    .navbar {
      display: flex;
      gap: 20px;
    }

    .navbar li {
      font: var(--font);
    }

    .navbar li:hover {
      background: var(--color-primary);
      color: var(--color-dark);
    }

    .navbar li a {
      color: #fff;
      text-decoration: none;
    }

    h1 {
      font: var(--font);
      letter-spacing: 0.05rem;
    }

    .search-container {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
      margin: 20px;
    }

    #search-input {
      font: var(--font-mobile);
      padding: 5px;
      border-radius: var(--radius);
      background: var(--color-dark);
      color: #fff;
      border: none;
    }

    #search-button {
      font: var(--font-mobile);
      padding: 5px 10px;
      border-radius: var(--radius);
      background: var(--color-dark);
      border: 1px solid var(--color-primary);
      color: var(--color-primary);
      cursor: pointer;
      transition: background 0.3s ease-in-out;
    }

    #search-button:hover {
      background: var(--color-primary);
      color: var(--color-dark);
    }

    main {
      margin-top: 100px;
      padding: 20px;
      display: content;
      justify-content: space-around;

    }
    p,h1 {
      font: var(--font-mobile);
      color: #fff;
      margin-left: 10px;
      
    }
  </style>
      <header>
      <nav>
        <ul class="navbar">
          <li><a href="#">Home</a></li>
          <li><a href="#">Movies</a></li>
          <li><a href="#">TV Shows</a></li>
          <li><a href="#">Favorites</a></li>
        </ul>
      </nav>
      <h1 >Carrot Movies</h1>
      <div class="search-container">
        <input
          type="text"
          id="search-input"
          placeholder="Enter a movie title..."
        />
        <button id="search-button">Search</button>
      </div>
    </header>
     <main>
        <h1>Search Results</h1>
        <div id="results-container"></div>

        
      
        
        <script>
          const results = ${resultsJson};

          function displayResults(results) {
            const resultsContainer = document.getElementById('results-container');
            resultsContainer.innerHTML = '';

            results.forEach(movie => {
              const movieCard = document.createElement('div');
              movieCard.classList.add('movie-card');

              const title = document.createElement('h2');
              title.textContent = movie.Title;

              const poster = document.createElement('img');
              poster.src = movie.Poster === 'N/A' ? 'placeholder.png' : movie.Poster;

              const releaseYear = document.createElement('p');
              releaseYear.textContent = 'Release Year: ' + movie.Year;

             

              movieCard.appendChild(title);
              movieCard.appendChild(poster);
              movieCard.appendChild(releaseYear);
              

              resultsContainer.appendChild(movieCard);
            });
          }

          function displayNoResultsMessage() {
            const resultsContainer = document.getElementById('results-container');
            resultsContainer.innerHTML = '';

            const message = document.createElement('p');
            message.textContent = 'No results found.';
            message.classList.add('no-results-message');

            resultsContainer.appendChild(message);
          }

          displayResults(results);
        </script>
        <script src="script.js"></script>
        </main>
      </body>
    </html>
  `);
  newWindow.document.close();
}

// Event listener for the search button
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', handleSearch);
