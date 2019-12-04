const express = require('express');
const morgan = require('morgan');

const appData = require('./app-data');
const app = express();

app.use(morgan('common'));

app.get('/apps', (req, res) => {
  const { sort, genres } = req.query;

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
      return a.App.localeCompare(b.App);
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


  res.json(sortedArray);

});

app.listen(8000, () => {
  console.log('Listening on PORT 8000');
});

module.exports = app;
