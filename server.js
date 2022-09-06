'use strict';

const express = require('express');

require('dotenv').config();

const cors = require('cors');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;



app.get('/', (req,res) => {
  res.send('hello');
});


app.get('*', (request, response) => {
  response.send('Route does not exists.');
});


// Error Handling Here
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).send(err.message);
});



app.listen(PORT, () => console.log(`listening on port ${PORT}`));