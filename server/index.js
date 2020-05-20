require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const path = require('path')
const indexPath = path.join(__dirname, 'public/index.html')


const app = express();

app.use(staticMiddleware);
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(indexPath)
})

app.listen(process.env.PORT, () => {
  console.log('Listening on port', process.env.PORT);
});
