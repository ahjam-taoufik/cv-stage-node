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

const port=process.env.PORT || 3000;

app.listen(port, () => console.log(`listen at port ${port}`));
