const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log('you are Connected to DB .....'))
  .catch((err) => console.log('Failed to connect', err));

const courseSchema = mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model('Course_db', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Learn React',
    author: 'ali',
    tags: ['angular', 'frontEnd'],
    isPublished: true,
  });
  const result = await course.save();
  console.log(result);
}

async function getData() {
  const data = await Course.find();

  console.log(data);
}

async function updatecourse(id) {
  const course = await Course.findById(id);
  if(!course) return;
  course.isPublished = false;
  course.author = 'taoufik2';

  const result = await course.save();
  console.log(result);
}

updatecourse('62b34a0e1dd3d77c38145279');