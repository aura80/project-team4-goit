import fetchEvents from './events.js';
import axios from 'axios';
import { renderPagination } from './pagination.js';


let currentPage = 0; // Zero-based page index for API
const limit = 16;
const maxPagesAccepted = 1000 / limit; // API max limit (page * size) must be less than 1,000

const countryInput = document.getElementById('country-input');

// Fetch and render events
async function updatePage(query) {

    const data = await fetchEvents(query, currentPage, limit);
    renderEvents(data.events);
    document.getElementById('page-number').textContent = currentPage;

    // Disable/Enable pagination buttons
    document.getElementById('prev').disabled = currentPage === 1;
    document.getElementById('next').disabled = data.pageInfo.number >= data.pageInfo.totalPages - 1;

    // Adăugăm evenimentele pentru a deschide modalul
    addModalEventListeners();
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
        .map(
            event => `
                <div class="event-card" data-id="${event.id}" data-url="${event.url}" data-standard-url="${event.url}?pricing=standard">
                    <h3>${event.name}</h3>
                    <p>${event.dates.start.localDate}</p>
                    <p>${event._embedded.venues[0].name}</p>
                </div>
            `
        )
        .join('');
}

function addModalEventListeners() {
    const modal = document.getElementById('myModal');
    const closeModal = document.querySelector('.close');
    
    const modalEventInfo = document.querySelector('.event__info');
    const modalEventWhen = document.querySelector('.event-when-box');
    const modalEventDate = document.querySelector('.event__start_date');
    const modalEventLocation = document.querySelector('.event__place');
    const modalEventWho = document.querySelector('.event__who-mob');
    const modalEventPrices = document.querySelector('.event__prices-mob');

    console.log('modalEventInfo:', modalEventInfo); 
    console.log('modalEventWhen:', modalEventWhen); 
    console.log('modalEventDate:', modalEventDate); 
    console.log('modalEventLocation:', modalEventLocation); 
    console.log('modalEventWho:', modalEventWho); 
    console.log('modalEventPrices:', modalEventPrices);

    document.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('click', async function () {
            const eventId = card.getAttribute('data-id');
            try {
                const eventDetails = await fetchEventDetails(eventId);
                if (eventDetails) {
                    modalEventInfo.textContent = eventDetails.info || 'No additional information available';
                    const eventDate = new Date(eventDetails.dates.start.dateTime).toLocaleDateString();
                    const eventTime = new Date(eventDetails.dates.start.dateTime).toLocaleTimeString();
                    const eventLocation = `${eventDetails._embedded.venues[0].name}, ${eventDetails._embedded.venues[0].city.name}`;

                    modalEventWhen.innerHTML = `<h2>WHEN</h2><p>${eventDate}</p><p>${eventTime} (${eventLocation})</p>`;
                    modalEventDate.innerHTML = `<p>${eventDate}</p><p>${eventTime}</p>`;
                    modalEventLocation.innerHTML = `<p>${eventLocation}</p>`;

                    if (eventDetails.priceRanges && eventDetails.priceRanges.length > 0) {
                        const standardPriceMin = eventDetails.priceRanges[0].min;
                        const standardPriceMax = eventDetails.priceRanges[0].max;
                        const currency = eventDetails.priceRanges[0].currency;
                        modalEventPrices.innerHTML = `<div class="event_single-price">
                                <p>Standard ${standardPriceMin} - ${standardPriceMax} ${currency}</p>
                                <button class="buyTicketButton">Buy Ticket</button>
                            </div>
                            <div class="event_single-price">
                                 <p>VIP(${standardPriceMin} - ${standardPriceMax} ${currency})</p> 
                                 <button id="buyStandardTicketButton">Buy Standard Ticket</button>
                                 </div>
                        `;
                    } else {
                        modalEventPrices.textContent = 'No Price Information Available';
                    }

                    modalEventWho.textContent = eventDetails._embedded.attractions ? eventDetails._embedded.attractions.map(attraction => attraction.name).join(', ') : 'No Information Available';

                    modal.style.display = 'block';
                } else {
                    console.error('Event details not found');
                }
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        });
    });

    closeModal.onclick = function () {
        modal.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

async function fetchEventDetails(eventId) {
    try {
        const API_KEY = 'ABgCFeGHE7lHgwV23hsJAFL80GX9ypoh';
        const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${API_KEY}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching event details:', error.message);
        return null;
    }
  
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
