import updatePage from './main.js';

const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('btn-search');

function getSearchEventValue() {
  return searchInput.value.trim() !== '' ? searchInput.value.trim() : 'events';
}

// Event listener for the search button
searchBtn.addEventListener('click', () => {
  const searchEvent = getSearchEventValue();
  updatePage(searchEvent);
});

// Event listener for the Enter key
searchInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    const searchEvent = getSearchEventValue();
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





