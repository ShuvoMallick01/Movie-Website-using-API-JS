const global = {
  currentpage: window.location.pathname,
};

// Display Popular Movies
async function displayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");

  results.forEach((movie) => {
    // console.log(movie);
    const div = document.createElement("div");
    div.className = "col-xl-3 col-lg-4";

    div.innerHTML = `
    <div class="card movie-card">
      ${
        movie.poster_path
          ? `<a href="./movie-details.html/${movie.id}">
        <img src="https://www.themoviedb.org/t/p/w300${movie.poster_path}"
        class="card-img-top" alt="${movie.title}"
      />
      </a>`
          : `<img
              src="./assets/images/movie-thumnail.jpg"
              class="card-img-top"
              alt="Movie Titlte"
            />`
      }
      
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">Release: ${movie.release_date}</p>
      </div>
    </div>`;

    const popularMovie = document.getElementById("popular-movies");
    popularMovie.appendChild(div);
  });
}

// Fetch Data
async function fetchAPIData(endpoint) {
  const API_KEY = "4bc2ad4ae277f2a876e4ab1951a4111b";
  const API_URL = "https://api.themoviedb.org/3/";
  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  hideSpinner();

  return data;
}

// Show / Hide Spinner
function showSpinner() {
  document.querySelector(".spinner").classList.add("loading");
}

function hideSpinner() {
  document.querySelector(".spinner").classList.remove("loading");
}

// HighLight Active Link / highlightActiveLink / links
function highlightActiveLink() {
  const links = document.querySelectorAll(".nav-link");

  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentpage) {
      link.classList.add("active");
    }
  });
}

// Init App
function init() {
  switch (global.currentpage) {
    case "/":
    case "/index.html":
      displayPopularMovies();
      break;
    case "/shows.html":
      console.log("Tv Show Page");
      break;
    case "/movie-details":
      console.log("Movie Details");
      break;
    case "/tv-details":
      console.log("TV Deatils");
      break;
  }

  highlightActiveLink();
}

init();
