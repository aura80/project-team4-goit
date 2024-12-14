import fetchEvents from './events.js';

let currentPage = 1;
const limit = 20;

async function updatePage(query) {
  const data = await fetchEvents(query, currentPage, limit);
  renderEvents(data.events);
  document.getElementById('page-number').textContent = currentPage;

  // Disable/Enable pagination buttons
  document.getElementById('prev').disabled = currentPage === 1;
  document.getElementById('next').disabled =
    data.pageInfo.number >= data.pageInfo.totalPages - 1;
}

function renderEvents(events) {
  const eventCards = document.getElementById('event-cards');
  eventCards.innerHTML = events
    .map(
      event => `
        <div class="event-card">
            <h3>${event.name}</h3>
            <p>${event.dates.start.localDate}</p>
            <p>${event._embedded.venues[0].name}</p>
        </div>
    `
    )
    .join('');
}

document.getElementById('search').addEventListener('input', async event => {
  const query = event.target.value;
  currentPage = 1; // Reset to first page on new search
  await updatePage(query);
});

document.getElementById('prev').addEventListener('click', async () => {
  if (currentPage > 1) {
    currentPage--;
    const query = document.getElementById('search').value;
    await updatePage(query);
  }
});

document.getElementById('next').addEventListener('click', async () => {
  currentPage++;
  const query = document.getElementById('search').value;
  await updatePage(query);
});

// Initial fetch
updatePage('');
