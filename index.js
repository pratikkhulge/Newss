const express = require('express');
const fetch = require('isomorphic-fetch');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/api/headlines', (req, res) => {
  const query = req.query.q || '';
  const country = req.query.country || 'in';
  const fromDate = req.query.from || '';
  const toDate = req.query.to || '';
  const language = req.query.language || 'en';
  const sortBy = req.query.sortBy || '';

  const apiKey = '{Your-API-Key}';
  let apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;

  // Append optional filters
  if (query) {
    apiUrl += `&q=${query}`;
  }
  if (fromDate) {
    apiUrl += `&from=${fromDate}`;
  }
  if (toDate) {
    apiUrl += `&to=${toDate}`;
  }
  if (sortBy) {
    apiUrl += `&sortBy=${sortBy}`;
  }
 console.log(apiUrl);
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(error => {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
