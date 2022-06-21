const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

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
  const course=ifExist(req,res);
  if (course)res.send(course);
});


//Method Post add course
app.post('/api/courses', (req, res) => {

//Validate input data
validate(req, res)
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
  const course=ifExist(req,res);

  //Validate input data
  validate(req, res)

  //Update course
  course.name = req.body.name;
  res.send(course);
});

//Validate input data
function validate(req,res){
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const { error, value } = schema.validate({ name: req.body.name });
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
}


 //Look if course Exist
function ifExist(req,res){
  const course = courses.find((c) => {
    return c.id === parseInt(req.params.id);
  });
  if (!course) res.status(404).send('course not found');
   return course;
}



//Listen Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listen at port ${port}`));
