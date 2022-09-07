'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const musicHandler = require('./musicAPI.js');

// import our Song and Score schemas, so we can interact with
const Song = require('./models/songs.js');
const Score = require('./models/scores.js');

// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is listening');
});

//connect mongoose to mongo
mongoose.connect(process.env.DB_URL);

//USE
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3002;



app.get('/', (req,res) => {
  res.send('hello');
});


app.get('/music', musicHandler);

app.get('*', (request, response) => {
  response.send('Route does not exists.');
});


// Error Handling Here
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).send(err.message);
});



app.listen(PORT, () => console.log(`listening on port ${PORT}`));