import fetchEvents from './events.js';
let currentPage = 1;
const limit = 20;
const countryInput = document.getElementById('country-input');
async function updatePage(query) {
  try {
    // Get country code from country input
    const countryCode = countryInput.getAttribute('data-country');
    const data = await fetchEvents(query, currentPage, limit, countryCode);

    if (data.events && data.events.length > 0) {
      renderEvents(data.events);
      updatePagination(data.pageInfo);
    } else {
      renderNoEventsMessage();
    }
  } catch (error) {
    console.error('Error updating page:', error.message);
    renderErrorMessage();
  }
}
function renderEvents(events) {
  const eventCards = document.getElementById('event-cards');
  eventCards.innerHTML = events
    .map(event => {
      let eventName = event.name || '';
      let eventDate = event.dates?.start?.localDate || '';
      let eventLocation = event._embedded?.venues?.[0]?.name || '';
      return `
      <div class="event-card">
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
function renderNoEventsMessage() {
  const eventCards = document.getElementById('event-cards');
  eventCards.innerHTML = '<p>No events found. Please refine your search.</p>';
}
function renderErrorMessage() {
  const eventCards = document.getElementById('event-cards');
  eventCards.innerHTML =
    '<p>There was an error fetching events. Please try again later.</p>';
}
function updatePagination(pageInfo) {
  document.getElementById('page-number').textContent = currentPage;
  document.getElementById('prev').disabled = currentPage === 1;
  document.getElementById('next').disabled =
    pageInfo.number >= pageInfo.totalPages - 1;
}
document.getElementById('prev').addEventListener('click', async () => {
  if (currentPage > 1) {
    currentPage--;
    const query = document.getElementById('search').value.trim() || 'events';
    await updatePage(query);
  }
});
document.getElementById('next').addEventListener('click', async () => {
  currentPage++;
  const query = document.getElementById('search').value.trim() || 'events';
  await updatePage(query);
});
// Initial fetch
updatePage('events');
export default updatePage;
