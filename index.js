const express = require('express');
const morgan = require('morgan');

const appData = require('./app-data');
const app = express();

app.use(morgan('common'));

app.get('/apps', (req, res) => {
  const { sort, genre } = req.query;
  // const { genre } = req.query;

  console.log('sort is', sort);

  let resultsByApp = appData.filter(app => {
    console.log('app.app is', app.App);
    return app;
  });

  let resultsByRating = appData.filter(rating => {
    console.log('rating.Rating is', rating.Rating);
    return rating;
  });

  if (sort && !['rating', 'app'].includes(sort)) {
    return res.status(400).send('Sort must be either rating or app');
  }

  if (sort === 'rating') {
    resultsByRating.sort((a, b) => {
      a.rating < b.rating ? -1 : 1;
      res.set('Content-Type', 'application/json');
      res.json(resultsByRating);
    });
  } else if (sort === 'app') {
    resultsByApp.sort((a, b) => {
      a.app < b.app ? -1 : 1;
      res.set('Content-Type', 'application/json');
      res.json(resultsByApp);
    });
  } else {
    const results = appData.map(app => app);
    res.set('Content-Type', 'application/json');
    res.json(results);
  }
});

app.listen(8000, () => {
  console.log('Listening on PORT 8000');
});
