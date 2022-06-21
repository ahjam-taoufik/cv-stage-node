const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const app = express();

//Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet());

//morgan is a Node.js and Express middleware to log HTTP requests and errors
app.use(morgan('tiny'));

app.use(express.json());

//if client send x-www-form-urlencoded you should be put this line
app.use(express.urlencoded({ extended: true }));

//if you need  allow access to public folder
app.use(express.static('public'));

const logger = require('./logger');
app.use(logger);

const courses = [
  { id: 1, name: 'courses1' },
  { id: 2, name: 'courses2' },
  { id: 3, name: 'courses3' },
];

//Method Get Home page
app.get('/', (_, res) => res.send('Home page'));

//Method Get All Post
app.get('/api/courses', (req, res) => {
  res.send(courses);
});

//Method Get course by id
app.get('/api/courses/:id', (req, res) => {
  //Look if course Exist
  const course = ifExist(req, res);
  if (course) res.send(course);
});

//Method Post add course
app.post('/api/courses', (req, res) => {
  //Validate input data
  validate(req, res);
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

//Method Put update course
app.put('/api/courses/:id', (req, res) => {
  //Look if course Exist
  const course = ifExist(req, res);
  //Validate input data
  validate(req, res);
  //Update course
  course.name = req.body.name;
  res.send(course);
});

//Method delete update course
app.delete('/api/courses/:id', (req, res) => {
  //Look if course Exist
  const course = ifExist(req, res);

  //delete course
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

//Validate input data
function validate(req, res) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const { error, value } = schema.validate({ name: req.body.name });
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
}

//Look if course Exist
function ifExist(req, res) {
  const course = courses.find((c) => {
    return c.id === parseInt(req.params.id);
  });
  if (!course) return res.status(404).send('course not found');
  return course;
}

//Listen Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listen at port ${port}`));
