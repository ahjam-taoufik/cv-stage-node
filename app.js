const logger = require('./middleware/logger');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const app = express();
const coursesRouter = require('./router/courses');
const homeRouter = require('./router/home');

//************************ */
//for switch to mode production you need
//to input in the console (in windows) : set NODE_ENV=production
//************************* */

// console.log(`NODE_ENV : ${process.env.NODE_ENV}`);
// console.log(`app : ${app.get('env')}`);

if (app.get('env') === 'development') {
  //morgan is a Node.js and Express middleware to log HTTP requests and errors
  app.use(morgan('tiny'));
  console.log('morgan is enabled . . .');
} else {
  console.log('you are in MODE production . . .');
  console.log('morgan is disabled . . .');
}

//Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet());

app.use(express.json());

//if client send x-www-form-urlencoded you should be put this line
app.use(express.urlencoded({ extended: true }));

//if you need  allow access to public folder
app.use(express.static('public'));

app.use(logger);

//Router Home
app.use('/', homeRouter);

//Router courses
app.use('/api/courses', coursesRouter);

//Listen Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listen at port ${port}`));
