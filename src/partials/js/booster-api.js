const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

// GET endpoint to retrieve events from the Discovery API
app.get('/events', async (req, res) => {
  const query = req.query.query || '';
  const apiKey = 'ABgCFeGHE7lHgwV23hsJAFL80GX9ypoh'; // Replace with your actual API key
  const apiUrl = `https://api.discoveryapi.com/events?query=${query}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const events = response.data;
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Error fetching events' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
