const express = require('express');
const morgan = require('morgan');

const appData = require('./app-data');
const app = express();

app.use(morgan('common'));

app.get('/apps', (req, res) => {
  const { sort, genre } = req.query;

  console.log('sort is', sort);

  if (sort && !['rating', 'app'].includes(sort)) {
    return res.status(400).send('Sort must be either rating or app');
  }

  let sortedArray;

  // if (sort === 'app') {
  function compareApp(a, b) {
    return a.App.localeCompare(b.App);
  }

  sortedArrayApp = appData.sort(compareApp);
  res.json(sortedArray);
  // }


  // else if (sort === 'rating') {
  function compareRating(a, b) {
    return a.App.localeCompare(b.App);
  }
  sortedArrayRating = appData.sort(compareRating);
  res.json(sortedArrayRating);
  // }



});


//   } else {
//   const results = appData.map(app => app);
//   res.set('Content-Type', 'application/json');
//   res.json(results);
// }


app.listen(8000, () => {
  console.log('Listening on PORT 8000');
});
