const Joi = require('joi');
const express= require('express');
const router=express.Router();

const courses = [
    { id: 1, name: 'courses1' },
    { id: 2, name: 'courses2' },
    { id: 3, name: 'courses3' },
  ];

//Method Get All Post
router.get('/', (req, res) => {
  res.send(courses);
});

//Method Get course by id
router.get('/:id', (req, res) => {
  //Look if course Exist
  const course = ifExist(req, res);
  if (course) res.send(course);
});

//Method Post add course
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
  //Look if course Exist
  const course = ifExist(req, res);
  //Validate input data
  validate(req, res);
  //Update course
  course.name = req.body.name;
  res.send(course);
});

//Method delete update course
router.delete('/:id', (req, res) => {
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

module.exports =router