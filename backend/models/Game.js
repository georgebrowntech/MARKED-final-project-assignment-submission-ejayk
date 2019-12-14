const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Game = new Schema({
    title: {
      type: String
    },
    platform: {
      type: String
    },
    genre: {
      type: String
    },
    rating: {
      type: String
    },
    publisher: {
      type: String
    },
    release: {
      type: Number
    },
    status: {
      type: String
    }
  },
  {
    collection: 'games'
  });

module.exports = mongoose.model('Game', Game);
