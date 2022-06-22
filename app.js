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

async function createCourse() {
  const Course = mongoose.model('Course_db', courseSchema);
  const course = new Course({
    name: 'Learn Angular',
    author: 'taoufik',
    tags: ['angular', 'web', 'frontEnd'],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

createCourse()
