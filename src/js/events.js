import axios from 'axios';
const API_KEY = 'ABgCFeGHE7lHgwV23hsJAFL80GX9ypoh';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json?';
const fetchEvents = async (query, page, limit, countryCode) => {
  try {
    const searchURL = `${BASE_URL}apikey=${API_KEY}&keyword=${query}&page=${page}&size=${limit}&countryCode=${countryCode}`;
    const response = await axios.get(searchURL);
    const events = response.data._embedded
      ? response.data._embedded.events
      : [];
    return {
      events: events,
      pageInfo: response.data.page,
    };
  } catch (error) {
    console.error('Error fetching events:', error.message);
    return { events: [], pageInfo: { number: 0, totalPages: 0 } };
  }
};

export default fetchEvents;
