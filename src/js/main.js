import fetchEvents from './events.js';
import { renderPagination } from './pagination.js';

let currentPage = 0; // Zero-based page index for API
const limit = 16;
const maxPagesAccepted = 1000 / limit; // API max limit (page * size) must be less than 1,000

const countryInput = document.getElementById('country-input');

// Fetch and render events
async function updatePage(query) {
  try {
    // Get country code from country input
    const countryCode = countryInput.getAttribute('data-country');
    const data = await fetchEvents(query, currentPage, limit, countryCode);

    if (data.events && data.events.length > 0) {
      renderEvents(data.events);

      const maxPages =
        data.pageInfo.totalPages > maxPagesAccepted
          ? maxPagesAccepted
          : data.pageInfo.totalPages;

      renderPagination(maxPages, currentPage, handlePageChange);
    } else {
      renderNoEventsMessage();
    }
  } catch (error) {
    console.error('Error updating page:', error.message);
    renderErrorMessage();
  }
}

// Handle page change from pagination
function handlePageChange(newPage) {
  currentPage = newPage; // Update the zero-based page index
  const query = document.getElementById('search').value.trim() || 'events';
  updatePage(query);
}

// Render events
function renderEvents(events) {
  const eventCards = document.getElementById('event-cards');
  eventCards.innerHTML = events
    .map(event => {
      let eventName = event.name || '';
      let eventDate = event.dates?.start?.localDate || '';
      let eventLocation = event._embedded?.venues?.[0]?.name || '';
      return `
      <div class="event-card">
          <h3>${eventName}</h3>
          <p>${eventDate}</p>
          <p>${eventLocation}</p>
      </div>
    `;
    })
    .join('');
}

// Render no events message
function renderNoEventsMessage() {
  const eventCards = document.getElementById('event-cards');
  eventCards.innerHTML = '<p>No events found. Please refine your search.</p>';
  document.getElementById('pagination').style.display = 'none';
}

// Render error message
function renderErrorMessage() {
  const eventCards = document.getElementById('event-cards');
  eventCards.innerHTML =
    '<p>There was an error fetching events. Please try again later.</p>';
}

// Initial fetch
updatePage('events');

export default updatePage;
