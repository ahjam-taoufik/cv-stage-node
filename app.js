const express = require('express');
const app = express();

const courses = [
  { id: 1, name: 'courses1' },
  { id: 2, name: 'courses2' },
  { id: 3, name: 'courses3' },
];

app.get('/', (_, res) => res.send('Home page'));

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
   //method 1
   // const course=courses[req.params.id-1];
   //   if(!course) res.status(404).send('course not found')
   //   res.send(course)
   
   //method 2
  const course = courses.find((c) => {return c.id === parseInt(req.params.id)});
    if(!course) res.status(404).send('course not found')
    res.send(course)
  
  
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listen at port ${port}`));
