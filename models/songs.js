'use strict';

//bring in mongoose
const mongoose=require('mongoose');

//extract the schema property from mongoose object
const { Schema } = mongoose;

//declare the book schema
const songSchema = new Schema({

  title: {type: String, required: true},
  artist: {type: String, required: true},
  email: {type: String, required: true}

});

// define the model

// allows our `BookModel` to use `mongoose` methods
const SongModel = mongoose.model('Song', songSchema);

module.exports = SongModel;
