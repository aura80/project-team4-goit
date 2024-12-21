import updatePage from './main.js';

document.addEventListener('DOMContentLoaded', () => {
  const eventCardsContainer = document.getElementById('event-cards');
  const modal = document.getElementById('event-modal');
  const modalOverlay = document.getElementById('event-modal-overlay');
  const closeBtn = document.querySelector('.event-close-btn');
  const modalEventDetails = document.getElementById('modal-event-details');

  // Open modal
  eventCardsContainer.addEventListener('click', async event => {
    const eventCard = event.target.closest('.event-card');
    let eventName;
    if (eventCard) {
      const eventId = eventCard.getAttribute('data-id');

      if (eventId) {
        try {
          // Show spinner at modal load
          spinner.style.display = 'block';

          // Fetch event details from API
          const response = await fetch(
            `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=ABgCFeGHE7lHgwV23hsJAFL80GX9ypoh`
          );
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const eventData = await response.json();

          eventName = eventData.name || '';
          const eventDate = eventData.dates?.start?.localDate || '';
          const eventTime = eventData.dates?.start?.localTime || '';
          const eventLocation = eventData._embedded?.venues?.[0]?.name || '';
          const eventImage =
            eventData.images?.[0]?.url ||
            'https://via.placeholder.com/427x326?text=No+Image';
          const ticketPrices = eventData.priceRanges || [];
          const buyStandardTicketUrl = eventData.url || '';
          const buyVipTicketUrl = `${eventData._embedded?.venues?.[0]?.url}?addOnType=VIP`;

          let minPrice = Math.min(
            ticketPrices[0]?.min ?? Infinity,
            ticketPrices[1]?.min ?? Infinity
          );
          let maxPrice = Math.max(
            ticketPrices[0]?.max ?? -Infinity,
            ticketPrices[1]?.max ?? -Infinity
          );

          if (modalEventDetails) {
            modalEventDetails.innerHTML = `
                <div class="pic-circle">
                  <img src="${eventImage}" alt="${eventName}">
                </div>
                <div class="event-content">
                  <div class="pic">
                    <img src="${eventImage}" alt="${eventName}">
                  </div>
                  <div class="modal-details">
                    <div class="modal-info">
                      <strong>INFO</strong>
                      <div class="event-info">
                      <p>${
                        eventData.info || 'No additional information available.'
                      }</p>
                      </div>
                    </div>
                    <div class="when">
                      <strong>WHEN</strong>
                      <div class="when-info">
                      <p>${eventDate}</p>
                      <p>${eventTime} (${eventLocation})</p>
                      </div>
                    </div>
                    <div class="where">
                      <strong>WHERE</strong>
                      <div class="where-info">
                      <p>${eventLocation}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="who">
                  <strong>WHO</strong>
                  <p>${eventName}</p>
                </div>
                <div class="prices">
                  <strong>PRICES</strong>
                  ${
                    ticketPrices.length !== 0
                      ? `
                  <div class="prices-container">
                    <div class="price-item">
                    <div class="price-info">
                      <div class="barcode"></div> <!-- Placeholder for barcode image -->
                      <div class="standard-price">
                        <p>STANDARD: $${minPrice} ${
                          ticketPrices[0]?.currency
                        } - $${ticketPrices[0]?.max} ${
                          ticketPrices[0]?.currency
                        }</p>
                      </div>
                    </div>
                        <button id="buyStandardButton" class="buy-button-standard" data-url="${buyStandardTicketUrl}">Buy Tickets</button>
                      </div>
                    ${
                      ticketPrices[1]
                        ? `
                      <div class="price-item">
                      <div class="price-info">
                        <div class="barcode"></div> <!-- Placeholder for barcode image -->
                        <div class="vip-price">
                          <p>VIP: $${maxPrice} ${ticketPrices[1]?.currency} - $${ticketPrices[1]?.max} ${ticketPrices[1]?.currency}</p>
                          </div>
                          </div>
                          <button id="buyVipButton" class="buy-button-vip" data-url="${buyVipTicketUrl}">Buy Tickets</button>
                      </div>`
                        : ''
                    }
                  </div>`
                      : 'There are no tickets available for this event'
                  }
                </div>
                <button id="more-from-authors" class="more-button" data-name="nameArtist">MORE FROM THIS AUTHOR</button>
              `;
          }

          modal.style.display = 'block';
          modalOverlay.style.display = 'block';

          // hide spinner after 500 ms
          setTimeout(() => {
            spinner.style.display = 'none';
          }, 1200);

          const modalMoreBtn = document.getElementById('more-from-authors');

          function getEventNameFromModal() {
            return eventName;
          }

          modalMoreBtn.addEventListener('click', () => {
            const searchEvent = getEventNameFromModal();
            updatePage(searchEvent);
            modal.style.display = 'none';
            modalOverlay.style.display = 'none';
          });

        } catch (error) {
          console.error('Failed to fetch event details:', error);
        }
      } else {
        console.error('Event ID is null');
      }
    }
  });

  // Close modal when clicking on close button
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    modalOverlay.style.display = 'none';
  });

  // Close modal when clicking outside of the modal
  modalOverlay.addEventListener('click', () => {
    modal.style.display = 'none';
    modalOverlay.style.display = 'none';
  });
});
