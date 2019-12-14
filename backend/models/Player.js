const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Player = new Schema({
    name: {
      type: String
    },
    rank: {
      type: Number
    },
    score: {
      type: Number
    },
    time_played: {
      type: String
    },
    game_played: {
      type: String
    },
    status: {
      type: String
    }
  },
  {
    collection: 'players'
  });

module.exports = mongoose.model('Player', Player);
