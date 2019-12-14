const express = require('express');
const app = express();
const gameRoute = express.Router();

// Game model
let Game = require('../models/Game');

// Add Game
gameRoute.route('/add-game').post((req, res, next) => {
  Game.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Games
gameRoute.route('/games').get((req, res) => {
  Game.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single game
gameRoute.route('/get-game/:id').get((req, res) => {
  Game.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update game
gameRoute.route('/update-game/:id').put((req, res, next) => {
  Game.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Game updated successfully')
    }
  })
})

// Delete player
gameRoute.route('/delete-game/:id').delete((req, res, next) => {
  Game.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = gameRoute;