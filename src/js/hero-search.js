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
