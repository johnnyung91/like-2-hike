require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const fetch = require('node-fetch');


const app = express();

app.use(staticMiddleware);
app.use(express.json());

app.get('/api/hikingtrails/:lat/:long', (req, res) => {
  const {lat, long} = req.params
  const {hiking_APIKey} = process.env

  fetch(`https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${long}&maxDistance=15&key=${hiking_APIKey}`)
    .then(res => res.json())
    .then(data => res.json(data))
})

app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT);
});
