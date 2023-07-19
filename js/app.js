const global = {
  currentpage: window.location.pathname,
};

// === MOVIE: DISPLAY 20 MOST POPULAR MOVIES ===
async function displayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");

  results.forEach((movie) => {
    const div = document.createElement("div");
    div.className = "col-xl-3 col-lg-4";

    div.innerHTML = `
    <div class="card movie-card">
      ${
        movie.poster_path
          ? `<a href="./movie-details.html?id=${movie.id}">
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

// ===  TV SHOWS: DISPLAY 20 MOST POPULAR TV SHOWES ===
async function displayPopularShows() {
  const { results } = await fetchAPIData("tv/popular");

  results.forEach((show) => {
    const div = document.createElement("div");
    div.className = "col-xl-3 col-lg-4";
    div.innerHTML = `<div class="card movie-card">
        ${
          show.poster_path
            ? `
          <a href="./tv-details.html?id=${show.id}">
            <img
            src="https://www.themoviedb.org/t/p/w300${show.poster_path}"
            class="card-img-top"
            alt="${show.name}"/>
        </a>`
            : `
             <img
            src="./assets/images/movie-thumnail.jpg"
            class="card-img-top"
            alt="Movie Titlte"/>`
        }

      <div class="card-body">
        <h5 class="card-title">${show.name}</h5>
        <p class="card-text">Aired: ${show.first_air_date}</p>
      </div>
    </div>`;

    document.getElementById("popular-shows").appendChild(div);
  });
}

// === DISPLAY MOVIE DETAILS ===
async function displayMovieDetails() {
  const movieId = window.location.search.split("=")[1];
  const movie = await fetchAPIData(`movie/${movieId}`);

  // Overlay for Background Image
  let movieBackDropPath = `https://www.themoviedb.org/t/p/original${movie.backdrop_path}`;
  displayBackgroundImage("movie", movieBackDropPath);

  const div = document.createElement("div");
  div.innerHTML = `
          <div class="row details-top">
          <div class="col-lg-4 col-md-5">
            ${
              movie.poster_path
                ? `<img
              src="https://www.themoviedb.org/t/p/w300${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />`
                : `<img
              src="./assets/images/movie-thumnail.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`
            }
          </div>

          <div class="right-movie-info offset-lg-1 col-lg-7 col-md-7">
            <h2>${movie.title}</h2>
            <p><i class="icon-star-filled pe-2 text-warning"></i>${movie.vote_average.toFixed(
              1
            )}/10</p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <p>Series</p>
            <ul>
            ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
            </ul>

            <a class="btn btn-outline-light" href="${
              movie.homepage
            }" target="_blank"
              >Visit Movie Homepage</a
            >
          </div>
        </div>

        <div class="details-bottom py-5">
          <h2>Movie Info</h2>

          <ul>
            <li><span class="text-secondary">Budget: </span>$${commatoTheNumber(
              movie.budget
            )}</li>
            <li><span class="text-secondary">Revenue: </span>$${commatoTheNumber(
              movie.revenue
            )}</li>
            <li><span class="text-secondary">Runtime: </span>${
              movie.runtime
            } Minutes</li>
            <li><span class="text-secondary">Status: </span>${movie.status}</li>
          </ul>

          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies.map(
            (company) => ` ` + company.name
          )}</div>
        </div>`;

  document.getElementById("movie-details").appendChild(div);
}

// === DISPLAY TV SHOW DETAILS ===
async function displayShowDetails() {
  const showId = window.location.search.split("=")[1];
  const show = await fetchAPIData(`tv/${showId}`);
  console.log(show);

  // Overlay for Background Image
  let movieBackDropPath = `https://www.themoviedb.org/t/p/original${show.backdrop_path}`;
  displayBackgroundImage("show", movieBackDropPath);

  const div = document.createElement("div");
  div.innerHTML = `
          <div class="row show-top">
          <div class="col-lg-4 col-md-5">
            ${
              show.poster_path
                ? `<img
              src="https://www.themoviedb.org/t/p/w300${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />`
                : `<img
              src="./assets/images/movie-thumnail.jpg"
              class="card-img-top"
              alt="${show.title}"
            />`
            }
          </div>

          <div class="right-show-info offset-lg-1 col-lg-7 col-md-7">
            <h2>${show.name}</h2>
            <p><i class="icon-star-filled pe-2 text-warning"></i>${show.vote_average.toFixed(
              1
            )}/10</p>
            <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
            <p>
              ${show.overview}
            </p>
            <p class="mt-4 mb-1 fw-800">Series</p>
            <ul class="">
            ${show.genres.map((genre) => `<li >${genre.name}</li>`).join("")}
            </ul>

            <a class="btn btn-outline-light" href="${
              show.homepage
            }" target="_blank"
              >Visit Movie Homepage</a
            >
          </div>
        </div>

        <div class="show-bottom py-5">
          <h2>Show Info</h2>

          <ul>
            <li><span class="text-secondary">Number of Episodes: </span>${
              show.number_of_episodes
            } Minutes</li>
             <li><span class="text-secondary">Last Episodes: </span>${
               show.last_episode_to_air.air_date
             } Minutes</li>
            <li><span class="text-secondary">Status: </span>${show.status}</li>
          </ul>

          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies.map(
            (company) => ` ` + company.name
          )}</div>
        </div>`;

  document.getElementById("show-details").appendChild(div);
}

// === DISPLAY SLIDER PLAYING MOVIE ===
async function displaySlider() {
  const { results } = await fetchAPIData("movie/now_playing");
  console.log(results[1]);

  results.forEach((movie) => {
    const div = document.createElement("div");
    div.className = "swiper-slide shadow-lg";

    div.innerHTML = `
    <div class="card playing-movie-card">
      <a href="movie-details.html?id=${movie.id}" target="_blank">
        <img
          src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2${
            movie.poster_path
          }"
          class="card-img-top"
          alt="${movie.title}"
        />
      </a>
      <div class="card-body">
        <p class="card-title">
          <i class="icon-star-filled text-warning me-2"></i>${movie.vote_average.toFixed(
            1
          )}/10
        </p>
      </div>
    </div>`;

    document.querySelector(".swiper-wrapper").appendChild(div);

    initSwiper();
  });
}

// Init Swiper
function initSwiper() {
  const swiper = new Swiper(".swiper", {
    // Default parameters
    slidesPerView: 4,
    spaceBetween: 30,
    // speed: 400,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },

    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
      },
      // when window width is >= 480px
      500: {
        slidesPerView: 2,
      },
      // when window width is >= 640px
      700: {
        slidesPerView: 3,
      },

      // when window width is >= 1000px
      1200: {
        slidesPerView: 4,
      },
    },
  });
}
// === MAIN FUNCTION: FETCH DATA ===
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

// Show Spinner
function showSpinner() {
  document.querySelector(".spinner").classList.add("loading");
}
// Hide Spinner
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

// DisplayBackgroup on Details Pages
function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement("div");
  // overlayDiv.classList.add("overlayBackground");
  overlayDiv.style.backgroundImage = `url(${backgroundPath})`;
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.backgroundRepeat = "no-repeat";
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = "0.1";
  overlayDiv.style.position = "fixed";

  if (type === "movie") {
    document.querySelector(".movie-details").appendChild(overlayDiv);
  } else {
    document.querySelector(".show-details").appendChild(overlayDiv);
  }
}

// Commas to the Number
function commatoTheNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Init App
function init() {
  switch (global.currentpage) {
    case "/":
    case "/index.html":
      displaySlider();
      displayPopularMovies();
      break;
    case "/shows.html":
      displayPopularShows();
      break;
    case "/movie-details.html":
      displayMovieDetails();
      break;
    case "/tv-details.html":
      displayShowDetails();
      break;
  }

  highlightActiveLink();
}

init();
