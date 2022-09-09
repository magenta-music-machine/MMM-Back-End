'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const verifyUser = require('./auth');

const musicHandler = require('./musicAPI.js');

// import our Song and Score schemas, so we can interact with
const Song = require('./models/songs.js');
const Score = require('./models/score.js');
const { default: axios } = require('axios');

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
app.get('/songs', getSong);
app.get('/score', getScore);
app.get('/albums', getAlbum);
app.post('/songs', postSong);
app.post('/score', postScore);
app.put('/songs/:id', putSong);
app.put('/score/:id', putScore);
app.delete('/songs/:id', deleteSong);




async function getSong(request, response, next) {
  verifyUser(request, async (err, user) => {
    if (err) {
      console.log(err);
      response.send('invalid token');
    } else {
  try {
    let results = await Song.find({});
    response.status(200).send(results);
  }
  catch (e) {
    next(e);
  }
}
})
  }

async function getScore(request, response, next) {
  try {
    let results = await Score.find({});
    response.status(200).send(results);
  }
  catch (e) {
    next(e);
  }
}

async function postScore(request, response, next) {
  try {
    let createdScore = await Score.create(request.body);
    response.status(200).send(createdScore);
  } catch (e) {
    next(e);
  }
}

async function postSong(request, response, next) {
  try {
    let createdSong = await Song.create(request.body);
    response.status(200).send(createdSong);
  } catch (e) {
    next(e);
  }
}

async function putSong(request, response, next)
  {
    try
    {
      // access the `id` in params
      let id = request.params.id;
      let updatedSong = await Song.findByIdAndUpdate(id, request.body, { new: true, overwrite: true});
      response.status(200).send(updatedSong);
    }
    catch (e)
    {
      next(e);
    }
  }

  async function putScore(request, response, next)
  {
    try
    {
      // access the `id` in params
      let id = request.params.id;
      let updatedScore = await Score.findByIdAndUpdate(id, request.body, { new: true, overwrite: true});
      response.status(200).send(updatedScore);
    }
    catch (e)
    {
      next(e);
    }
  }

  async function deleteSong(request, response, next) {
    try {
      await Song.findByIdAndDelete(request.params.id);
      response.status(200).send('Deleted song');
    }
    catch (e) {
  
      next(e);
    }
  }

  async function getAlbum(request, response, next){
    try{
      let id = request.query.albumId;
      let art = await axios.get(`http://api.napster.com/v2.2/albums/${id}/images?apikey=${process.env.MUSIC_API_KEY}`);
    console.log('rats');
      response.send(art);
      console.log('rats')
    } catch (e){
      console.log('Rats')
      next(e);
    }
  }


app.get('*', (request, response) => {
  response.send('Route does not exists.');
});


// verifyUser Request will go into the one of the functions on aysnc function handleMusic or something

// verifyUser(req, async, (err, user)) => {
//   if (err) {
//     console.log(err);
//     res.send('invalid token');
//   } else {

//   }
// }


// Error Handling Here
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).send(err.message);
});



app.listen(PORT, () => console.log(`listening on port ${PORT}`));

