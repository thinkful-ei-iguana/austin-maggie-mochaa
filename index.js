const express = require('express');
const morgan = require('morgan');

const appData = require('./app-data');
const app = express();

app.use(morgan('common'));

app.get('/apps', (req, res) => {
  let { sort = "", genres } = req.query;
  sort = sort.toLowerCase();

  console.log('sort is', sort);
  console.log('genre is', genres);

  if (sort && !['rating', 'app'].includes(sort)) {
    return res
      .status(400)
      .send('Sort must be either rating or app');
  }

  const validGenres = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];

  let sortedArray;

  if (genres) {
    if (!validGenres.find(option => option.toLowerCase() === genres.toLowerCase())) {
      return res
        .status(400)
        .json({ message: `Valid genres include: ${validGenres}` });
    }
    sortedArray = appData.filter(app =>
      app
        .Genres
        .toLowerCase()
        .includes(req.query.genres.toLowerCase())
    );
  }

  // return full array


  if (sort === 'app') {
    // eslint-disable-next-line no-inner-declarations
    function compareApp(a, b) {
      if (a.App > b.App) {
        return 1;
      }
      else return -1;
    }
    sortedArray = appData.sort(compareApp);
  }

  if (sort === 'rating') {
    // eslint-disable-next-line no-inner-declarations
    function compareRating(a, b) {
      return a.Rating - b.Rating;
    }
    sortedArray = appData.sort(compareRating);
  }

  sortedArray = appData;

  res.json(sortedArray);

});



module.exports = app;
