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
  // aq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal)
  // lt (less than)
  // lte (less than or equal)
  // in
  // nin (not in)
 
  const data= await Course
          // .find({price:{$gte:10}})
          .find({price:{$gte:10,$lte:10}})
          .select({name:1,author:1})
          .limit(10)
          .sort({author:1})
    console.log(data);
}

getData();
// createCourse()
