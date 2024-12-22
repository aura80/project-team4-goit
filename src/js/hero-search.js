import updatePage from './main.js';

const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('btn-search');

function getSearchEventValue() {
  return searchInput.value.trim() !== '' ? searchInput.value.trim() : 'events';
}

// Event listener for the search button
searchBtn.addEventListener('click', () => {
  const searchEvent = getSearchEventValue();
  window.currentPage = 0;
  updatePage(searchEvent);
});

// Event listener for the Enter key
searchInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    const searchEvent = getSearchEventValue();
    window.currentPage = 0;
    updatePage(searchEvent);
  }
});

////////// Back to the top //////////

const backToTopButton = document.getElementById('back-to-top');
window.addEventListener('scroll', toggleBackToTopButton);
backToTopButton.addEventListener('click', scrollToTop);
backToTopButton.addEventListener('mouseenter', handleHover);
backToTopButton.addEventListener('mouseleave', handleMouseLeave);

function toggleBackToTopButton() {
  if (window.scrollY > 50) {
    backToTopButton.style.opacity = '30%';
    backToTopButton.style.pointerEvents = 'auto';
  } else {
    backToTopButton.style.opacity = '0';
    backToTopButton.style.pointerEvents = 'none';
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function handleHover() {
  backToTopButton.style.opacity = '100%';
}

function handleMouseLeave() {
  if (window.scrollY > 50) {
    backToTopButton.style.opacity = '30%';
  } else {
    backToTopButton.style.opacity = '0';
  }
}

////////// Dark/Light Mode //////////

const themeToggle = document.getElementById('themeToggle');
const heroWallpaperDarkMode = require('../images/header/hero-wallpaper_dark-mode.png');
const bodyDarkMode = require('../images/header/body_dark-mode.png');
const heroWallpaperLightMode = require('../images/header/hero-wallpaper_light-mode.jpg');
const bodyLightMode = require('../images/header/body_light-mode.jpg');

function applyTheme(theme) {
  const heroSection = document.querySelector('.hero_section');
  const bodySection = document.body;
  const heroSearch = document.querySelector('.hero-input');
  const heroFilter = document.querySelector('.country-input');
  const heroFilterDropdown = document.querySelector('.country-container');
  const mainCardsDate = document.querySelectorAll('.event-card-date');
  const mainCardsPlace = document.querySelectorAll('.event-card-place');
  const mainCardIcons = document.querySelectorAll('.event-card-icon svg');
  const mainPaginationLinks = document.querySelectorAll('.paginationjs-theme-grey.custom-paginationjs li a');
  const modalText = document.querySelectorAll('.when p');
  const pinIcons = document.querySelectorAll('.event-card-place:before');
  // am incercat ".event-card-pin", ".event-card-place:before", ".event-card-place svg"

  // Exclude modal text from theme changes by applying specific styling
  modalText.forEach(el => {
    el.style.color = 'rgba(14, 14, 14, 1)';
  });

  if (theme === 'dark') {
    heroSection.style.backgroundImage = `
      linear-gradient(to bottom, rgba(13, 13, 13, 0.19), rgba(14, 14, 14, 0.8)),
      url(${heroWallpaperDarkMode})`;
    heroSection.style.backgroundPosition = 'center';
    heroSection.style.backgroundSize = 'cover';
    heroSection.style.backgroundRepeat = 'no-repeat';
    heroSection.style.margin = '0 auto';

    bodySection.style.backgroundImage = `url(${bodyDarkMode})`;
    bodySection.style.backgroundPosition = 'center';
    bodySection.style.backgroundSize = 'cover';
    bodySection.style.backgroundRepeat = 'no-repeat';
    bodySection.style.margin = '0 auto';

    heroSearch.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    heroSearch.style.color = 'rgba(147, 147, 147, 1)';
    heroFilter.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    heroFilter.style.color = 'rgba(147, 147, 147, 1)';
    heroFilterDropdown.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    heroFilterDropdown.style.color = 'rgba(147, 147, 147, 1)';

    mainCardsDate.forEach(el => el.style.color = 'white');
    mainCardsPlace.forEach(el => el.style.color = 'white');
    mainCardIcons.forEach(el => el.style.fill = 'white');
    mainPaginationLinks.forEach(el => el.style.color = 'white');

    pinIcons.forEach(pin => pin.style.fill = 'white');

    document.body.style.color = 'white';
    themeToggle.setAttribute('data-theme', 'dark');

  } else {
    heroSection.style.backgroundImage = `url(${heroWallpaperLightMode})`;
    heroSection.style.backgroundPosition = 'center';
    heroSection.style.backgroundSize = 'cover';
    heroSection.style.backgroundRepeat = 'no-repeat';
    heroSection.style.margin = '0 auto';

    bodySection.style.backgroundImage = `url(${bodyLightMode})`;
    bodySection.style.backgroundPosition = 'center';
    bodySection.style.backgroundSize = 'cover';
    bodySection.style.backgroundRepeat = 'no-repeat';
    bodySection.style.margin = '0 auto';

    heroSearch.style.backgroundColor = 'black';
    heroSearch.style.color = 'white';
    heroFilter.style.backgroundColor = 'black';
    heroFilter.style.color = 'white';
    heroFilterDropdown.style.backgroundColor = 'black';
    heroFilterDropdown.style.color = 'white';

    mainCardsDate.forEach(el => el.style.color = 'black');
    mainCardsPlace.forEach(el => el.style.color = 'black');
    mainCardIcons.forEach(el => el.style.fill = 'black');
    mainPaginationLinks.forEach(el => el.style.color = 'black');

    pinIcons.forEach(pin => pin.style.fill = 'black');

    document.body.style.color = 'black';
    themeToggle.setAttribute('data-theme', 'light');
  }
}

function handlePaginationClick() {
  const currentTheme = themeToggle.getAttribute('data-theme');
  applyTheme(currentTheme);
}

themeToggle.addEventListener('click', () => {
  const currentTheme = themeToggle.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
});

document.addEventListener('DOMContentLoaded', () => {
  applyTheme('dark');
  const paginationLinks = document.querySelectorAll('.paginationjs-theme-grey.custom-paginationjs li a');
  paginationLinks.forEach(link => {
    link.addEventListener('click', handlePaginationClick);
  });
});

