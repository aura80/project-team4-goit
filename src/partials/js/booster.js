document.getElementById('search').addEventListener('input', async event => {
  const query = event.target.value;
  const response = await fetch(`/events?query=${query}`);
  const events = await response.json();
  const eventCards = document.getElementById('event-cards');
  eventCards.innerHTML = events
    .map(
      event =>
        ` <div class="event-card"> <h3>${event.name}</h3> <p>${event.date}</p> <p>${event.location}</p> </div> `
    )
    .join('');
});
