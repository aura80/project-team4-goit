import fetchEvents from './events.js';
import axios from 'axios';

let currentPage = 1;
const limit = 20;

async function updatePage(query) {
    const data = await fetchEvents(query, currentPage, limit);
    renderEvents(data.events);
    document.getElementById('page-number').textContent = currentPage;

    // Disable/Enable pagination buttons
    document.getElementById('prev').disabled = currentPage === 1;
    document.getElementById('next').disabled = data.pageInfo.number >= data.pageInfo.totalPages - 1;

    // Adăugăm evenimentele pentru a deschide modalul
    addModalEventListeners();
}

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
