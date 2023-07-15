const global = {
  currentpage: window.location.pathname,
};

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
      console.log("Home Page");
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
