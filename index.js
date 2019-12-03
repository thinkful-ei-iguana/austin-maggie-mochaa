const express = require('express');
const morgan = require('morgan');

const appData = require('./app-data');
const app = express();


app.use(morgan('common'));

app.get('/apps', (req, res) => {
  const { sort, genre } = req.query;
  // const { genre } = req.query;

  console.log('sort is', sort);

  if (sort && !['rating', 'app'].includes(sort)) {
    return res
      .status(400)
      .send('Sort must be either rating or app');
  }

  let resultsByApp = appData.filter(app => {
    console.log('app.app is', app.App);

    app.App
      .toUpperCase()
      .includes(sort.toUpperCase())
  }
  );

  if (sort === 'rating') {
    resultsByApp.sort((a, b) => { a.rating < b.rating ? -1 : 1; });
  }
  if (sort === 'app') {
    resultsByApp.sort((a, b) => { a.app < b.app ? -1 : 1; });
  }

  res.set('Content-Type', 'text/html');
  res.end('hi everyone');


});


app.listen(8000, () => {
  console.log('Listening on PORT 8000');
});