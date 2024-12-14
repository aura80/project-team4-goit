document.addEventListener('DOMContentLoaded', function () {
  const apiKey = 'ABgCFeGHE7lHgwV23hsJAFL80GX9ypoh'; // Cheia ta API
  const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}`;
  const modal = document.getElementById('myModal');
  const span = document.getElementsByClassName('close')[0];
  const eventContainer = document.getElementById('eventContainer');
  const modalEventName = document.getElementById('modalEventName');

  // Fetch events from Ticketmaster API
  function fetchEvents() {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Events fetched:', data); // Log pentru verificare
        if (data._embedded && data._embedded.events) {
          const events = data._embedded.events;
          populateEvents(events);
        } else {
          console.error('No events found in the response');
          eventContainer.innerHTML = '<p>No events found.</p>';
        }
      })
      .catch(error => {
        console.error('Error fetching events:', error);
        eventContainer.innerHTML =
          '<p>Error fetching events. Please try again later.</p>';
      });
  }
  // Populate the page with event data
  function populateEvents(events) {
    eventContainer.innerHTML = ''; // Clear previous content
    events.forEach(event => {
      const eventCard = document.createElement('div');
      eventCard.classList.add('event-card');
      eventCard.dataset.name = event.name;
      eventCard.dataset.url = event.url; // Stochează URL-ul în data attribute
      // Exemplu pentru URL-ul standard, verifică documentația pentru formatul corect
      eventCard.dataset.standardUrl = event.url + '?pricing=standard';
      // Adaugă log-uri pentru verificare
      console.log(
        'Standard URL generated for event:',
        eventCard.dataset.standardUrl
      );
      const eventName = document.createElement('h3');
      eventName.textContent = event.name;
      eventCard.appendChild(eventName);
      const eventDate = document.createElement('p');
      eventDate.textContent = new Date(
        event.dates.start.dateTime
      ).toLocaleDateString();
      eventCard.appendChild(eventDate);
      const eventLocation = document.createElement('p');
      eventLocation.textContent = `${event._embedded.venues[0].name}, ${event._embedded.venues[0].city.name}`;
      eventCard.appendChild(eventLocation);
      eventContainer.appendChild(eventCard);
      console.log('Event card created for event:', event.name); // Log pentru verificare
    });
  }
  // Fetch events when the page loads
  fetchEvents();
});
