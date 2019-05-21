const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('common'));

const playStore = require('./playstore.js');

app.get('/apps', (req, res) => {
  const { genres, sort } = req.query;

  if(sort) {
    if(!['app', 'rating'].includes(sort)) {
      return res
        .status(400)
        .send('Sort must be one of app or rating');
    }
  }

  if(genres) {
    if(!['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(genres)) {
      return res
        .status(400)
        .send('genres must be either action, puzzle, strategy, casual, arcade, card');
  }
}

  let results = 
    playStore
        .filter(app => 
            app
              ['Genres']
              .toLowerCase()
              .includes(genres.toLowerCase()));

  if(sort) {
    results
      .sort((a, b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    }); 
  }  

  res
    .json(results);
});

module.exports = app;