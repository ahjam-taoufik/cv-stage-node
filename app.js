const express = require('express');
const app = express();

app.get('/', (_, res) => res.send('Home page'));

app.get('/api', (_, res) =>
  res.send([
    { id: 1, name: 'ahmed' },
    { id: 2, name: 'ali' },
    { id: 3, name: 'mohamed' },
  ])
);

app.listen(3000, () => console.log('listen at port 3000'));
