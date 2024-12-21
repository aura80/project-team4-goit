import fetchEvents from './events.js';
import { renderPagination } from './pagination.js';
import './modal.js';

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
      const eventId = event.id;
      const eventName = event.name || '';
      const eventDate = event.dates?.start?.localDate || '';
      const eventLocation = event._embedded?.venues?.[0]?.name || '';
      const imageUrl =
        event.images?.find(image => image.ratio === '16_9')?.url ||
        event.images?.[0]?.url ||
        'https://via.placeholder.com/300x200?text=No+Image'; // Default image if none available

      return `
      <div class="event-card" data-id="${eventId}">
        <img src="${imageUrl}" alt="${eventName}" class="event-card-image">
        <h3 class="event-card-name">${eventName}</h3>
        <p class="event-card-date">${eventDate}</p>
        <p class="event-card-place">${eventLocation}
          <span class="event-card-pin"></span>
        </p>
      </div>
    `;
    })
    .join('');
}

// Render no events message
function renderNoEventsMessage() {
  const eventCards = document.getElementById('event-cards');
  eventCards.innerHTML = '<p class="noeventsfound">No events found. Please refine your search.</p>';
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
