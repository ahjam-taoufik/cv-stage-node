const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log('you are Connected to DB .....'))
  .catch((err) => console.log('Failed to connect', err));

const courseSchema = mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    // match: /patern/
    maxLength:20,
    minLength:4
   },
  author: String,
  tags: [String],
  category:{
    type:String,
    enum:["Angular","React"]
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
     type: Number,
     required: function(){return this.isPublished},
     min:10,
     max:100
    }
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
  const result = await Course.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        isPublished: true,
        author: 'taoufik3',
      },
    },
    { new: true }
  );
  console.log(result);
}

async function deleteCourse(id) {
  //if course not existe , this method return null
  const result = await Course.findByIdAndRemove({ _id: id });

  console.log(result);
}

deleteCourse('62b34a0e1dd3d77c38145279');
