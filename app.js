const express = require('express');
const app = express();

app.get('/', (_, res) => res.send('Home page'));


// app.get('/api/c/:id', (req, res) =>
//   // res.send(req.params)
//      res.send(req.params.id)
// );


// app.get('/api/c/:id/:years/:month', (req, res) =>
//   // res.send(req.params)
//      res.send(req.params.month)
// );

app.get('/api/c/:id', (req, res) =>//exemple in url http://localhost:3000/api/c/1?sortBy=name
      res.send(req.query)          //exemple in url http://localhost:3000/api/c/1?sortBy=name&orderBy=id
);



const port=process.env.PORT || 3000;

app.listen(port, () => console.log(`listen at port ${port}`));
