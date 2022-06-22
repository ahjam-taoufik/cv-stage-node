const mongoose = require('mongoose');

const delay = (n) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, n * 1000);
  });
};

mongoose
  .connect('mongodb://localhost/playground')
  .then(() => console.log('you are Connected to DB .....'))
  .catch((err) => console.log('Failed to connect', err));

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    // match: /patern/
    // maxLength: 20,
    // minLength: 4,
  },
  author: String,

  tags: {
    type: Array,
    validate: {
      // isAsync: true,
      validator:async function (v) {
          await delay(3)
          //this work in async
          return val = v && v.length > 0;
  
       
      },
      message: 'the course should be at least one tage',
    },
  },

  category: {
    type: String,
    enum: ['Angular', 'React'],
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 100,
  },
});

const Course = mongoose.model('Course_db', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Learn React',
    author: 'ali',
     tags: ["Angula","React"],
    isPublished: true,
    price: 20,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
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

createCourse();
